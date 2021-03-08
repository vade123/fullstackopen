const loggedUserReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_LOGGED_USER':
    return action.data;
  default:
    return state;
  }
};

export const setLoggedUser = (data) => {
  return {
    type: 'SET_LOGGED_USER',
    data
  };
};

export default loggedUserReducer;