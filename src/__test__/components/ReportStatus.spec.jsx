import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReportStatus from '../../components/ReportStatus';

configure({ adapter: new Adapter() });

describe('<ReportStatus />', () => {
  const wrapper = shallow(<ReportStatus />);

  it('should render ReportStatus', () => {
    expect(wrapper.find('div').length).toBe(7);
  });
});
