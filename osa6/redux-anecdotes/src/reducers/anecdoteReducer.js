import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      return state.map(obj => obj.id === action.data.id ? { ...obj, votes: obj.votes + 1 } : obj)
    case 'ADD':
      return state.concat(action.data)
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
  return async dispatch => {
    const obj = await anecdoteService.create(content)
    dispatch({
      type: 'ADD',
      data: obj
    }) 
  } 
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer