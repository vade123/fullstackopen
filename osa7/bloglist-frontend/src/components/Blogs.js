import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import BlogForm from './BlogForm';
import { Link } from 'react-router-dom';
import React  from 'react';
import Toggable from './Toggable';
import blogService from '../services/blogs';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { withStyles } from '@material-ui/core/styles';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes));

  const blogFormRef = React.createRef();

  const postBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create(newBlog);
    dispatch(createBlog(blog));
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'success', 3));
  };

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      },
    },
  }))(TableRow);

  return (
    <div>
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm postBlog={postBlog} />
      </Toggable>
      <TableContainer component={Card} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography>title</Typography></TableCell>
              <TableCell><Typography>author</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog =>
              <StyledTableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;