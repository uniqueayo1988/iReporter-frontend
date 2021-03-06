import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class SideNav extends React.Component {
  state = {
    logout: true,
    firstname: '',
    lastname: ''
  }

  componentDidMount() {
    const objUser = JSON.parse(localStorage.userInfo);
    const { firstname, lastname } = objUser;
    this.setState({
      firstname, lastname
    });
  }

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.setState({
      logout: false
    });
  }

  render() {
    const { logout, firstname, lastname } = this.state;
    return (
      logout ? (
        <div className="db-sidenav db-body">
          <section>
            <h2 className="user-name">
              <i className="fa fa-user-circle" />
              <br />
              {`${firstname}, ${lastname}`}
            </h2>
            <ul>
              <li className="nav-list">
                <Link to="/profile">
                  <i className="fa fa-user-o" />
                  Profile
                </Link>
              </li>
              <li className="nav-list">
                <Link to="/create">
                  <i className="fa fa-plus" />
                  Add Record
                </Link>
              </li>
              <li className="nav-list">
                <Link to="/draft">
                  <i className="fa fa-envelope-open-o" />
                  My Drafts
                </Link>
              </li>
              <li className="nav-list logout">
                <Link to="/" onClick={this.handleLogout}>
                  <i className="fa fa-sign-out" />
                  Logout
                </Link>
              </li>
            </ul>
          </section>
        </div>
      ) : <Redirect to="/" />
    );
  }
}

export default SideNav;
