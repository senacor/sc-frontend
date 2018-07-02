import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class MyPRListFilterDialog extends Component {
  render() {
    const { fullScreen, open, handleClose } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={fullScreen}
      >
        <DialogTitle>Filter</DialogTitle>

        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(MyPRListFilterDialog);
