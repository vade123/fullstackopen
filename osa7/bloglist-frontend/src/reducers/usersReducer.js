const usersReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_USERS':
    return action.data;
  default:
    return state;
  }
};

export const getUser = ( id ) => (state) => {
  return state.users.find(user => user.id === id);
};

export const setUsers = (data) => {
  return {
    type: 'SET_USERS',
    data
  };
};

export default usersReducer;