import React from 'react';
import { Link } from 'react-router-dom';
import ireporterApi from '../api/ireporterApi';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

class AdminPage extends React.Component {
  state = {
    interventions: [],
    redflags: [],
    toggle: false,
    toggleRedflag: true,
    errMessage: '',
    showSignout: false
  }

  componentDidMount() {
    this.fetchIntervention();
    this.fetchRedflag();
  }

  fetchIntervention = async () => {
    try {
      const objUser = JSON.parse(localStorage.userInfo);
      const { token } = objUser;
      const response = await ireporterApi.get('interventions/users', {
        headers: {
          'x-access-token': token,
        }
      });
      this.setState({ interventions: response.data.data });
    } catch (error) {
      this.setState({ errMessage: error.response });
    }
  }

  fetchRedflag = async () => {
    try {
      const objUser = JSON.parse(localStorage.userInfo);
      const { token } = objUser;
      const response = await ireporterApi.get('red-flags/users', {
        headers: {
          'x-access-token': token,
        }
      });
      this.setState({ redflags: response.data.data });
    } catch (error) {
      this.setState({ errMessage: error.response });
    }
  }

  showIntervention = () => {
    this.setState({
      toggle: true,
      toggleRedflag: false
    });
  }

  showRedflag = () => {
    this.setState({
      toggle: false,
      toggleRedflag: true
    });
  }

  render() {
    const {
      interventions, redflags, toggle, toggleRedflag, errMessage, showSignout
    } = this.state;

    return (
      <div>
        <header>
          <Nav showSignout={showSignout} />
        </header>
        <main className="db-body">
          <div className="db-sidenav">
            <section>
              <h2 className="user-name">
                <i className="fa fa-user-circle" />
                <br />
                Admin
              </h2>
              <ul>
                <li className="nav-list">
                  <Link to="/">
                    <i className="fa fa-home" />
                    Home
                  </Link>
                </li>
                <li className="nav-list logout">
                  <Link to="/">
                    <i className="fa fa-sign-out" />
                    Logout
                  </Link>
                </li>
              </ul>
            </section>
          </div>
          <div className="main-div">
            <h1 className="db-header">ADMIN DASHBOARD</h1>
            <hr />
            <section className="db-table">
              <h2 className="table-header">User Records</h2>
              <div style={{ overflowX: 'auto' }}>
                <div style={{ float: 'right' }}>
                  <button type="button" className="menu-btn tb-btn showRecord" onClick={this.showRedflag}>
                    <i className="fa fa-plus tb-fa" />
                    Red flags
                  </button>
                  <button type="button" className="menu-btn tb-btn showInt" onClick={this.showIntervention}>
                    <i className="fa fa-plus tb-fa" />
                    Interventions
                  </button>
                </div>
                <table id="userRedflag">
                  <tr className="tr-header">
                    <th>S/N</th>
                    <th>Record</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                  { toggle
                    && interventions.map((item, i) => {
                      const date = new Date(item.createdon);
                      const stringDate = date.toDateString();
                      return (
                        <tr key={item.id}>
                          <td>{i + 1}</td>
                          <td>
                            <Link to={`/record?id=${item.id}&type=interventions`}>
                              <h3 className="tr-header">{item.title}</h3>
                              <p>
                                {item.comment}
                                <br />
                                <span className="tb-date">{`${stringDate} - Userid: ${item.createdby}`}</span>
                              </p>
                            </Link>
                          </td>
                          <td>{item.location}</td>
                          <td>{item.type}</td>
                          <td className="statusUpdate">{item.status}</td>
                          <td>
                            <select className="status" name={item.id}>
                              <option>draft</option>
                              <option>resolved</option>
                              <option>under investigation</option>
                              <option>rejected</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  }
                  { toggleRedflag
                    && redflags.map((item, i) => {
                      const date = new Date(item.createdon);
                      const stringDate = date.toDateString();
                      return (
                        <tr key={item.id}>
                          <td>{i + 1}</td>
                          <td>
                            <Link to={`/record?id=${item.id}&type=redflags`}>
                              <h3 className="tr-header">{item.title}</h3>
                              <p>
                                {item.comment}
                                <br />
                                <span className="tb-date">{`${stringDate} - Userid: ${item.createdby}`}</span>
                              </p>
                            </Link>
                          </td>
                          <td>{item.location}</td>
                          <td>{item.type}</td>
                          <td className="statusUpdate">{item.status}</td>
                          <td>
                            <select className="status" name={item.id}>
                              <option>draft</option>
                              <option>resolved</option>
                              <option>under investigation</option>
                              <option>rejected</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  }
                </table>
              </div>
            </section>
          </div>
          <div className="clear" />
        </main>
        {errMessage}
        <Footer />
      </div>
    );
  }
}

export default AdminPage;
