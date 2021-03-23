import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

const AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`
const Authors = (props) => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')
  const result = useQuery(AUTHORS)
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR,{
    refetchQueries: [ {query: AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, setBornTo } })
    
    setName('')
    setBorn('')
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
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={(event) => setName(event.target.value)}>
          {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
        </select>
        <div>
          born
          <input
            type='number'
            value={setBornTo}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
          <button type='submit'>update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors