import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import Logo from '../assets/img/icon-des.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -13,
    marginRight: 10,
  },
  AppBar: {
    boxShadow: 'none',
    zIndex: '99',
  },
  separatorToolBar: {
    flexGrow: 1,
  },
};

const homeUrl =
process.env.NODE_ENV === 'production'
  ? window._env_.REACT_APP_HOME_URL
  : process.env.REACT_APP_HOME_URL;

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

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
              <Button
                color="inherit"
                size="extra-large"
                href={homeUrl}
                startIcon={<HomeIcon />}
              />
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

export default withStyles(styles)(Header);
