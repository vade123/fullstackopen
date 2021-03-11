import { Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import Blogs from './components/Blogs';
import { Container } from '@material-ui/core';
import Menu from './components/Menu';
import Notification from './components/Notification';
import User from './components/User';
import Users from './components/Users';
import blogService from './services/blogs';
import { initializeBlogs } from './reducers/blogReducer';
import loginService from './services/login';
import { makeStyles } from '@material-ui/core/styles';
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

  useEffect(() => {
    const fetchAll = async () => {
      const result = await blogService.getAll();
      dispatch(initializeBlogs(result));
    };
    fetchAll();
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
      dispatch(setNotification('wrong username or password', 'error', 3));
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0),
        width: '25ch',
      },
    },
  }));
  const classes = useStyles();

  const loginForm = () => (
    <div>
      <Typography variant="h5">log in to application</Typography>
      <Notification />
      <form className={classes.root} onSubmit = {handleLogin}>
        <div>
          <TextField
            type="text"
            value={username}
            label="Username"
            variant="outlined"
            onChange={({ target }) => setUsername(target.value)}
          /> <br />
          <TextField
            type="password"
            value={password}
            label="Password"
            variant="outlined"
            onChange={({ target }) => setPassword(target.value)}
          /> <br />
          <Button variant='contained' id="login-button" type="submit">login</Button>
        </div>
      </form>
    </div>
  );

  const showContent = () => (
    <div>
      <Router>
        <Menu />
        <Typography variant="h2">hi-tech blogs application</Typography>
        <Notification />
        <Switch>
          <Route exact path='/users' render={() => <Users />} />
          <Route exact path='/' render={() => <Blogs />} />
          <Route exact path='/users/:id' render={({ match }) => <User id={match.params.id}/>} />
          <Route exact path='/blogs/:id' render={({ match }) => <Blog id={match.params.id}/>} />
        </Switch>
      </Router>
    </div>
  );

  return (
    <Container>
      <div>
        {user === null && loginForm()}
        {user !== null && showContent()}
      </div>
    </Container>
  );

};

export default App;
