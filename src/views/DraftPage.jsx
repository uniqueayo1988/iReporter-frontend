import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import ireporterApi from '../api/ireporterApi';

/**
 * @description User draft page
 */
class ProfilePage extends React.Component {
  state = {
    interventions: [],
    redflags: [],
    toggle: false,
    toggleRedflag: true,
    errMessage: '',
    showSignout: false,
    successMsg: ''
  }

  componentDidMount() {
    this.fetchIntervention();
    this.fetchRedflag();
  }

  fetchIntervention = async () => {
    try {
      const objUser = JSON.parse(localStorage.userInfo);
      const { token } = objUser;
      const response = await ireporterApi.get('interventions', {
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
      const response = await ireporterApi.get('red-flags', {
        headers: {
          'x-access-token': token,
        }
      });
      this.setState({ redflags: response.data.data });
    } catch (error) {
      this.setState({ errMessage: 'Network error encountered' });
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

  deleteRecord = async (e) => {
    const { id, className } = e.currentTarget;
    if (window.confirm('Click OK to delete this record')) { // eslint-disable-line no-alert
      try {
        const objUser = JSON.parse(localStorage.userInfo);
        const { token } = objUser;
        const response = await ireporterApi.delete(`${className}/${id}`, {
          headers: {
            'x-access-token': token,
          }
        });
        this.setState({ successMsg: response.data.data[0].message });
        this.componentDidMount();
      } catch (error) {
        this.setState({ errMessage: 'Network error encountered' });
      }
    }
  }

  renderContent() {
    const { successMsg } = this.state;
    if (successMsg) {
      return <div id="successMsg">{successMsg}</div>;
    }
  }

  /**
  * @description draft page
  * @param {object} event - Synthetic React Event
  * @returns {HTMLDivElement} draft
  */
  render() {
    const {
      interventions, redflags, toggle, toggleRedflag, errMessage, showSignout, successMsg
    } = this.state;

    const isLoggedIn = localStorage.userInfo;
    return !isLoggedIn ? <Redirect to="/" /> : (
      <div>
        <header>
          <Nav showSignout={showSignout} />
        </header>
        <main className="db-body">
          <SideNav />

          <div className="main-div">
            <h1 className="db-header">iREPORTER DASHBOARD</h1>
            <hr />

            <section className="db-table">
              <h2 className="table-header">My Drafts</h2>
              <div style={{ textAlign: 'center' }}>
                {successMsg && this.renderContent()}
              </div>
              <div style={{ overflowX: 'auto' }}>
                <Link to="/create">
                  <button type="button" className="menu-btn tb-btn">
                    <i className="fa fa-plus tb-fa" />
                    Add Record
                  </button>
                </Link>
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

                <table id="profileRedflag">
                  <tr className="tr-header">
                    <th>S/N</th>
                    <th>Record</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                  { toggle
                    && interventions.map((item, i) => {
                      const date = new Date(item.createdon);
                      const stringDate = date.toDateString();
                      return (
                        <tr key={item.id}>
                          <td>{i + 1}</td>
                          <td>
                            <Link to={`/edit?id=${item.id}&type=interventions`}>
                              <h3 className="tr-header">{item.title}</h3>
                              <p>
                                {item.comment}
                                <br />
                                <span className="tb-date">{stringDate}</span>
                              </p>
                            </Link>
                          </td>
                          <td>{item.type.toUpperCase()}</td>
                          <td>
                            {item.location}
                            <br />
                            <button type="button" className="locationBtn" name={item.id}>
                              <span className="tb-date">Change</span>
                            </button>
                          </td>
                          <td className="td-action">
                            <Link to={`/edit?id=${item.id}&type=interventions`}>
                              <i className="fa fa-edit tb-edit" />
                            </Link>
                          </td>
                          <td className="td-action">
                            <span className="interventions" id={item.id} onClick={this.deleteRecord} role="presentation">
                              <i className="fa fa-trash tb-delete" />
                            </span>
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
                            <Link to={`/edit?id=${item.id}&type=red-flags`}>
                              <h3 className="tr-header">{item.title}</h3>
                              <p>
                                {item.comment}
                                <br />
                                <span className="tb-date">{stringDate}</span>
                              </p>
                            </Link>
                          </td>
                          <td>{item.type.toUpperCase()}</td>
                          <td>
                            {item.location}
                            <br />
                            <button type="button" className="locationBtn" name={item.id}>
                              <span className="tb-date">Change</span>
                            </button>
                          </td>
                          <td className="td-action">
                            <Link to={`/edit?id=${item.id}&type=red-flags`}>
                              <i className="fa fa-edit tb-edit" />
                            </Link>
                          </td>
                          <td className="td-action">
                            <span className="red-flags" id={item.id} onClick={this.deleteRecord} role="presentation">
                              <i className="fa fa-trash tb-delete" />
                            </span>
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

export default ProfilePage;
