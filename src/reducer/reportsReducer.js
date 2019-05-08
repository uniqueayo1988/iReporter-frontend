/**
 * @param {object} state - The initial state
 * @param {object} {*} - destructured type object
 * @returns {object} - The transformed state
 */
const initialState = {
  interventions: [],
  redflags: [],
  user: '',
  errorMsg: '',
  successMsg: ''
};

const reportsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_TOKEN':
      return {
        ...state,
        user: payload
      };
    case 'FETCH_INTERVENTION_REPORTS':
      return {
        ...state,
        interventions: payload
      };
    case 'FETCH_INTERVENTION_REPORTS_ERROR':
      return {
        ...state,
        report_error: payload
      };
    case 'FETCH_REDFLAG_REPORTS':
      return {
        ...state,
        redflags: payload
      };
    case 'FETCH_REDFLAG_REPORTS_ERROR':
      return {
        ...state,
        report_error: payload
      };
    case 'CREATE_REPORTS':
      return {
        ...state,
        successMsg: payload
      };
    case 'CREATE_REPORTS_ERROR':
      return {
        ...state,
        errorMsg: payload
      };
    case 'EDIT_REPORT_COMMENT':
      return {
        ...state,
        successMsg: payload
      };
    case 'EDIT_REPORT_COMMENT_ERROR':
      return {
        ...state,
        errorMsg: payload
      };
    case 'DELETE_REPORT_COMMENT':
      return {
        ...state,
        successMsg: payload
      };
    case 'DELETE_REPORT_COMMENT_ERROR':
      return {
        ...state,
        errorMsg: payload
      };
    default:
      return state;
  }
};

export default reportsReducer;
