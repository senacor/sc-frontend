import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import PrStatusActionButton from './prDetail/PrStatusActionButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
let styles = theme => ({
  inputClass: {
    position: 'relative',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
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

export class SimpleErrorDialog extends React.Component {
  render() {
    const { classes, onClose, open, message, ...other } = this.props;

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
          label={'Ok'}
          inputClass={classes.inputClass}
        />
      </Dialog>
    );
  }
}

export const StyledComponent = withStyles(styles)(SimpleErrorDialog);
