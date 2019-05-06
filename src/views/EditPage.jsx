import React from 'react';
import { Redirect } from 'react-router';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import ireporterApi from '../api/ireporterApi';

/**
 * @description User edit page
 */
class EditPage extends React.Component {
  state = {
    showSignout: false,
    title: '',
    comment: '',
    errorMsg: '',
    disabled: true,
    successMsg: ''
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
        title, comment, disabled: false
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
    this.setState({ disabled: true });
    const {
      title,
      comment,
    } = this.state;

    try {
      const params = new URLSearchParams(document.location.search.substring(1));
      const id = params.get('id');
      const type = params.get('type');
      const objUser = JSON.parse(localStorage.userInfo);
      const { token } = objUser;
      const response = await ireporterApi.patch(`${type}/${id}/comment`, {
        title, comment
      },
      {
        headers: {
          'x-access-token': token
        },
      });

      this.setState({ disabled: false, successMsg: response.data.data[0].message });
    } catch (error) {
      this.setState({ disabled: false, errorMsg: error.response.data.message });
    }
  }

  renderContent() {
    const { successMsg, errorMsg } = this.state;
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
      disabled
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
              <h2 className="table-header">Edit Record</h2>
              <form action="" id="recordForm" onSubmit={this.handleSubmit}>
                <label htmlFor="title" className="form-info">*EDIT A RED FLAG OR INTERVENTION RECORD</label>
                <input type="text" placeholder="TITLE OF RECORD" id="title" onChange={this.handleChange('title')} value={title} disabled={disabled} />
                <textarea placeholder="WRITE A RECORD..." rows="10" id="comment" onChange={this.handleChange('comment')} value={comment} disabled={disabled} />
                <br />
                <div className="userMsg-wrapper">
                  {this.renderContent()}
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

export default EditPage;
