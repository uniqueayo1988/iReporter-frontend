import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nav from '../../components/Nav';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  const wrapper = shallow(<Nav />);

  it('should render header', () => {
    expect(wrapper.find('header').length).toBe(0);
  });
});
