const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = "THIS_IS_VERY_SECRET_KEY_EBIN_XD";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });
const pubsub = new PubSub();
const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    genres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments({}),
    authorCount: () => Author.collection.countDocuments({}),
    allBooks: async (_, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      } else if (!args.genre) {
        const author = await Author.findOne({ name: args.author });
        console.log(author);
        return Book.find({ author: author }).populate("author");
      } else if (!args.author) {
        return Book.find({ genres: { $in: args.genre } }).populate("author");
      } else {
        const author = await Author.findOne({ name: args.author });
        console.log(author);
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          "author"
        );
        console.log(books);
        return books.filter((b) => b.author._id !== author._id);
      }
    },
    allAuthors: () => Author.find({}),
    genres: async () => {
      const books = await Book.find({});
      const genres = new Set();
      books.forEach((b) => b.genres.forEach((g) => genres.add(g)));
      return genres;
    },
    me: (_, __, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.collection.countDocuments({ author: root._id.valueOf() });
    },
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        }
      }
      const book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },
    editAuthor: async (_, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: (_, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((err) => {
        throw new UserInputError(err.message, { invalidArgs: args });
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "salis") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
