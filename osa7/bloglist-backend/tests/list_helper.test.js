const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [ blogs[0] ];
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(7);
  });
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favourite blog', () => {
  const mostLikes = blogs[2];

  test('of a empty list is null', () => {
    const result = listHelper.favouriteBlog([]);
    expect(result).toEqual(null);
  });
  test('when a list has only one blog equals to that', () => {
    const listWithOneBlog = [ blogs[1] ];
    const result = listHelper.favouriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });
  test('of a bigger list is correct', () => {
    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual(mostLikes);
  });
});

describe('most blogs', () => {
  test('of a empty list is empty string', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual(null);
  });
  test('when a list has only one blog equals the author of that', () => {
    const result = listHelper.mostBlogs([ blogs[1]]);
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'blogs': 1 });
  });
  test('of a bigger list is correct', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ 'author':'Robert C. Martin', 'blogs': 3 });
  });
});

describe('most likes', () => {
  test('of a empty list is null', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(null);
  });
  test('when a list has only one blog equals the author of that', () => {
    const result = listHelper.mostLikes([ blogs[1] ]);
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 5 });
  });
  test('of a bigger list is correct', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ 'author':'Edsger W. Dijkstra', 'likes': 17 });
  });
});