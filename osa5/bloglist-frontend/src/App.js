import React, {useEffect, useState} from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState([null, '']);

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
      setNotification(['wrong username or password', 'red']);
      setTimeout(()=> {
        setNotification([null, '']);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={notification[0]} color={notification[1]} />
      <form onSubmit = {handleLogin}>
        <div>
          username
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} 
          />
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
  
  const postBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create(newBlog);
    setBlogsSorted(blogs.concat(blog));
    setNotification([`a new blog ${blog.title} by ${blog.author} added`, 'green']);
    setTimeout(()=> {
      setNotification([null, '']);
    }, 3000);
  };
  
  const addLike = async (blog) => {
    const updated = await blogService.update(blog);
    setBlogsSorted(blogs.map(b => b.id !== updated.id ? b : updated));
  };

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notification[0]} color={notification[1]} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm postBlog={postBlog} />
      </Toggable>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} />)}
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
