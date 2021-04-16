import { gql, useQuery } from "@apollo/client";

import React, { useState } from "react";

const BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;
const GENRES = gql`
  query {
    genres
  }
`;
const Books = (props) => {
  const [filter, setFilter] = useState("");
  const result = useQuery(BOOKS);
  const result2 = useQuery(GENRES);
  if (!props.show) {
    return null;
  }
  if (result.loading || result2.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const genres = result2.data.genres;

  let filteredBooks;
  if (filter !== "") {
    filteredBooks = books.filter((b) => b.genres.includes(filter));
  } else {
    filteredBooks = books;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilter("")}>all books</button>
    </div>
  );
};

export default Books;
