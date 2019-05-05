import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminSideNav from '../../components/AdminSideNav';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {
  const wrapper = shallow(<AdminSideNav />);

  it('should render nav', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});
