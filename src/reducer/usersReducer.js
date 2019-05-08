/**
 * @param {object} state - The initial state
 * @param {object} {*} - destructured type object
 * @returns {object} - The transformed state
 */
const initialState = {
  isAdmin: false,
  isUser: false,
  loggedIn: false,
  errorMsg: '',
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'USER_LOGIN':
      return {
        ...state,
        isUser: true,
        loggedIn: true,
        payload
      };
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        errorMsg: payload
      };
    case 'USER_SIGNUP':
      return {
        ...state,
        isUser: true,
        loggedIn: true,
        payload
      };
    case 'USER_SIGNUP_ERROR':
      return {
        ...state,
        errorMsg: payload
      };
    case 'USER_INCORRECT PASSWORD':
      return {
        ...state,
        errorMsg: payload
      };
    case 'LOAD_STATE':
      return {
        ...state,
        loadState: payload
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isUser: false,
        loggedIn: false,
        payload
      };
    default:
      return state;
  }
};

export default usersReducer;
