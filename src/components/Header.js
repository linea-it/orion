import React from 'react';
//import { Link } from 'react-router';

import Menu from './Menu';

import logo from '../assets/img/icon-des.png';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a href="http://testing.linea.gov.br" className="navbar-brand">
          <img src={logo} alt="Portal" />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
