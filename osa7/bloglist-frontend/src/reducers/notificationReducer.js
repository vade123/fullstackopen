const reducer = (state = '', action) => {
  switch(action.type) {
  case 'SET':
    return {
      text: action.text,
      color: action.color
    };
  case 'RESET':
    return '';
  default: return state;
  }
};

var timeoutID;

export const setNotification = ( content, color, time ) => {
  return async dispatch => {
    window.clearTimeout(timeoutID);
    dispatch({
      type: 'SET',
      text: content,
      color: color
    });
    timeoutID = window.setTimeout(() => {
      dispatch({
        type: 'RESET'
      });
    }, time*1000);
  };
};

export default reducer;
