import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { func, object as objectProp } from 'prop-types';
import NavView from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import ireporterApi from '../api/ireporterApi';
import { deleteRecordAction, getTokenAction } from '../actions/reportActions';

/**
 * @description User draft page
 */
class DraftPage extends React.Component {
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
      const { getToken } = this.props;
      getToken();
      const { token } = getToken().payload;
      const { deleteRecord } = this.props;
      deleteRecord(token, className, id);
      this.componentDidMount();
    }
  }

  renderContent() {
    const { reports } = this.props;
    const { successMsg, errorMsg } = reports;
    if (successMsg) {
      return <div id="successMsg">{successMsg}</div>;
    }
    if (errorMsg) {
      return <div id="returnMsg">{errorMsg}</div>;
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
          <NavView showSignout={showSignout} />
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
                  <tbody>
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
                  </tbody>
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

DraftPage.propTypes = {
  deleteRecord: func.isRequired,
  reports: objectProp.isRequired,
  getToken: func.isRequired,
};

const mapStateToProps = state => ({ reports: state.reports });

export const mapDispatchToProps = dispatch => ({
  deleteRecord: (token, id, className) => dispatch(
    deleteRecordAction(token, id, className),
  ),
  getToken: () => dispatch(getTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DraftPage);
// export default DraftPage;
