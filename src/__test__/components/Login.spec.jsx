import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login, mapStateToProps, mapDispatchToProps } from '../../components/Login';

configure({ adapter: new Adapter() });

const mockUser = {
  loggedIn: false,
  errorMsg: '',
  token: 'mocktoken'
};

const mockFunction = jest.fn();

describe('<Signup />', () => {
  const wrapper = shallow(<Login user={mockUser} userSignup={mockFunction} />);

  it('should render form', () => {
    expect(wrapper.find('div.right-content').length).toBe(1);
  });

  wrapper.find('#email').simulate('change', {
    currentTarget: { value: 'a@a.com' }
  });
  wrapper.find('#password').simulate('change', {
    currentTarget: { value: 'pass' }
  });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => undefined
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
