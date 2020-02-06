import React, { useState, Fragment, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InfoWidget from '../../utils/InfoWidget';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PlannedLeavingsTable from './PlannedLeavingsTable';
import { getPlannedLeavings } from '../../../calls/employees';
import { useErrorContext } from '../../../helper/contextHooks';
import moment from 'moment';

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

const PlannedLeavingsDialog = ({ numberOfPlannedLeavings, classes, intl }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [plannedLeavings, setPlannedLeavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');

  const error = useErrorContext();

  useEffect(() => {
    getPlannedLeavings(setPlannedLeavings, setIsLoading, error);
  }, []);

  const dialogOpen = () => {
    setDialogOpened(true);
  };

  const dialogClose = () => {
    setDialogOpened(false);
  };

  const handleSort = () => {
    sortDirection === 'asc'
      ? setSortDirection('desc')
      : setSortDirection('asc');
  };

  const sortedPlannedLeavings = [...plannedLeavings];
  sortDirection === 'asc'
    ? sortedPlannedLeavings.sort((a, b) =>
        moment(a.endDate).isAfter(moment(b.endDate)) ? 1 : -1
      )
    : sortedPlannedLeavings.sort((a, b) =>
        moment(a.endDate).isAfter(moment(b.endDate)) ? -1 : 1
      );

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({
          id: 'dashboard.plannedleavings'
        })}
        onClick={dialogOpen}
        value={numberOfPlannedLeavings}
        //linkTo={ROUTES.FORMER_EMPLOYEES}
        icon={'emoji_people'}
      />
      <Dialog
        open={dialogOpened}
        classes={{ paper: classes.dialogPaper }}
        fullWidth
        maxWidth="lg"
      >
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'dashboard.plannedleavings'
            })}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <PlannedLeavingsTable
              plannedLeavings={sortedPlannedLeavings}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(PlannedLeavingsDialog));
