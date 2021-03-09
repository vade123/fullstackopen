import React, { useState } from 'react';
import { delBlog, updateBlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';

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
    <button onClick={deleteBlog}>delete blog</button>
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
    const updated = await blogService.addComment(blog.id, comment);
    dispatch(updateBlog(updated));
  };

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2><br />
      {blog.url} <br />
      likes:{blog.likes} <button id='like-button' onClick={addLike}>like</button><br />
      added by {blog.user.name} {user.username === blog.user.username && deleteButton()}
      <h3>comments</h3>
      <input
        id='comment'
        type='text'
        value={comment}
        name='Comment'
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={handleAddComment}>add comment</button>
      <ul>
        {blog.comments.map(comment => <li key={comment + Math.random() }>{comment}</li>)}
      </ul>
    </div>
  );
};

export default Blog;