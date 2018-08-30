import React from 'react';
import { IndexLink } from 'react-router';

const Menu = () => {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <IndexLink
          to="/Dashboard"
          activeClassName="active"
          className="nav-link"
        >
          Dashboard
        </IndexLink>
      </li>
    </ul>
  );
};

export default Menu;
