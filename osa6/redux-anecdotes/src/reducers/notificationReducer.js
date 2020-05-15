const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.data
    case 'RESET':
      return ''
    default: return state
  }
}

var timeoutID;

export const setNotification = ( content, time ) => {
  return async dispatch => {
    window.clearTimeout(timeoutID)
    dispatch({
      type: 'SET',
      data: content
    })
    timeoutID = window.setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, time*1000)
  } 
}

export default reducer