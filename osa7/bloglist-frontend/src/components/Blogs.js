import React,  { useEffect } from 'react';
import { createBlog, delBlog, initializeBlogs, updateBlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Toggable from './Toggable';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes));
  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchAll = async () => {
      const result = await blogService.getAll();
      dispatch(initializeBlogs(result));
    };
    fetchAll();
  }, [dispatch]);

  const blogFormRef = React.createRef();

  const postBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create(newBlog);
    dispatch(createBlog(blog));
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'green', 3));
  };

  const addLike = async (blog) => {
    const updated = await blogService.update(blog);
    const updated2 = { ...updated, user: blog.user };
    dispatch(updateBlog(updated2));
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const res = await blogService.deleteBlog(blog);
      if (res === 204) {
        dispatch(delBlog(blog.id));
      }
    }
  };

  return (
    <div>
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm postBlog={postBlog} />
      </Toggable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} deleteBlog={() => deleteBlog(blog)} currentUser={user} />)}
    </div>
  );
};

export default Blogs;