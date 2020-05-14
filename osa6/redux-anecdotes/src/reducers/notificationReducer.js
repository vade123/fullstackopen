const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.data.content
    case 'RESET':
      return ''
    default: return state
  }
}

export const setNotification = ( content ) => {
  return {
    type: 'SET',
    data: { content }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}
export default reducer