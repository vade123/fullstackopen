import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

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