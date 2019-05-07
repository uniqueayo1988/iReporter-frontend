import reportsReducer from '../../reducer/reportsReducer';

const initialState = {
  interventions: [],
  redflags: [],
  user: '',
  errorMsg: '',
  successMsg: ''
};

describe('report initial state', () => {
  it('should have the right initial state', () => {
    const reportState = reportsReducer(undefined, {
      type: 'INITIAL_STATE'
    });
    expect(reportState.interventions).toEqual([]);
    expect(reportState.redflags).toEqual([]);
    expect(reportState.user).toEqual('');
    expect(reportState.errorMsg).toEqual('');
    expect(reportState.successMsg).toEqual('');
  });
});

describe('report reducer', () => {
  it('should get store records', () => {
    const userInfo = {
      firstname: 'ade',
      lastname: 'ade',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE1NTcyMjE5OTUsImV4cCI6MTU1NzMwODM5NX0.tmmJuvxYImEbjN0Bo0ZILuMCwXuHIGZtY2n2Vx4TDGE'
    };
    const reportState = reportsReducer(undefined, {
      type: 'GET_TOKEN',
      payload: userInfo
    });
    expect(reportState.user).toEqual(userInfo);
  });
});

describe('report reducer', () => {
  it('should get store records', () => {
    const interventions = [
      {
        id: 24,
        createdon: '2019-05-06T12:32:35.838Z',
        createdby: 46,
        type: 'redFlag',
        location: 'H938+HG Lagos, Nigeria',
        status: 'draft',
        image: 'upload/bonze.jpg',
        title: 'safds',
        comment: 'asfdsd'
      },
      {
        id: 27,
        createdon: '2019-05-06T12:39:54.921Z',
        createdby: 46,
        type: 'redFlag',
        location: 'H938+HG Lagos, Nigeria',
        status: 'draft',
        image: 'upload/ayo.jpg',
        title: 'sadfs',
        comment: 'sdfdf'
      },
    ];

    const reportState = reportsReducer(undefined, {
      type: 'FETCH_INTERVENTION_REPORTS',
      payload: interventions
    });
    expect(reportState.interventions).toEqual(interventions);
  });

  it('should get store records', () => {
    const redflags = [
      {
        id: 21,
        createdon: '2019-05-06T12:32:25.838Z',
        createdby: 46,
        type: 'redFlag',
        location: 'H938+HG Lagos, Nigeria',
        status: 'draft',
        image: 'upload/bonze.jpg',
        title: 'safds',
        comment: 'asfdsd'
      },
      {
        id: 7,
        createdon: '2019-05-06T12:39:54.921Z',
        createdby: 46,
        type: 'redFlag',
        location: 'H938+HG Lagos, Nigeria',
        status: 'draft',
        image: 'upload/ayo.jpg',
        title: 'sadfs',
        comment: 'sdfdf'
      },
    ];

    const reportState = reportsReducer(undefined, {
      type: 'FETCH_REDFLAG_REPORTS',
      payload: redflags
    });
    expect(reportState.redflags).toEqual(redflags);
  });

  it('should mock error while fetching records', () => {
    const reportState = reportsReducer(initialState, {
      type: 'FETCH_INTERVENTION_REPORTS_ERROR',
      payload: 'my error'
    });
    expect(reportState.report_error).toEqual('my error');
  });

  it('should mock error while fetching records', () => {
    const reportState = reportsReducer(initialState, {
      type: 'FETCH_REDFLAG_REPORTS_ERROR',
      payload: 'my error'
    });
    expect(reportState.report_error).toEqual('my error');
  });

  it('should mock a create report', () => {
    const reportState = reportsReducer(initialState, {
      type: 'CREATE_REPORTS',
      payload: 'This is my succcess'
    });
    expect(reportState.successMsg).toEqual('This is my succcess');
  });

  it('should mock a create report error', () => {
    const reportState = reportsReducer(initialState, {
      type: 'CREATE_REPORTS_ERROR',
      payload: 'This is an error'
    });
    expect(reportState.errorMsg).toEqual('This is an error');
  });
});
