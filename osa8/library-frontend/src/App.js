import React, { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { useApolloClient } from "@apollo/client";

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
