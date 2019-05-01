import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  openNav = () => {
    const sideNav = document.querySelector('#mySidenav');
    sideNav.style.width = '250px';
  }

  closeNav = () => {
    const sideNav = document.querySelector('#mySidenav');
    sideNav.style.width = '0';
  }

  render() {
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
                  <a href="#home">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#how" className="work-menu">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="login.html">
                    <button type="button" className="menu-btn">Login</button>
                  </a>
                </li>
              </ul>

              <div className="nav-icon" onClick={this.openNav} role="presentation">
                <span className="navs"><i className="fa fa-bars" /></span>
              </div>
            </div>
          </div>

          <div id="mySidenav" className="sidenav">
            <a href="#home" className="closebtn" onClick={this.closeNav}>&times;</a>
            <a href="#home">Home</a>
            <a href="#how">How it works</a>
            <a href="login.html"><button type="button" className="menu-btn">Login</button></a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
