const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      return state.map(obj => obj.id === action.data.id ? { ...obj, votes: obj.votes + 1 } : obj)
    case 'ADD':
      return state.concat(action.data.content)
    case 'INIT':
      return action.data
    default: return state
  }
}

export const voteAnecdote = ( id ) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = ( content ) => {
  return {
    type: 'ADD',
    data: { content }
  }
}

export const initializeAnecdotes = ( anecdotes ) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default reducer