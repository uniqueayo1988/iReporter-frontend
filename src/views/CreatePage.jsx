import React from 'react';
import { Redirect } from 'react-router';
import { get } from 'axios';
import { connect } from 'react-redux';
import { func, object as objectProp } from 'prop-types';
import NavView from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import { createRecordAction, getTokenAction } from '../actions/reportActions';

class CreatePage extends React.Component {
  state = {
    showSignout: false,
    title: '',
    comment: '',
    location: '',
    type: 'redFlag',
    image: '',
    geoMsg: '',
    disabled: true,
  }

  handleChange = str => (e) => {
    this.setState({ [str]: e.currentTarget.value });
  }

  getLocation = () => {
    this.setState({ disabled: false });
    window.navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        try {
          const apiRequest = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyAMBlwdnO6grtZ88dwLJy42Qw1PMumqI9U`;

          const response = await get(apiRequest, {
            headers: {
              Accept: 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
          });
          this.setState({ disabled: true, location: response.data.plus_code.compound_code });
        } catch (error) {
          this.setState({ geoMsg: error.response });
        }
      }
    );
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title, comment, location, type, image
    } = this.state;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('comment', comment);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('image', image);

    let url;
    if (type === 'redFlag') {
      url = 'red-flags';
    }
    if (type === 'intervention') {
      url = 'interventions';
    }

    const { getToken } = this.props;
    getToken();

    const { token } = getToken().payload;
    const { createRecord } = this.props;
    createRecord(url, token, formData);
  }

  handleFile = (e) => {
    const file = e.target.files[0];
    this.setState({ image: file });
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

  render() {
    const {
      showSignout,
      title,
      comment,
      location,
      type,
      disabled,
      geoMsg
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
              <h2 className="table-header">Create Record</h2>
              <form action="" id="recordForm" name="recordForm" onSubmit={this.handleSubmit}>
                <label htmlFor="title" className="form-info">*CREATE A RED FLAG OR INTERVENTION RECORD</label>
                <input type="text" placeholder="TITLE OF RECORD" id="title" name="title" onChange={this.handleChange('title')} value={title} />
                <textarea placeholder="WRITE A RECORD..." rows="10" id="comment" name="comment" onChange={this.handleChange('comment')} value={comment} />
                <br />
                <input type="radio" id="redFlag" name="type" onChange={this.handleChange('type')} value="redFlag" checked={type === 'redFlag'} />
                Red flag Record
                <br />
                <input type="radio" id="intervention" name="type" onChange={this.handleChange('type')} value="intervention" checked={type === 'intervention'} />
                Intervention Record
                <br />
                <br />
                <input type="text" placeholder="GEOLOCATION" id="geo-data" name="location" value={location} className="location" onChange={this.handleChange('location')} required disabled={disabled} />
                <button type="button" id="geo-btn" onClick={this.getLocation}>Get Geolocation</button>
                <br />
                <br />
                <br />

                <label htmlFor="image">Select an image: </label>
                <br />
                <input type="file" name="image" id="image" onChange={this.handleFile} required />
                <div className="userMsg-wrapper">
                  {geoMsg}
                  {this.renderContent()}
                </div>
                <input type="submit" value="SUBMIT" id="recordBtn" />
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

CreatePage.propTypes = {
  createRecord: func.isRequired,
  reports: objectProp.isRequired,
  getToken: func.isRequired,
};

const mapStateToProps = state => ({ reports: state.reports });

export const mapDispatchToProps = dispatch => ({
  createRecord: (url, token, formData) => dispatch(
    createRecordAction(url, token, formData),
  ),
  getToken: () => dispatch(getTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
