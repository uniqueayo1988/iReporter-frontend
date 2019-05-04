import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../../components/Input';

configure({ adapter: new Adapter() });

describe('<Input />', () => {
  const wrapper = shallow(<Input />);

  it('should render footer', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});
