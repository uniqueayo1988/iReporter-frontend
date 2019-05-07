import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { userLogoutAction } from '../actions/userActions';

class Nav extends React.Component {
  state = {
    logout: true,
    navWidth: 0
  }

  openNav = () => {
    this.setState({ navWidth: '250px' });
  }

  closeNav = () => {
    this.setState({ navWidth: 0 });
  }

  handleLogout = () => {
    const { userLogout } = this.props;
    userLogout();
    this.setState({
      logout: false
    });
  }

  render() {
    const { handleOnClick, toggleLogin, showSignout } = this.props;
    const { logout, navWidth } = this.state;
    const navWide = { width: navWidth };

    return (
      logout ? (
        <div>
          <nav>
            <div className="nav-header">
              <div className="logo">
                <Link to="/">
                  <span className="logo-i">i</span>
                  REPORTER
                </Link>
              </div>

              <div className="nav-wrapper">
                <ul className="nav-menu">
                  {showSignout && (
                    <div className="showSignout">
                      <li>
                        <Link to="/">
                          Home
                        </Link>
                      </li>
                      <li>
                        <a href="#how" className="work-menu">
                          How it works
                        </a>
                      </li>
                    </div>
                  )}
                  <li>
                    {showSignout
                      ? <button type="button" className="menu-btn" onClick={handleOnClick}>{!toggleLogin ? 'Signup' : 'Login'}</button>
                      : <button type="button" className="menu-btn" onClick={this.handleLogout}>Logout</button>
                    }
                  </li>
                </ul>

                <div className="nav-icon" onClick={this.openNav} role="presentation">
                  <span className="navs"><i className="fa fa-bars" /></span>
                </div>
              </div>
            </div>

            <div id="mySidenav" className="sidenav" style={navWide}>
              <span className="closebtn" onClick={this.closeNav} role="presentation">&times;</span>
              {showSignout && (
                <div>
                  <Link to="/">Home</Link>
                  <Link to="/#how">How it works</Link>
                </div>
              )}
              {showSignout
                ? <button type="button" className="menu-btn btn-user" onClick={handleOnClick}>{!toggleLogin ? 'Signup' : 'Login'}</button>
                : <button type="button" className="menu-btn btn-user" onClick={this.handleLogout}>Logout</button>
              }
            </div>
          </nav>
        </div>
      ) : <Redirect to="/" />
    );
  }
}

Nav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  toggleLogin: PropTypes.bool.isRequired,
  showSignout: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.users });

export const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(userLogoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
