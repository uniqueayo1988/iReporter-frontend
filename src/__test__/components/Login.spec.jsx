import React from 'react';
import { configure, shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import Adapter from 'enzyme-adapter-react-16';
import ireporterApi from '../../api/ireporterApi';
import Login from '../../components/Login';

const mock = new MockAdapter(ireporterApi);
configure({ adapter: new Adapter() });

describe('<Login />', () => {
  mock.onPost('/auth/login').reply(200, {
    status: 200,
    data: [
      {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE1NTY4MTQwMDAsImV4cCI6MTU1NjkwMDQwMH0.wVb51QmUK5SzRU-a9pDapBHZNhSmGO6rIlTqwZSMlOI',
        user: {
          firstName: 'ade',
          lastName: 'ade',
          Email: 'ade@ade.co',
          Username: 'ade'
        }
      }
    ]
  });
  it('should doen psksl', async () => {
    const wrapper = shallow(<Login />);

    wrapper.find('#email').simulate('change', {
      currentTarget: { value: 'man' }
    });
    wrapper.find('#password').simulate('change', {
      currentTarget: { value: 'pass' }
    });
    wrapper.find('form').simulate('submit', {
      preventDefault: () => undefined
    });

    // expect(Login.prototype.handleSubmit).toHaveBeenCalled();
    // console.log(wrapper.debug());
  });
  it('should doen psksl', async () => {
    mock.onPost('/auth/login').reply(500);
    const wrapper = shallow(<Login />);

    wrapper.find('form').simulate('submit', {
      preventDefault: () => undefined
    });
    // console.log(wrapper.debug());
  });
});
