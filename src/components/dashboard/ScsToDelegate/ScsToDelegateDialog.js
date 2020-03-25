import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import InfoWidget from '../../utils/InfoWidget';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import ScsToDelegateTable from './ScsToDelegateTable';
import {
  getAllEmployees,
  getEmployeesInTeam,
  saveReviewers
} from '../../../calls/employees';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  btnClose: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10
  },
  dialogPaper: {
    minWidth: 700
  }
});

const ScsToDelegateDialog = ({ classes, intl }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [employeesInTeam, setEmployeesInTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUserinfoContext();
  const { userinfo } = user.context.value;
  const error = useErrorContext();
  const info = useInfoContext();
  const userId = userinfo.userId;
  const scsToDelegate = userinfo.scsToDelegate;

  useEffect(() => {
    getAllEmployees(setAllEmployees, setIsLoading, error).then(() => {
      getEmployeesInTeam(setEmployeesInTeam, userId, setIsLoading, error);
    });
  }, []);

  const dialogOpen = () => {
    setDialogOpened(true);
  };

  const dialogClose = () => {
    setDialogOpened(false);
  };

  const createData = () => {
    return employeesInTeam.map(entry => ({
      employeeId: entry.employeeId,
      reviewerId: entry.reviewerId
    }));
  };

  const handleSave = () => {
    saveReviewers(createData(), info, error).then(() => {
      // refresh page in order to hide the card on dashboard (for selecting reviewers)
      window.location.reload();
    });
    dialogClose();
  };

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({ id: 'scstodelegate.select' })}
        onClick={dialogOpen}
        value={scsToDelegate}
        icon={'category'}
      />
      <Dialog open={dialogOpened} classes={{ paper: classes.dialogPaper }}>
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">
            {intl.formatMessage({ id: 'scstodelegate.select' })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ScsToDelegateTable
              employeesInTeam={employeesInTeam}
              setEmployeesInTeam={setEmployeesInTeam}
              allEmployees={allEmployees}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={dialogClose}>
            {intl.formatMessage({ id: 'scstodelegate.cancel' })}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {intl.formatMessage({ id: 'scstodelegate.save' })}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScsToDelegateDialog));
