import React from 'react';
import { Redirect } from 'react-router';
import Input from './Input';
import ireporterApi from '../api/ireporterApi';

class Signup extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    othernames: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    fetching: false,
    loggedIn: false,
    message: ''
  }

  handleChange = str => (e) => {
    this.setState({ [str]: e.currentTarget.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ fetching: true, message: '' });
    const {
      firstname,
      lastname,
      othernames,
      email,
      phoneNumber,
      username,
      password,
      confirmPassword,
    } = this.state;

    if (password === confirmPassword) {
      try {
        const response = await ireporterApi.post('/auth/signup', {
          firstname, lastname, othernames, email, phoneNumber, username, password,
        });
        const { status } = response.data;
        const { token, user } = response.data.data[0];
        const { firstName, lastName } = user;
        if (status === 201) {
          const userInfo = {
            token, firstName, lastName
          };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          this.setState({ loggedIn: true });
        }
        this.setState({ fetching: false });
      } catch (error) {
        this.setState({ fetching: false, message: error.response.data.message });
      }
    } else {
      this.setState({ fetching: false, message: 'You have entered wrong passwords' });
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
      firstname,
      lastname,
      othernames,
      email,
      phoneNumber,
      username,
      password,
      confirmPassword,
      fetching,
      message,
      loggedIn
    } = this.state;
    return (
      !loggedIn ? (
        <div className="right-content" id="register">
          <h2 className="form-header">Be an iReporter</h2>
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="firstname" className="form-info">*Your information will be treated with utmost confidentiality!</label>
            <Input type="text" placeholder="FIRST NAME" id="firstname" onChange={this.handleChange('firstname')} value={firstname} />
            <Input type="text" placeholder="LAST NAME" id="lastname" onChange={this.handleChange('lastname')} value={lastname} />
            <Input type="text" placeholder="OTHER NAMES" id="othernames" onChange={this.handleChange('othernames')} value={othernames} required={false} />
            <Input type="email" placeholder="EMAIL" id="email" onChange={this.handleChange('email')} value={email} />
            <Input type="text" placeholder="TELEPHONE" id="phoneNumber" onChange={this.handleChange('phoneNumber')} value={phoneNumber} />
            <Input type="text" placeholder="USERNAME" id="username" onChange={this.handleChange('username')} value={username} />
            <Input type="password" placeholder="PASSWORD" id="password" onChange={this.handleChange('password')} value={password} />
            <Input type="password" placeholder="CONFIRM PASSWORD" id="confirmPassword" onChange={this.handleChange('confirmPassword')} value={confirmPassword} />
            {message && this.renderContent()}
            <button type="submit" className="sign-proceed" disabled={fetching}>{!fetching ? 'PROCEED' : 'LOADING...'}</button>
          </form>
        </div>
      ) : (
        <Redirect to="/profile" />
      )
    );
  }
}

export default Signup;
