import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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
  expect(component.container).not.toHaveValue(9000);
});