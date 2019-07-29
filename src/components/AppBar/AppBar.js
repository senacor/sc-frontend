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
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    width: '99%'
  },
  appBar: {
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
    padding: theme.spacing.unit,

    [theme.breakpoints.up('lg')]: {
      padding: 3 * theme.spacing.unit
    },
    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,

    [theme.breakpoints.up('lg')]: {
      padding: 3 * theme.spacing.unit
    }
  }
});

const CustomAppBar = props => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={props.classes.root}>
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={props.intl.formatMessage({
              id: 'appbar.drawer'
            })}
            onClick={handleDrawerToggle}
            className={props.classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            {props.intl.formatMessage({
              id: 'appbar.portal'
            })}
          </Typography>
          <LanguageButton color="secondary" />
        </Toolbar>
      </AppBar>
      <Hidden lgUp>
        <Drawer
          variant="temporary"
          anchor={props.theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: props.classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <Sidebar />
        </Drawer>
        <main className={props.classes.content}>
          <div className={props.classes.toolbar} />
          <ErrorMessage />
          {props.children}
        </main>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: props.classes.drawerPaper
          }}
        >
          <Sidebar />
        </Drawer>
        <main className={props.classes.desktopContent}>
          <div className={props.classes.toolbar} />
          <ErrorMessage />
          {props.children}
        </main>
      </Hidden>
    </div>
  );
};

export default injectIntl(
  withStyles(styles, { withTheme: true })(CustomAppBar)
);
