import React, { useContext } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { VersionContext } from './App';

const styles = theme => ({
  content: {
    paddingBottom: 0
  }
});

const VersionDialog = ({ classes, intl }) => {
  const versionContext = useContext(VersionContext.context);

  const frontendVersion = process.env.REACT_APP_FRONTEND_VERSION
    ? process.env.REACT_APP_FRONTEND_VERSION
    : 'unknown';
  const backendVersion = window.sc_app_backend_version
    ? window.sc_app_backend_version
    : 'unknown';

  const im = id => {
    return intl.formatMessage({
      id: id
    });
  };

  return (
    <Dialog
      open={versionContext.value}
      onClose={() => {
        versionContext.setValue(false);
      }}
    >
      <DialogTitle>{im('version.title')}</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>
          {im('version.frontend.title')} {frontendVersion}
        </DialogContentText>
        <DialogContentText>
          {im('version.backend.title')} {backendVersion}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            versionContext.setValue(false);
          }}
          color="primary"
        >
          {im('version.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default injectIntl(withStyles(styles)(VersionDialog));
