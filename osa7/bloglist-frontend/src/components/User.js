import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@material-ui/core';

import React from 'react';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import { useSelector } from 'react-redux';

const User = ({ id }) => {
  const user = useSelector(state => state.users.find(user => user.id === id));

  if (!user) {
    return null;
  }
  return (
    <div>
      <Typography variant='h5'>{user.name}</Typography>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            blogs added
          </ListSubheader>
        }>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <ListItemIcon>
              <SubjectRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={blog.title} secondary={blog.author} />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default User;