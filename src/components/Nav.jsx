import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class Nav extends React.Component {
  state = {
    logout: true
  }

  openNav = () => {
    const sideNav = document.querySelector('#mySidenav');
    sideNav.style.width = '250px';
  }

  closeNav = () => {
    const sideNav = document.querySelector('#mySidenav');
    sideNav.style.width = '0';
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      logout: false
    });
  }

  render() {
    const { handleOnClick, toggleLogin, showSignout } = this.props;
    const { logout } = this.state;
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
                        <Link to="/#how" className="work-menu">
                          How it works
                        </Link>
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

            <div id="mySidenav" className="sidenav">
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
};

export default Nav;
