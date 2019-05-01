import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Nav extends React.Component {
  openNav = () => {
    const sideNav = document.querySelector('#mySidenav');
    sideNav.style.width = '250px';
  }

  closeNav = () => {
    const sideNav = document.querySelector('#mySidenav');
    sideNav.style.width = '0';
  }

  render() {
    const { handleOnClick, toggleLogin } = this.props;
    return (
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
                <li>
                  <button type="button" className="menu-btn" onClick={handleOnClick}>{!toggleLogin ? 'Signup' : 'Login'}</button>
                </li>
              </ul>

              <div className="nav-icon" onClick={this.openNav} role="presentation">
                <span className="navs"><i className="fa fa-bars" /></span>
              </div>
            </div>
          </div>

          <div id="mySidenav" className="sidenav">
            <Link to="/" className="closebtn" onClick={this.closeNav}>&times;</Link>
            <Link to="/">Home</Link>
            <Link to="/#how">How it works</Link>
            <button type="button" className="menu-btn" onClick={handleOnClick}>{!toggleLogin ? 'Signup' : 'Login'}</button>
          </div>
        </nav>
      </div>
    );
  }
}

Nav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  toggleLogin: PropTypes.bool.isRequired
};

export default Nav;
