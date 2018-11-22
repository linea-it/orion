import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/Dashboard" activeclassname="active" className="nav-link">
          Dashboard
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
