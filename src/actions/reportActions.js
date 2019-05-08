import ireporterApi from '../api/ireporterApi';

/**
 * @description function for fetching token from localstorage
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {object} action
 */
const getTokenAction = () => {
  const objUser = JSON.parse(localStorage.userInfo);
  const { token, firstname, lastname } = objUser;
  return {
    type: 'GET_TOKEN', payload: { token, firstname, lastname }
  };
};

const fetchInterventionAction = token => async (dispatch) => {
  try {
    const response = await ireporterApi.get('/interventions', {
      headers: {
        'x-access-token': token
      }
    });
    dispatch({ type: 'FETCH_INTERVENTION_REPORTS', payload: response.data.data });
  } catch (error) {
    dispatch({ type: 'FETCH_INTERVENTION_REPORTS_ERROR', payload: error.response.data });
  }
};

const fetchRedflagAction = token => async (dispatch) => {
  try {
    const response = await ireporterApi.get('/red-flags', {
      headers: {
        'x-access-token': token
      }
    });
    dispatch({ type: 'FETCH_REDFLAG_REPORTS', payload: response.data.data });
  } catch (error) {
    dispatch({ type: 'FETCH_REDFLAG_REPORTS_ERROR', payload: error.response.data });
  }
};

const createRecordAction = (url, token, formData) => async (dispatch) => {
  try {
    const response = await ireporterApi.post(`/${url}`,
      formData,
      {
        headers: {
          'x-access-token': token
        }
      });
    dispatch({ type: 'CREATE_REPORTS', payload: response.data.data[0].message });
  } catch (error) {
    dispatch({ type: 'CREATE_REPORTS_ERROR', payload: error.response.data.message });
  }
};

const editRecordAction = (token, type, id, title, comment) => async (dispatch) => {
  try {
    const response = await ireporterApi.patch(`/${type}/${id}/comment`, {
      title, comment,
    },
    {
      headers: {
        'x-access-token': token
      }
    });
    dispatch({ type: 'EDIT_REPORT_COMMENT', payload: response.data.data[0].message });
  } catch (error) {
    dispatch({ type: 'EDIT_REPORT_COMMENT_ERROR', payload: error.response.data.message });
  }
};

const deleteRecordAction = (token, className, id) => async (dispatch) => {
  try {
    const response = await ireporterApi.delete(`/${className}/${id}`,
      {
        headers: {
          'x-access-token': token
        }
      });
    dispatch({ type: 'DELETE_REPORT_COMMENT', payload: response.data.data[0].message });
  } catch (error) {
    dispatch({ type: 'DELETE_REPORT_COMMENT_ERROR', payload: 'Network error encountered' });
  }
};


export {
  getTokenAction,
  fetchInterventionAction,
  fetchRedflagAction,
  createRecordAction,
  editRecordAction,
  deleteRecordAction
};
