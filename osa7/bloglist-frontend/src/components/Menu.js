import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { setLoggedUser } from '../reducers/loggedUserReducer';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(setLoggedUser(null));
  };

  const useStyles = makeStyles({
    rightToolbar: {
      marginLeft: 'auto',
      paddingRight: '5px'
    }
  });
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>blogs</Button>
        <Button color='inherit' component={Link} to='/users'>users</Button>
        <Typography className={classes.rightToolbar} variant='subtitle1'>{user.name} logged in</Typography>
        <Button color='default' variant='contained' onClick={handleLogout}>logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
