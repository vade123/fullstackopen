import { gql, useQuery, useLazyQuery } from "@apollo/client";

import React, { useState, useEffect } from "react";
export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`;
export const BOOKS = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
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
  const [books, setBooks] = useState([]);
  const [loadBooks, { loading, data }] = useLazyQuery(BOOKS);
  const result = useQuery(GENRES);

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks);
    }
  }, [data]);

  if (!props.show) {
    return null;
  }
  if (result.loading || loading) {
    return <div>loading...</div>;
  }
  const genres = result.data.genres;

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => loadBooks({ variables: { genre: g } })}>
          {g}
        </button>
      ))}
      <button onClick={() => loadBooks()}>all books</button>
    </div>
  );
};

export default Books;
