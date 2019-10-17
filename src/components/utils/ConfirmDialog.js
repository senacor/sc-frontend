import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  }
});

const ConfirmDialog = ({
  intl,
  classes,
  open,
  handleClose,
  handleConfirm,
  confirmationText,
  confirmationHeader
}) => {
  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <DialogTitle>{confirmationHeader}</DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>
        {confirmationText}
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleClose}
        >
          {`${intl.formatMessage({
            id: 'system.no'
          })}`}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleConfirm}
        >
          {`${intl.formatMessage({
            id: 'system.yes'
          })}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default injectIntl(withStyles(styles)(ConfirmDialog));
