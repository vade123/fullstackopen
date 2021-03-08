import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import { setLoggedUser } from '../reducers/loggedUserReducer';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);
  const style = {
    padding: '5px',
    backgroundColor: 'lightgrey'
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(setLoggedUser(null));
  };
  return (
    <div style={style}>
      <Link to='/'>blogs</Link>&nbsp;
      <Link to='/users'>users</Link>&nbsp;
      {user.name} logged in&nbsp;
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Menu;

