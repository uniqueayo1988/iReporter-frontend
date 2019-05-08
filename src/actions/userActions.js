import ireporterApi from '../api/ireporterApi';

/**
 * @description function for storing platform data in localStorage
 * @param {object} user the user details to be stored in local storage
 * @returns {undefined}
 */
const localStore = (token, firstname, lastname) => {
  const userInfo = { token, firstname, lastname };
  return localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

/**
 * @description function for dispatching user login
 * @param {object} user login details
 * @returns {undefined}
 */
const userLoginAction = (email, password) => async (dispatch) => {
  try {
    const response = await ireporterApi.post('/auth/login', {
      email, password
    });
    const { token, user } = response.data.data[0];
    const { firstName, lastName } = user;
    localStore(token, firstName, lastName);
    dispatch({ type: 'USER_LOGIN', payload: response.data.data[0] });
  } catch (error) {
    dispatch({ type: 'USER_LOGIN_ERROR', payload: error.response.data.message });
  }
};

/**
 * @description function for dispatching user login
 * @param {object} user signup details
 * @returns {undefined}
 */
const userSignupAction = (
  firstname, lastname, othernames, email, phoneNumber, username, password, confirmPassword
) => async (dispatch) => {
  if (password === confirmPassword) {
    try {
      const response = await ireporterApi.post('/auth/signup', {
        firstname, lastname, othernames, email, phoneNumber, username, password
      });
      const { token, user } = response.data.data[0];
      const { firstName, lastName } = user;
      localStore(token, firstName, lastName);
      dispatch({ type: 'USER_SIGNUP', payload: response.data.data[0] });
    } catch (error) {
      dispatch({ type: 'USER_SIGNUP_ERROR', payload: error.response.data.message });
    }
  } else {
    dispatch({ type: 'USER_INCORRECT PASSWORD', payload: 'You have entered wrong passwords' });
  }
};

/**
 * @description function for dispatching action for logging out user
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {object} action
 */
const userLogoutAction = () => {
  localStorage.clear();
  return {
    type: 'LOGOUT_USER', payload: 'You have successfully logged out'
  };
};

/**
 * @description function for dispatching action for logging out user
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {object} action
 */
const loadStateAction = () => ({ type: 'LOAD_STATE', payload: true });

export {
  userLoginAction, userSignupAction, userLogoutAction, localStore, loadStateAction
};
