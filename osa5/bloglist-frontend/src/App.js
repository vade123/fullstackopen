import React, {useEffect, useState} from 'react';

import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService
      .getAll()
      .then(result => setBlogs(result));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login({ username, password });

    setUser(user);
    setUsername('');
    setPassword('');
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
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

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <br />
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />)}
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
