const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.data
    case 'RESET':
      return ''
    default: return state
  }
}

export const setNotification = ( content, time ) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, time*1000)
  } 
}

export default reducer