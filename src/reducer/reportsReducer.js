import { combineReducers } from 'redux';

/**
 * @param {object} state - The initial state
 * @param {object} {*} - destructured type object
 * @returns {object} - The transformed state
 */
const reportsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_INTERVENTION_REPORTS':
      return {
        ...state,
        report: payload
      };
    case 'FETCH_INTERVENTION_REPORTS_ERROR':
      return {
        ...state,
        report_error: payload
      };
    case 'FETCH_REDFLAG_REPORTS':
      return {
        ...state,
        report: payload
      };
    case 'FETCH_REDFLAG_REPORTS_ERROR':
      return {
        ...state,
        report_error: payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  reports: reportsReducer
});
