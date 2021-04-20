import React, { useState } from "react";

import Authors from "./components/Authors";
import Books, { BOOKS, BOOK_DETAILS } from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { useSubscription, useApolloClient, gql } from "@apollo/client";
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`;
const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const client = useApolloClient();
  const login = (token) => {
    setToken(token);
    setPage("authors");
  };
  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      window.alert(`${book.title} by ${book.author.name} added`);
      updateCacheWith(book);
    },
  });
  const conditionalButtons = () => {
    if (!token) {
      return <button onClick={() => setPage("login")}>login</button>;
    }
    return (
      <div>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {conditionalButtons()}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommend"} />

      <Login show={page === "login"} setToken={login} />
    </div>
  );
};

export default App;
