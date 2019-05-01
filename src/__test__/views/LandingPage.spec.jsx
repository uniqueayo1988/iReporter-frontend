import React from 'react';
// import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from '../../views/LandingPage';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const wrapper = shallow(<LandingPage />);

  it('should render app', () => {
    expect(wrapper.find('p').length).toBe(5);
  });
});
