import React from 'react';
import { configure, shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import Adapter from 'enzyme-adapter-react-16';
import AdminPage from '../../views/AdminPage';
import ireporterApi from '../../api/ireporterApi';

configure({ adapter: new Adapter() });

const mock = new MockAdapter(ireporterApi);

describe('<Admin />', () => {
  let wrapper;
  beforeEach(() => {
    mock.onGet('interventions/users').reply(200, {
      status: 200,
      data: [
        {
          id: 10,
          createdon: '2019-02-01T14:07:13.965Z',
          createdby: 30,
          type: 'intervention',
          location: '3MJG+Q4 Chini, Nigeria',
          status: 'draft',
          image: 'upload/incident.jpg',
          title: '',
          comment: 'Please intervene in what seems a lingering issue in ibeju lekki area of lagos state concerning the stealing of the state funds.\r\nThank you.'
        },
      ]
    });

    mock.onGet('red-flags/users').reply(200, {
      status: 200,
      data: [
        {
          id: 2,
          createdon: '2018-12-14T08:45:23.206Z',
          createdby: 5,
          type: 'redFlag',
          location: 'ikeja',
          status: 'resolved',
          image: 'ayo.jpg',
          title: 'red flag',
          comment: 'an incident in ikeja'
        },
      ]
    });
    jest.spyOn(JSON, 'parse').mockReturnValue({ token: 'sss' });
    wrapper = shallow(<AdminPage />);
  });

  afterEach(jest.restoreAllMocks);

  it('should render nav', () => {
    wrapper.find('.showRecord').simulate('click');
    expect(wrapper.find('td').length).toBe(0);
  });

  it('should render nav', () => {
    wrapper.find('.showInt').simulate('click');
    expect(wrapper.find('td').length).toBe(0);
  });

  it('should render app', () => {
    console.log(wrapper.debug());
    expect(wrapper.find('table').length).toBe(1);
    // console.log(wrapper.debug());
  });
});
