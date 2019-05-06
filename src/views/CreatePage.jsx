import React from 'react';
import { get } from 'axios';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import ireporterApi from '../api/ireporterApi';

class CreatePage extends React.Component {
  state = {
    showSignout: false,
    title: '',
    comment: '',
    location: '',
    type: 'redFlag',
    image: '',
    errorMsg: '',
    disabled: true
  }

  handleChange = str => (e) => {
    this.setState({ [str]: e.currentTarget.value });
    console.log(this.state);
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
          this.setState({ errorMsg: error.response });
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
    try {
      const objUser = JSON.parse(localStorage.userInfo);
      const { token } = objUser;
      const response = await ireporterApi.post('/red-flags', {
        data: formData
      },
      {
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      });
      this.setState({ errorMsg: response.data.data[0].message });
    } catch (error) {
      this.setState({ errorMsg: error.response.data.message });
    }
  }

  render() {
    const {
      showSignout,
      title,
      comment,
      location,
      type,
      image,
      // disabled,
      // errorMsg
    } = this.state;
    return (
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
                <input type="text" placeholder="GEOLOCATION" id="geo-data" name="location" value={location} className="location" onChange={this.handleChange('location')} required />
                <button type="button" id="geo-btn" onClick={this.getLocation}>Get Geolocation</button>
                <br />
                <br />
                <br />

                <label htmlFor="image">Select an image: </label>
                <br />
                <input type="file" name="image" id="image" onChange={this.handleChange('image')} accept="image/*" value={image} />
                <div className="userMsg-wrapper" />
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

export default CreatePage;
