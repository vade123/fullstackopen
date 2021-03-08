import { useDispatch, useSelector } from 'react-redux';

import BlogForm from './BlogForm';
import { Link } from 'react-router-dom';
import React  from 'react';
import Toggable from './Toggable';
import blogService from '../services/blogs';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes));

  const blogFormRef = React.createRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const postBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create(newBlog);
    dispatch(createBlog(blog));
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'green', 3));
  };

  return (
    <div>
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm postBlog={postBlog} />
      </Toggable>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  );
};

export default Blogs;