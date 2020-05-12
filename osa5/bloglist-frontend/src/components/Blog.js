import React, { useState } from 'react';

const Blog = ({ blog, addLike, deleteBlog, currentUser }) => {
  const [ toggle, setToggle ] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  
  const showLess = () => (
    <div>
      {blog.title} {blog.author} <button onClick={() => setToggle(!toggle)}>view</button>
    </div>
  );
  const deleteButton = () => (
    <div>
      <button onClick={deleteBlog}>delete blog</button>
    </div>
  );
  const showMore = () => (
    <div>
      <div >
        {blog.title} <button onClick={() => setToggle(!toggle)}>hide</button> <br />
      </div>
      {blog.url} <br />
      likes:{blog.likes} <button id='like-button' onClick={addLike}>like</button><br />
      {blog.author}
      {currentUser.username === blog.user.username && deleteButton()}
    </div>
  );
  
  return (
    <div style={blogStyle}>
      {toggle === false && showLess()}
      {toggle === true && showMore()}
    </div>
  );
};

export default Blog;