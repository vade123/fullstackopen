const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data];
  case 'INIT_BLOGS':
    return action.data;
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

export default blogReducer;
