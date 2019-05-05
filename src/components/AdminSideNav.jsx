import React from 'react';
import { Link } from 'react-router-dom';

const AdminSideNav = () => (
  <div className="db-sidenav">
    <section>
      <h2 className="user-name">
        <i className="fa fa-user-circle" />
        <br />
        Admin
      </h2>
      <ul>
        <li className="nav-list">
          <Link to="/admin">
            <i className="fa fa-home" />
            Home
          </Link>
        </li>
        <li className="nav-list logout">
          <Link to="/">
            <i className="fa fa-sign-out" />
            Logout
          </Link>
        </li>
      </ul>
    </section>
  </div>

);

export default AdminSideNav;
