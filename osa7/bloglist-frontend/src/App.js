import React, { useEffect, useState } from 'react';
import { createBlog, delBlog, initializeBlogs, updateBlog } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';
import { setNotification } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes));
  const user = useSelector(state => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      const result = await blogService.getAll();
      dispatch(initializeBlogs(result));
    };
    fetchAll();
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const blogFormRef = React.createRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
    } catch(err) {
      dispatch(setNotification('wrong username or password', 'red', 3));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(setUser(null));
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

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm postBlog={postBlog} />
      </Toggable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} deleteBlog={() => deleteBlog(blog)} currentUser={user} />)}
    </div>
  );

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && showBlogs()}
    </div>
  );

};

export default App;
