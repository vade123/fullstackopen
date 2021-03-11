import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

const BlogForm = ({ postBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url
    };
    postBlog(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0),
        width: '25ch',
      },
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Typography variant='h5'>create new</Typography>
      <form className={classes.root} onSubmit={handleCreate}>
        <div>
          <TextField
            type='text'
            value={title}
            label="Title"
            variant="outlined"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            type='text'
            value={author}
            label="Author"
            variant="outlined"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            type='text'
            value={url}
            label="Url"
            variant="outlined"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button id='submit-button' type='submit'>create</Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  postBlog: propTypes.func.isRequired
};

export default BlogForm;
