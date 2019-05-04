import React from 'react';
import ireporterApi from '../api/ireporterApi';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

class RecordPage extends React.Component {
  state = {
    showSignout: false,
    title: '',
    createdon: '',
    image: '',
    comment: '',
    errMessage: ''
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
      // const response = await ireporterApi.get(`${type}/${id}/user`, {
        headers: {
          'x-access-token': token,
        }
      });
      const {
        title, createdon, image, comment
      } = response.data.data[0];
      const date = new Date(createdon);
      const dateString = date.toDateString();
      this.setState({
        title, createdon: dateString, image, comment
      });
    } catch (error) {
      this.setState({ errMessage: error.response });
    }
  }

  render() {
    const {
      showSignout, title, createdon, image, comment, errMessage
    } = this.state;
    return (
      <div>
        <header>
          <Nav showSignout={showSignout} />
        </header>

        <main>
          <SideNav />
          <div className="main-div">
            <section className="db-content">
              <p>Hello</p>
              <h2 className="record-header">{title.toUpperCase()}</h2>
              <span className="record-name">{createdon}</span>
              <img src={`https://andela-ireporter.herokuapp.com/${image}`} alt="Record" />
              <br />
              <div>{comment}</div>
            </section>
          </div>
          <div className="clear" />
          {errMessage}
        </main>
        <Footer />
      </div>
    );
  }
}


export default RecordPage;
