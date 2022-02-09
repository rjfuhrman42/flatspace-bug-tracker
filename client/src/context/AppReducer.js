const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case 'REGISTER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'LOGIN':
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case 'CHECK_USER':
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    default:
      return state
  }
}

export default reducer
