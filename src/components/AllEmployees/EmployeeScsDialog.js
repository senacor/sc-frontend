import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { useErrorContext, useInfoContext, useUserinfoContext } from '../../helper/contextHooks';
import EmployeeScsTable from './EmployeeScsTable';
import { getEmployeeScs, createScForEmployee } from '../../calls/sc';

// Material UI
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
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
    right: 14,
    top: 14
  },
  btnCreateSc: {
    position: 'absolute',
    right: 78,
    top: 14,
    height: 50
  },
  hidden: {
    display: 'none'
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
  supervisorName,
  dialogOpen,
  setDialogOpen,
  classes,
  intl
}) => {
  const [scs, setScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const info = useInfoContext();
  const error = useErrorContext();
  const user = useUserinfoContext();

  useEffect(() => {
    getEmployeeScs(employeeId, setScs, setIsLoading, error);
  }, []);

  const dialogClose = () => {
    window.history.pushState(null, null, ROUTES.ACTIVE_EMPLOYEES_TABLE);
    setDialogOpen(false);
  };

  const calculateCreateScButtonVisibility = () => {
    if (!user.hasRoleHr() || supervisorName == null) {
      return false;
    }
    if (scs.length === 0) {
      return !isLoading;
    }

    return !scs.some((sc) => { return "INITIALIZATION READY_TO_CLOSE IN_PROGRESS".includes(sc.status) });
  };

  const handleOnCreateScClicked = () => {
    createScForEmployee(employeeId, setScs, setIsLoading, info, error);
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
        <Button
          className={calculateCreateScButtonVisibility() ? classes.btnCreateSc : classes.hidden}
          variant="contained"
          color="primary"
          onClick={() => handleOnCreateScClicked()}
        >
          {intl.formatMessage({ id: 'scdialog.createNewSc' })}
        </Button>

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
