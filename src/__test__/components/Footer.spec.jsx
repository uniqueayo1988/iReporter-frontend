import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../components/Footer';

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  const wrapper = shallow(<Footer />);

  it('should render footer', () => {
    expect(wrapper.find('div').length).toBe(2);
  });
});
