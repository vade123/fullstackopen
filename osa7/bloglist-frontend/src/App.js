import React, { useEffect, useState } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [notification, setNotification] = useState([null, '']);

  useEffect(() => {
    const fetchAll = async () => {
      const result = await blogService.getAll();
      setBlogsSorted(result);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = React.createRef();

  const setBlogsSorted = (array) => {
    setBlogs(array.sort((a, b) => b.likes - a.likes));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(err) {
      dispatch(setNotification('wrong username or password', 'red', 3));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
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
    setBlogsSorted(blogs.concat(blog));
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'green', 3));
  };

  const addLike = async (blog) => {
    const updated = await blogService.update(blog);
    const updated2 = { ...updated, user: blog.user };
    setBlogsSorted(blogs.map(b => b.id !== updated.id ? b : updated2));
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const res = await blogService.deleteBlog(blog);
      if (res === 204) {
        setBlogsSorted(blogs.filter(b => b.id !== blog.id));
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
