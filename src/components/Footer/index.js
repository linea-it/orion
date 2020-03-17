import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';
import logo from '../../assets/img/linea-logo-mini.png';
import git_json from '../../assets/json/version.json';
import styles from './styles'

function Footer () {
  
  const classes = styles();

  const openLineaWebSite = () => {
    window.open('http://www.linea.gov.br/', 'linea');
  };

  const openGithub = vlink => {
    if (vlink) {
      window.open(vlink);
    }
  };

  const instance =
    process.env.NODE_ENV === 'production'
      ? window._env_.REACT_APP_INSTANCE
      : process.env.REACT_APP_INSTANCE;

  let version = '--';
  let vlink = null;

  if (
    Object.entries(git_json).length !== 0 &&
    git_json.constructor === Object
  ) {
    if (git_json.tag) {
      version = `${git_json.tag}`;
      vlink = `${git_json.url}`;
    } else {
      version = `${git_json.sha.substring(0, 7)}`;
      vlink = `${git_json.url.replace(/.git$/, '')}/commit/${git_json.sha}`;
    }
  }

  return (
    <footer className={classes.root}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.grow} color="inherit">
            {instance} Portal:{' '}
            <span
              onClick={() => openGithub(vlink)}
              className={classes.versionLink}
            >
              {version}
            </span>
          </Typography>
          <Typography color="inherit">Powered by</Typography>
          <img
            src={logo}
            onClick={openLineaWebSite}
            title="LIneA"
            alt="LineA"
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </Toolbar>
      </AppBar>
    </footer>
  );
}

export default (Footer);
