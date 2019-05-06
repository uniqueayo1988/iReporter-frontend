import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import ReportStatus from '../components/ReportStatus';
import ireporterApi from '../api/ireporterApi';

/**
 * @description User profile page
 */
class ProfilePage extends React.Component {
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
      const response = await ireporterApi.get('interventions', {
        headers: {
          'x-access-token': token,
        }
      });
      this.setState({ interventions: response.data.data });
    } catch (error) {
      this.setState({ errMessage: 'Network error encountered' });
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

  /**
  * @description profile page
  * @param {object} event - Synthetic React Event
  * @returns {HTMLDivElement} profile
  */
  render() {
    const {
      interventions, redflags, toggle, toggleRedflag, errMessage, showSignout
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
            <section className="db-profile">
              <ReportStatus title="Red Flag Records" resolved={0} unresolvedDraft={0} underInvestigation={0} rejected={0} />
              <ReportStatus title="Intervention Records" resolved={0} unresolvedDraft={0} underInvestigation={0} rejected={0} />
            </section>

            <section>
              <h2 className="table-header">My Records</h2>

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
                    <th>Media</th>
                    <th>Record</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                  { toggle
                    && interventions.map((item) => {
                      const date = new Date(item.createdon);
                      const stringDate = date.toDateString();
                      return (
                        <tr key={item.id}>
                          <td><img src={`https://andela-ireporter.herokuapp.com/${item.image}`} alt="Intervention" /></td>
                          <td>
                            <Link to={`/record?id=${item.id}&type=interventions`}>
                              <h3 className="tr-header">{item.title}</h3>
                              <p>
                                {item.comment}
                                <br />
                                <span className="tb-date">{stringDate}</span>
                              </p>
                            </Link>
                          </td>
                          <td>{item.type.toUpperCase()}</td>
                          <td>{item.status.toUpperCase()}</td>
                        </tr>
                      );
                    })
                  }
                  { toggleRedflag
                    && redflags.map((item) => {
                      const date = new Date(item.createdon);
                      const stringDate = date.toDateString();
                      return (
                        <tr key={item.id}>
                          <td><img src={`https://andela-ireporter.herokuapp.com/${item.image}`} alt="Red Flag" /></td>
                          <td>
                            <Link to={`/record?id=${item.id}&type=red-flags`}>
                              <h3 className="tr-header">{item.title}</h3>
                              <p>
                                {item.comment}
                                <br />
                                <span className="tb-date">{stringDate}</span>
                              </p>
                            </Link>
                          </td>
                          <td>{item.type.toUpperCase()}</td>
                          <td>{item.status.toUpperCase()}</td>
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
