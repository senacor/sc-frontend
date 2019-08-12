import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { injectIntl } from 'react-intl';

import Sidebar from '../sidebar/Sidebar';
import ErrorMessage from './ErrorMessage';
import LanguageButton from './LanguageButton';

const drawerWidth = 270;
const appBarHeight = 64;
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    width: '100%',
    height: '100vh'
  },
  appBar: {
    height: appBarHeight,
    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      position: 'fixed'
    }
  },
  desktopContent: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100vh',

    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: '100vh',

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing.unit
    }
  }
});

const CustomAppBar = ({ classes, intl, theme, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={intl.formatMessage({
              id: 'appbar.drawer'
            })}
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            {intl.formatMessage({
              id: 'appbar.portal'
            })}
          </Typography>
          <LanguageButton color="secondary" />
        </Toolbar>
      </AppBar>
      <Hidden lgUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <Sidebar />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ErrorMessage />
          {children}
        </main>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Sidebar />
        </Drawer>
        <main className={classes.desktopContent}>
          <div className={classes.toolbar} />
          <ErrorMessage />
          {children}
        </main>
      </Hidden>
    </div>
  );
};

export default injectIntl(
  withStyles(styles, { withTheme: true })(CustomAppBar)
);
