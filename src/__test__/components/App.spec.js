import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const wrapper = shallow(<App />)

  it('should render app', () => {
    expect(wrapper.find('p').length).toBe(1) 
    expect(wrapper.find('h1').length).toBe(1) 
  });  
})
