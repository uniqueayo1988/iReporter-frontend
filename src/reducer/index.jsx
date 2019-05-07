import { combineReducers } from 'redux';
import reportsReducer from './reportsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  reports: reportsReducer,
  users: usersReducer
});
