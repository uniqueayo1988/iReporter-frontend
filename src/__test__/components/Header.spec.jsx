import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  const wrapper = shallow(<Header />);

  it('should render header', () => {
    expect(wrapper.find('header').length).toBe(1);
  });
});
