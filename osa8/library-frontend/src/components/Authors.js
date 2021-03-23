import { gql, useQuery } from '@apollo/client'

import React from 'react'

const AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const Authors = (props) => {
  const result = useQuery(AUTHORS)
  
  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }
  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors