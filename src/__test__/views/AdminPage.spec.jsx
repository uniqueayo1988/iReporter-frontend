import React from 'react';
import { configure, shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import Adapter from 'enzyme-adapter-react-16';
import AdminPage from '../../views/AdminPage';
import ireporterApi from '../../api/ireporterApi';

configure({ adapter: new Adapter() });

const mock = new MockAdapter(ireporterApi);

describe('<Admin />', () => {
  const wrapper = shallow(<AdminPage />);

  // token =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  // eyJ1c2VySWQiOjMzLCJpYXQiOjE1NTY5NDg0NTgsImV
  // 4cCI6MTU1NzAzNDg1OH0.teUVCB6qtP1Rec4Vpkz1jM2ZJZYVTHnBZL4FWbn_TEo';


  mock.onGet('/interventions/users', {
    // headers: {
    //   'x-access-token': token
    // }
  }).reply(200, {
    status: 200,
    data: [
      {
        user: {
          firstName: 'man',
          lastName: 'man',
          Email: 'a@a.com',
          Username: 'man'
        }
      }
    ]
  });

  it('should render app', () => {
    expect(wrapper.find('table').length).toBe(1);
  });
});
