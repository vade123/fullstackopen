const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book') 
require('dotenv').config();
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = 'THIS_IS_VERY_SECRET_KEY_EBIN_XD'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments({}),
    authorCount: () => Author.collection.countDocuments({}),
    allBooks: (_, args) => { 
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author', { name: 1, born: 1 })
      } else if (!args.genre) {
       // return Book.find({ author: args.author })
      } else if (!args.author) {
        return Book.find({ genres: { $in: args.genre }}).populate('author', { name: 1, born: 1 })
      } else {
        return Book.find({ genres: { $in: args.genre }}).populate('author', { name: 1, born: 1 })
      }
    },
    allAuthors: () => Author.find({}),
    me: (_, __, context) => {
      return context.currentUser
    }
  },
  Author: { 
    bookCount: async (root) => {
      return Book.collection.countDocuments({ "author": root._id.valueOf() })
    }
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({ ...args, author: author });
      try {
        await book.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: async (_, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (_, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(err => {
          throw new UserInputError(err.message, { invalidArgs: args })
        })
    }, 
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'salis') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
