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
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  }
});

const TextInputDialog = ({
  intl,
  classes,
  open,
  handleClose,
  handleSubmit,
  submitDisabled,
  inputLabel,
  handleInputChange,
  dialogHeader,
  onBackdropClick
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onBackdropClick={onBackdropClick}
    >
      <DialogTitle>{dialogHeader}</DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>
      <TextField
        required
        type="text"
        margin="normal"
        variant="outlined"
        label={inputLabel}
        fullWidth
        onChange={handleInputChange}
        inputProps={{ className: classes.input }}
      />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleClose}
        >
          {`${intl.formatMessage({
            id: 'system.cancel'
          })}`}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={submitDisabled}
        >
          {`${intl.formatMessage({
            id: 'system.ok'
          })}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default injectIntl(withStyles(styles)(TextInputDialog));
