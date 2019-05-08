import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  shape, string, object, func
} from 'prop-types';
import Input from './Input';
import { userSignupAction } from '../actions/userActions';

/**
 * @description class for user signup
 * @param {e} for events actions
 * @returns {undefined}
 */
export class Signup extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    othernames: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  }

  handleChange = str => (e) => {
    this.setState({ [str]: e.currentTarget.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
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
    const { userSignup } = this.props;
    userSignup(
      firstname, lastname, othernames, email, phoneNumber, username, password, confirmPassword
    );
  }

  renderContent() {
    const { user } = this.props;
    const { errorMsg } = user;
    if (errorMsg || '') {
      return <div id="returnMsg">{errorMsg || ''}</div>;
    }
  }

  /**
 * @description renders react JSX
 * @returns {JSX} react router
 */
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
    } = this.state;
    const { user } = this.props;
    const { errorMsg, loggedIn } = user;
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
            {errorMsg && this.renderContent()}
            <button type="submit" className="sign-proceed">PROCEED</button>
          </form>
        </div>
      ) : (
        <Redirect to="/profile" />
      )
    );
  }
}

Signup.propTypes = {
  userSignup: func.isRequired,
  user: shape({
    token: string,
    user: object,
  }).isRequired,
};

Signup.defaultProptype = {
  user: shape({
    token: '',
    user: undefined
  })
};

export const mapStateToProps = state => ({ user: state.users });

export const mapDispatchToProps = dispatch => ({
  userSignup: (
    firstname, lastname, othernames, email, phoneNumber, username, password, confirmPassword
  ) => dispatch(userSignupAction(
    firstname, lastname, othernames, email, phoneNumber, username, password, confirmPassword
  ))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
