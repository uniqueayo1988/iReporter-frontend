import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Input from './Input';
import ireporterApi from '../api/ireporterApi';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    fetching: false,
    loggedIn: false,
    isAdmin: false,
    isUser: false,
    message: ''
  }

  handleChange = str => (e) => {
    this.setState({ [str]: e.currentTarget.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ fetching: true, message: '' });
    const {
      email,
      password,
    } = this.state;

    try {
      const response = await ireporterApi.post('/auth/login', {
        email, password,
      });
      // const { status } = response.data;
      const { token, user } = response.data.data[0];
      const { firstName, lastName } = user;
      const userInfo = {
        token, firstName, lastName
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      if (firstName === 'admin') {
        this.setState({ isAdmin: true });
      } else {
        this.setState({ loggedIn: true });
      }
      this.setState({ fetching: false, isUser: true });
    } catch (error) {
      this.setState({ fetching: false, message: error.response.data.message });
    }
  }

  redirectLogin() {
    const { isAdmin, loggedIn } = this.state;
    if (isAdmin) {
      return <Redirect to="/admin" />;
    }
    if (loggedIn) {
      return <Redirect to="/profile" />;
    }
  }

  renderContent() {
    const { message } = this.state;
    if (message) {
      return <div id="returnMsg">{message}</div>;
    }
  }

  render() {
    const {
      email,
      password,
      fetching,
      message,
      isUser,
    } = this.state;
    const { handleOnClick } = this.props;
    return (
      !isUser ? (
        <div className="right-content">
          <h2 className="form-header">Be an iReporter</h2>
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="email" className="form-info">*Your information will be treated with utmost confidentiality!</label>
            <Input type="email" placeholder="EMAIL" id="email" onChange={this.handleChange('email')} value={email} />
            <Input type="password" placeholder="PASSWORD" id="password" onChange={this.handleChange('password')} value={password} />
            {message && this.renderContent()}
            <button type="submit" className="sign-proceed" disabled={fetching}>{!fetching ? 'LOGIN' : 'LOADING...'}</button>
          </form>

          <div className="register-link">
            <span className="form-info">Not registered?</span>
            <br />
            <span className="register-here" onClick={handleOnClick} role="presentation">REGISTER HERE</span>
          </div>
        </div>
      ) : this.redirectLogin()
    );
  }
}

Login.propTypes = {
  handleOnClick: PropTypes.func.isRequired
};

export default Login;
