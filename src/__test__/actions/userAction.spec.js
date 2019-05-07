import moxios from 'moxios';
import {
  userLoginAction,
  userSignupAction,
  userLogoutAction,
  localStore
} from '../../actions/userActions';

describe('Testing the delete article action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch the logout action', () => {
    const logout = userLogoutAction();
    expect(logout.type).toEqual('LOGOUT_USER');
    expect(logout.payload).toEqual('You have successfully logged out');
  });

  it('should test the localStorage action', () => {
    const token = 'mock_token';
    const firstname = 'mock_firstname';
    const lastname = 'mock_lastname';
    localStore(token, firstname, lastname);
  });

  it('should test the login action for success', async () => {
    const mockRequest = { data: 'mock data' };
    const expectedResponse = 'logged in successfully';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });

    await userLoginAction(mockRequest);
  });

  it('should test the login action for error', async () => {
    const mockRequest = { data: 'mock data' };
    const expectedResponse = 'error occurred';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: expectedResponse });
    });

    await userLoginAction(mockRequest);
  });

  it('should test the signup action for success', async () => {
    const mockRequest = { data: 'mock data' };
    const expectedResponse = 'logged in successfully';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });

    await userSignupAction(mockRequest);
  });

  it('should test the signup action for error', async () => {
    const mockRequest = { data: 'mock data' };
    const expectedResponse = 'error occurred';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: expectedResponse });
    });

    await userSignupAction(mockRequest);
  });
});
