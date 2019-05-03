import React from 'react';
import { configure, shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import Adapter from 'enzyme-adapter-react-16';
import ireporterApi from '../../api/ireporterApi';
import Signup from '../../components/Signup';

const mock = new MockAdapter(ireporterApi);
configure({ adapter: new Adapter() });

describe('<Signup />', () => {
  mock.onPost('/auth/signup').reply(201, {
    status: 201,
    data: [
      {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE1NTY4MTQwMDAsImV4cCI6MTU1NjkwMDQwMH0.wVb51QmUK5SzRU-a9pDapBHZNhSmGO6rIlTqwZSMlOI',
        user: {
          firstName: 'man',
          lastName: 'man',
          Email: 'a@a.com',
          Username: 'man'
        }
      }
    ]
  });
  it('should doen psksl', async () => {
    const wrapper = shallow(<Signup />);
    wrapper.find('#firstname').simulate('change', {
      currentTarget: { value: 'man' }
    });
    wrapper.find('#lastname').simulate('change', {
      currentTarget: { value: 'man' }
    });
    wrapper.find('#othernames').simulate('change', {
      currentTarget: { value: 'man' }
    });
    wrapper.find('#email').simulate('change', {
      currentTarget: { value: 'a@a.com' }
    });
    wrapper.find('#phoneNumber').simulate('change', {
      currentTarget: { value: '123456' }
    });
    wrapper.find('#username').simulate('change', {
      currentTarget: { value: 'man' }
    });
    wrapper.find('#password').simulate('change', {
      currentTarget: { value: 'pass' }
    });
    wrapper.find('#confirmPassword').simulate('change', {
      currentTarget: { value: 'pass' }
    });
    wrapper.find('form').simulate('submit', {
      preventDefault: () => undefined
    });

    // expect(Login.prototype.handleSubmit).toHaveBeenCalled();
    // console.log(wrapper.debug());
  });
  it('should test for error', async () => {
    mock.onPost('/auth/signup').reply(500);
    const wrapper = shallow(<Signup />);

    wrapper.find('form').simulate('submit', {
      preventDefault: () => undefined
    });
  });
});
