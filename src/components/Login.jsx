import React from 'react';
import {
  shape, string, object, func
} from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Input from './Input';
import { userLoginAction } from '../actions/userActions';

export class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = str => (e) => {
    this.setState({ [str]: e.currentTarget.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;
    const { userLogin } = this.props;
    userLogin(email, password);
  }

  redirectLogin() {
    const { user } = this.props;
    const { payload, loggedIn } = user;
    const { user: userInfo } = payload;
    const { firstName } = userInfo;
    if (firstName === 'admin' && loggedIn) {
      return <Redirect to="/admin" />;
    }
    if (firstName !== 'admin' && loggedIn) {
      return <Redirect to="/profile" />;
    }
  }

  renderContent() {
    const { user } = this.props;
    const { errorMsg } = user;
    if (errorMsg) {
      return <div id="returnMsg">{errorMsg}</div>;
    }
  }

  render() {
    const {
      email,
      password,
    } = this.state;
    const { handleOnClick, user } = this.props;
    const { isUser, errorMsg } = user;
    return (
      !isUser ? (
        <div className="right-content">
          <h2 className="form-header">Be an iReporter</h2>
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="email" className="form-info">*Your information will be treated with utmost confidentiality!</label>
            <Input type="email" placeholder="EMAIL" id="email" onChange={this.handleChange('email')} value={email} />
            <Input type="password" placeholder="PASSWORD" id="password" onChange={this.handleChange('password')} value={password} />
            {errorMsg && this.renderContent()}
            <button type="submit" className="sign-proceed">LOGIN</button>
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
  handleOnClick: func.isRequired,
  user: shape({
    token: string,
    user: object,
  }).isRequired,
  userLogin: func.isRequired
};

Login.defaultProptype = {
  user: shape({
    token: '',
    user: undefined
  })
};

export const mapStateToProps = state => ({ user: state.users });

export const mapDispatchToProps = dispatch => ({
  userLogin: (email, password) => dispatch(userLoginAction(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
