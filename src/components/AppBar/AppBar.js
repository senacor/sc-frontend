import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';

import Sidebar from '../sidebar/Sidebar';
import ErrorMessage from './ErrorMessage';

const drawerWidth = 300;
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,

    [theme.breakpoints.up('md')]: {
      padding: 3 * theme.spacing.unit
    }
  },
  contentNoPadding: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  }
});

class CustomAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: props.classes,
      mobileOpen: false
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Senacor Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <Sidebar />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <Sidebar />
          </Drawer>
        </Hidden>
        <main
          className={
            this.props.extendedHeader
              ? classes.contentNoPadding
              : classes.content
          }
        >
          <div className={classes.toolbar} />
          <ErrorMessage />
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomAppBar);
