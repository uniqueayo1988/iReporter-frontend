import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { func, object as objectProp } from 'prop-types';
import NavView from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import ireporterApi from '../api/ireporterApi';
import { getTokenAction, editRecordAction } from '../actions/reportActions';

/**
 * @description User edit page
 */
class EditPage extends React.Component {
  state = {
    showSignout: false,
    title: '',
    comment: '',
    errorMsg: '',
  }

  componentDidMount() {
    this.fetchRecord();
  }

  fetchRecord = async () => {
    try {
      const objUser = JSON.parse(localStorage.userInfo);
      const { token } = objUser;
      const params = new URLSearchParams(document.location.search.substring(1));
      const id = params.get('id');
      const type = params.get('type');
      const response = await ireporterApi.get(`${type}/${id}`, {
        headers: {
          'x-access-token': token,
        }
      });
      const {
        title, comment
      } = response.data.data[0];
      this.setState({
        title, comment
      });
    } catch (error) {
      this.setState({ errorMsg: 'Network Error' });
    }
  }

  handleChange = str => (e) => {
    this.setState({ [str]: e.currentTarget.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      comment,
    } = this.state;

    const params = new URLSearchParams(document.location.search.substring(1));
    const id = params.get('id');
    const type = params.get('type');
    const { getToken } = this.props;
    getToken();

    const { token } = getToken().payload;
    const { editRecord } = this.props;
    editRecord(token, type, id, title, comment);
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
  * @description edit page
  * @param {object} event - Synthetic React Event
  * @returns {HTMLDivElement} Edit
  */
  render() {
    const {
      showSignout,
      title,
      comment,
      disabled,
      errorMsg
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
              <h2 className="table-header">Edit Record</h2>
              <form action="" id="recordForm" onSubmit={this.handleSubmit}>
                <label htmlFor="title" className="form-info">*EDIT A RED FLAG OR INTERVENTION RECORD</label>
                <input type="text" placeholder="TITLE OF RECORD" id="title" onChange={this.handleChange('title')} value={title} disabled={disabled} />
                <textarea placeholder="WRITE A RECORD..." rows="10" id="comment" onChange={this.handleChange('comment')} value={comment} disabled={disabled} />
                <br />
                <div className="userMsg-wrapper">
                  {this.renderContent()}
                  {errorMsg}
                </div>
                <input type="submit" value="SUBMIT" id="recordBtn" onClick={this.handleSubmit} disabled={disabled} />
              </form>
            </section>
          </div>
          <div className="clear" />
        </main>
        <Footer />
      </div>
    );
  }
}

EditPage.propTypes = {
  editRecord: func.isRequired,
  reports: objectProp.isRequired,
  getToken: func.isRequired,
};

const mapStateToProps = state => ({ reports: state.reports });

export const mapDispatchToProps = dispatch => ({
  editRecord: (token, type, id, title, comment) => dispatch(
    editRecordAction(token, type, id, title, comment),
  ),
  getToken: () => dispatch(getTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
// export default EditPage;
