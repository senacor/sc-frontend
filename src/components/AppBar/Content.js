import React from 'react';
import { withStyles } from '@material-ui/core';
import Message from './Message';

const drawerWidth = 270;
const styles = theme => ({
  ...theme,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  toolbar: theme.mixins.toolbar
});

const Content = ({ classes, children }) => {
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Message />
      {children}
    </main>
  );
};

export default withStyles(styles)(Content);
