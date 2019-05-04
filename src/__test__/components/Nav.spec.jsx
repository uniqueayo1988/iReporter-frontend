import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import MockAdapter from 'axios-mock-adapter';
import Nav from '../../components/Nav';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {
  const wrapper = shallow(<Nav />);

  it('should render nav', () => {
    expect(wrapper.find('nav').length).toBe(1);
  });
});


// describe('when the button is clicked', () => {
//   const spy = jest.spyOn(Nav.prototype, 'openNav()');
//   const app = shallow(<Nav />);

//   it('calls the `openNav` function', () => {
//     app.find('.nav-icon').simulate('click');
//     expect(spy).toHaveBeenCalled();
//   });
// });
