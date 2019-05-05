import React from 'react';
import PropTypes from 'prop-types';
import ireporterApi from '../api/ireporterApi';

class RecordView extends React.Component {
  state = {
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
      const { reportUrl } = this.props;
      const response = await ireporterApi.get(`${type}/${id}/${reportUrl}`, {
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
      title, createdon, image, comment, errMessage
    } = this.state;
    return (
      <div>
        <section className="db-content">
          <h2 className="record-header">{title.toUpperCase()}</h2>
          <span className="record-name">{createdon}</span>
          <img src={`https://andela-ireporter.herokuapp.com/${image}`} alt="Record" />
          <br />
          <div>{comment}</div>
        </section>
        {errMessage}
      </div>
    );
  }
}

RecordView.propTypes = {
  reportUrl: PropTypes.string,
};

RecordView.defaultProps = {
  reportUrl: ''
};

export default RecordView;
