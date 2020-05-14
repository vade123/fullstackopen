import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecodeList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }
  const byVotes = (a, b) => b.votes - a.votes
  
  return (
    <div>
      {anecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecodeList
