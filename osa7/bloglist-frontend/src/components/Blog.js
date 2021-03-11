import { Button, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core';
import { Delete, ThumbUp } from '@material-ui/icons';
import React, { useState } from 'react';
import { delBlog, updateBlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';

import { Comment } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import blogService from '../services/blogs';

const Blog = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id));
  const [deleted, setDeleted] = useState(false);
  const [ comment, setComment ] = useState('');

  if (!blog) {
    return deleted ? <Redirect to='/' /> : null;
  }

  const deleteButton = () => (
    <IconButton onClick={deleteBlog}><Delete /></IconButton>
  );

  const addLike = async () => {
    const updated = await blogService.update(blog);
    const updated2 = { ...updated, user: blog.user };
    dispatch(updateBlog(updated2));
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const res = await blogService.deleteBlog(blog);
      if (res === 204) {
        dispatch(delBlog(blog.id));
        setDeleted(true);
      }
    }
  };

  const handleAddComment = async () => {
    if (comment !== '') {
      const updated = await blogService.addComment(blog.id, comment);
      dispatch(updateBlog(updated));
    }
  };


  return (
    <div>
      <Typography variant='h4'>{blog.title} {blog.author}</Typography>
      <Typography>{blog.url}</Typography>
      <Typography>likes:{blog.likes}<IconButton id='like-button' onClick={addLike}><ThumbUp /></IconButton></Typography>
      <Typography>added by {blog.user.name} {user.username === blog.user.username && deleteButton()}</Typography>
      <Typography variant='h5'>comments</Typography>
      <List>
        {blog.comments.map(comment =>
          <ListItem key={comment+Math.random()}>
            <ListItemIcon>
              <Comment />
            </ListItemIcon>
            <ListItemText>
              {comment}
            </ListItemText>
          </ListItem>)}
      </List>
      <TextField
        id='comment'
        type='text'
        value={comment}
        label='Comment'
        fullWidth
        variant="outlined"
        onChange={({ target }) => setComment(target.value)}
      />
      <Button onClick={handleAddComment}>add comment</Button>
    </div>
  );
};

export default Blog;