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
import { getAllEmployees, getEmployeesInTeam } from '../../../calls/employees';
import {
  useErrorContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  btnClose: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10
  }
});

const ScsToDelegateDialog = ({ classes, intl }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [employeesInTeam, setEmployeesInTeam] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();
  const userId = useUserinfoContext().context.value.userinfo.userId;
  const userName = useUserinfoContext().context.value.userinfo.employeeName;

  useEffect(() => {
    getAllEmployees(setAllEmployees, setIsLoading, error).then(() => {
      getEmployeesInTeam(setEmployeesInTeam, userId, setIsLoading, error);
    });
  }, []);

  useEffect(
    () => {
      const defaultReviewers = [];
      employeesInTeam.forEach(() => {
        defaultReviewers.push({
          reviewerId: userId,
          reviewerName: userName
        });
      });
      setReviewers(defaultReviewers);
    },
    [employeesInTeam]
  );

  const dialogOpen = () => {
    setDialogOpened(true);
  };

  const dialogClose = () => {
    setDialogOpened(false);
  };

  return (
    <Fragment>
      <InfoWidget
        label={'vyberaj beurteilerov'}
        //linkTo={}
        onClick={dialogOpen}
        value={employeesInTeam.length}
        icon={'category'}
      />
      <Dialog open={dialogOpened}>
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">{'vyberaj'}</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ScsToDelegateTable
              employeesInTeam={employeesInTeam}
              reviewers={reviewers}
              setReviewers={setReviewers}
              allEmployees={allEmployees}
            />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScsToDelegateDialog));
