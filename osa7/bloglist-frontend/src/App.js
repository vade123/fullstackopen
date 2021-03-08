import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Blogs from './components/Blogs';
import Notification from './components/Notification';
import User from './components/User';
import Users from './components/Users';
import blogService from './services/blogs';
import loginService from './services/login';
import { setLoggedUser } from './reducers/loggedUserReducer';
import { setNotification } from './reducers/notificationReducer';
import { setUsers } from './reducers/usersReducer';
import userService from './services/users';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userService.getUsers();
      dispatch(setUsers(result));
    };
    fetchUsers();
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      dispatch(setLoggedUser(user));
      setUsername('');
      setPassword('');
    } catch(err) {
      dispatch(setNotification('wrong username or password', 'red', 3));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(setLoggedUser(null));
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit = {handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </div>
      </form>
    </div>
  );

  const showContent = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Router>
        <Switch>
          <Route exact path='/users' render={() => <Users />} />
          <Route exact path='/' render={() => <Blogs />} />
          <Route exact path='/users/:id' render={({ match }) => <User id={match.params.id}/>} />
        </Switch>
      </Router>
    </div>
  );

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && showContent()}
    </div>
  );

};

export default App;
