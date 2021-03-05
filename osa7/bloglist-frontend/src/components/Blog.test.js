import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '@testing-library/react';

import Blog from './Blog';
import BlogForm from './BlogForm';
import React from 'react';

test('render title, author but not url, likes', () => {
  const blog = {
    title: 'test',
    author: 'testipena',
    url: 'testurl.com',
    likes: 9000
  };
  const component = render(
    <Blog blog={blog} />
  );
  expect(component.container).toHaveTextContent('test');
  expect(component.container).toHaveTextContent('testipena');
  expect(component.container).not.toHaveTextContent('testurl.com');
  expect(component.container).not.toHaveTextContent(9000);
});

test('render all content after button click', () => {
  const blog = {
    title: 'test',
    author: 'testipena',
    url: 'testurl.com',
    likes: 9000,
    user: {
      username: 'asd'
    }
  };
  const component = render(
    <Blog blog={blog} currentUser={{ username: 'asd' }} />
  );
  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('test');
  expect(component.container).toHaveTextContent('testipena');
  expect(component.container).toHaveTextContent('testurl.com');
  expect(component.container).toHaveTextContent(9000);
});

test('like-button', () => {
  const blog = {
    title: 'test',
    author: 'testipena',
    url: 'testurl.com',
    likes: 9000,
    user: {
      username: 'asd'
    }
  };
  const mockHandler = jest.fn();
  const component = render(
    <Blog blog={blog} addLike={mockHandler} currentUser={{ username: 'asd' }} />
  );
  const button = component.getByText('view');
  fireEvent.click(button);
  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('blog form', () => {
  const postBlog = jest.fn();
  const component = render(
    <BlogForm postBlog={postBlog} />
  );
  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'testipenan ploki' }
  });
  fireEvent.change(author, {
    target: { value: 'testipena' }
  });
  fireEvent.change(url, {
    target: { value: 'testipena.com/ploki' }
  });
  fireEvent.submit(form);

  const testBlog = {
    title: 'testipenan ploki',
    author: 'testipena',
    url: 'testipena.com/ploki'
  };
  expect(postBlog.mock.calls).toHaveLength(1);
  expect(postBlog.mock.calls[0][0]).toStrictEqual(testBlog);
});