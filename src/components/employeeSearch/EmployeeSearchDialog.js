import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import EmployeeSearch from './EmployeeSearch';

class EmployeeSearchDialog extends Component {
  render() {
    const { fullScreen, open, handleClose, selectEmployee, title } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={fullScreen}
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <EmployeeSearch selectEmployee={selectEmployee} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(EmployeeSearchDialog);
