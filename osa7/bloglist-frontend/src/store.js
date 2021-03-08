import { applyMiddleware, combineReducers, createStore } from 'redux';

import blogReducer from './reducers/blogReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggedUserReducer from './reducers/loggedUserReducer';
import notificationReducer from './reducers/notificationReducer';
import thunk from 'redux-thunk';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  loggedUser: loggedUserReducer,
  users: usersReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;