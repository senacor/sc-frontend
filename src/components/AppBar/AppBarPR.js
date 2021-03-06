import React, { useContext, useState } from 'react';
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
import LanguageButton from '../translations/LanguageButton';
import { VersionContext } from '../App';

const drawerWidth = 270;
const appBarHeight = 64;
const styles = theme => ({
  appBar: {
    height: appBarHeight,
    marginLeft: drawerWidth,
    zIndex: 2,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      position: 'fixed'
    }
  },
  languageButton: {
    color: theme.palette.contrastText,
    marginLeft: 'auto'
  },
  hidden: {
    display: 'none'
  }
});

const AppBarPR = ({ classes, intl, theme }) => {
  const versionContext = useContext(VersionContext.context);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div id={'appbarElement'}>
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
          <Typography variant="h6" color="inherit" noWrap onDoubleClick={() => {versionContext.setValue(true)}}>
            {intl.formatMessage({
              id: 'appbar.appTitle'
            })}
          </Typography>

          {/*language button is hidden because it's currently not used*/}
          <LanguageButton
            languageButtonClassName={`${classes.languageButton} ${
              classes.hidden
            }`}
          />
        </Toolbar>
      </AppBar>
      <Hidden lgUp className={'ignorePrint'}>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={drawerOpen}
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
      </Hidden>
      <Hidden mdDown implementation="css" className={'ignorePrint'}>
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
    </div>
  );
};

export default injectIntl(withStyles(styles, { withTheme: true })(AppBarPR));
