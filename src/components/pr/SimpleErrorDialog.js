import React from 'react';
import { injectIntl } from 'react-intl';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import PrStatusActionButton from './prDetail/PrStatusActionButton';

let styles = theme => ({
  inputClass: {
    position: 'relative',
    backgroundColor: theme.palette.primary['400'],
    color: theme.palette.secondary.white,
    marginBottom: '10%',
    marginTop: '5%',
    marginRight: '40%',
    marginLeft: '40%'
  },
  textClass: {
    textAlign: 'center',
    marginTop: '10%'
  }
});

const SimpleErrorDialog = ({
  classes,
  onClose,
  open,
  message,
  intl,
  ...other
}) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      aria-labelledby="simple-dialog-title"
      {...other}
    >
      <DialogTitle>
        <Typography variant={'body2'} className={classes.textClass}>
          {message}
        </Typography>
      </DialogTitle>
      <PrStatusActionButton
        releaseButtonClick={onClose}
        label={intl.formatMessage({
          id: 'simpleerrordialog.ok'
        })}
        inputClass={classes.inputClass}
      />
    </Dialog>
  );
};

export default injectIntl(withStyles(styles)(SimpleErrorDialog));
