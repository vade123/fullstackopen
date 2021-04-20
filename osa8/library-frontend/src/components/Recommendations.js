import React from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

const BOOKS = gql`
  query($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;

const Recommendations = (props) => {
  const result = useQuery(USER, {
    onCompleted(data) {
      if (data.me) {
        loadBooks({ variables: { genre: data.me.favoriteGenre } });
      }
    },
  });
  const [loadBooks, { loading, data }] = useLazyQuery(BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading || loading) {
    return <div>loading...</div>;
  }

  const user = result.data.me;

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{user.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data &&
            data.allBooks &&
            data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Recommendations;
