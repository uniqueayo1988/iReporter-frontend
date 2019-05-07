import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Nav, mapStateToProps, mapDispatchToProps } from '../../components/Nav';

configure({ adapter: new Adapter() });

const mockFunc = jest.fn();

const mockUser = {
  loggedIn: false,
  errorMsg: '',
  token: 'mocktoken'
};

describe('<Nav />', () => {
  const wrapper = shallow(<Nav
    user={mockUser}
    handleOnClick={mockFunc}
    toggleLogin
    showSignout={false}
    userLogout={mockFunc}
  />);

  it('should render Nav', () => {
    expect(wrapper.find('nav').length).toBe(1);
  });


  it('should click the nav icon', () => {
    wrapper.find('div.nav-icon').simulate('click');
  });

  it('should trigger the close button', () => {
    wrapper.find('span.closebtn').simulate('click');
  });


  it('should trigger logout button', () => {
    wrapper.find('#logout').simulate('click');
  });

  const wrapper2 = shallow(<Nav
    user={mockUser}
    handleOnClick={mockFunc}
    toggleLogin
    showSignout
    userLogout={mockFunc}
  />);

  it('should trigger logout button', () => {
    wrapper2.find('#login').simulate('click');
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
