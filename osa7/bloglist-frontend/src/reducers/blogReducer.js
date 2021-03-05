const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data];
  case 'INIT_BLOGS':
    return action.data;
  case 'UPDATE_BLOG':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data);
  case 'DELETE_BLOG':
    return state.filter(blog =>
      blog.id !== action.data.id);
  default:
    return state;
  }
};

export const initializeBlogs = (data) => {
  return {
    type: 'INIT_BLOGS',
    data
  };
};

export const createBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data
  };
};

export const updateBlog = (data) => {
  return {
    type: 'UPDATE_BLOG',
    data
  };
};

export const delBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: { id }
  };
};

export default blogReducer;
