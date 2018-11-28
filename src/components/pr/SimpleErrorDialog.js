import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Button from '@material-ui/core/Button/Button';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';

export class SimpleErrorDialog extends React.Component {
  render() {
    const { onClose, open, message, ...other } = this.props;

    return (
      <Dialog
        onClose={onClose}
        open={open}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle>{message}</DialogTitle>
        <Button onClick={onClose}>Ok</Button>
      </Dialog>
    );
  }
}
