const initialState = "initial notification"

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE':
      return action.data
    default: return state
  }
}

export const changeNotification = ( content ) => {
  return {
    type: 'CHANGE',
    data: { content }
  }
}

export default reducer