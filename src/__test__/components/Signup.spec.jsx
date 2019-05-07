import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Signup, mapStateToProps, mapDispatchToProps } from '../../components/Signup';

configure({ adapter: new Adapter() });

const mockUser = {
  loggedIn: false,
  errorMsg: '',
  token: 'mocktoken'
};

const mockFunction = jest.fn();

describe('<Signup />', () => {
  const wrapper = shallow(<Signup user={mockUser} userSignup={mockFunction} />);

  it('should render form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should trigger the submit button', () => {
    expect(wrapper.find('.sign-proceed').exists()).toBe(true);
    wrapper.find('.sign-proceed').simulate('submit');
  });


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

  const anotherMock = {
    loggedIn: false,
    errorMsg: 'hello',
    token: 'mocktoken'
  };
  const wrapperB = shallow(<Signup user={anotherMock} userSignup={mockFunction} />);
  it('should render form', () => {
    expect(wrapperB.find('form').length).toBe(1);
  });

  const anotherMockC = {
    loggedIn: true,
    errorMsg: 'hello',
    token: 'mocktoken'
  };
  const wrapperBc = shallow(<Signup user={anotherMockC} userSignup={mockFunction} />);
  it('should render form', () => {
    expect(wrapperBc.find('form').length).toBe(0);
  });

  it('should mock the mapStateToProps function', () => {
    const state = {
      users: {
        username: 'ayo'
      }
    };
    expect(mapStateToProps(state)).toEqual({ user: state.users });
  });

  it('should mock the mapDispatchToProps function', () => {
    mapDispatchToProps(jest.fn());
  });
});
