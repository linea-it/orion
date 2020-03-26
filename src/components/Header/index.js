import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import Logo from '../../assets/img/icon-des.png';
import styles from './styles';

// const homeUrl = '//' + window.location.host;
const homeUrl = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? ':' : ''
}${window.location.port}`;

function Header() {
  const classes = styles();

  return (
    <header className={classes.root}>
      <AppBar className={classes.AppBar} position="fixed">
        <Toolbar variant="dense">
          <IconButton
            href={homeUrl}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <img src={Logo} alt="Portal" />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Dashboard
          </Typography>
          <div className={classes.separatorToolBar} />
          <Button color="inherit" size="large" href={homeUrl}>
            <HomeIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
