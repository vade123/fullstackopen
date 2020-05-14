import anecdoteReducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'

const store = createStore(
  anecdoteReducer,
  composeWithDevTools()
)

export default store