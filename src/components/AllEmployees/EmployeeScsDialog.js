import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { useErrorContext } from '../../helper/contextHooks';
import EmployeeScsTable from './EmployeeScsTable';
import { getEmployeeScs } from '../../calls/sc';

// Material UI
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import ROUTES from '../../helper/routes';

const styles = theme => ({
  btnClose: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10
  },
  dialogContent: {
    padding: 3 * theme.spacing.unit,
    textAlign: 'center'
  },
  dialogPaper: {
    height: '80vh'
  }
});

const EmployeeScsDialog = ({
  employeeId,
  firstName,
  lastName,
  dialogOpen,
  setDialogOpen,
  classes,
  intl
}) => {
  const [scs, setScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();

  useEffect(() => {
    getEmployeeScs(employeeId, setScs, setIsLoading, error);
  }, []);

  const dialogClose = () => {
    window.history.pushState(null, null, ROUTES.ALL_PRS_TABLE);
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={dialogOpen}
        onClose={dialogClose}
        fullWidth
        maxWidth="lg"
        classes={{ paper: classes.dialogPaper }}
      >
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'scdialog.scsvon'
            }) + `${firstName} ${lastName}`}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          {isLoading ? <CircularProgress /> : <EmployeeScsTable scs={scs} />}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeScsDialog));
