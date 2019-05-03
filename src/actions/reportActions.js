import ireporterApi from '../api/ireporterApi';

const fetchInterventionAction = token => async (dispatch) => {
  try {
    const response = await ireporterApi.get('/interventions/users', {
      headers: {
        'x-access-token': token
      }
    });
    dispatch({ type: 'FETCH_INTERVENTION_REPORTS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_INTERVENTION_REPORTS_ERROR', payload: error.response.data });
  }
};

const fetchRedflagAction = token => async (dispatch) => {
  try {
    const response = await ireporterApi.get('/interventions/users', {
      headers: {
        'x-access-token': token
      }
    });
    dispatch({ type: 'FETCH_REDFLAG_REPORTS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_REDFLAG_REPORTS_ERROR', payload: error.response.data });
  }
};

export { fetchInterventionAction, fetchRedflagAction };
