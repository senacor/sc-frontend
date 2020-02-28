import React, { Fragment, useEffect, useState } from 'react';
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
import ROUTES from '../../../helper/routes';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  btnClose: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 3 * theme.spacing.unit,
    paddingRight: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit,
    textAlign: 'center',
    overflowY: 'auto'
  },
  dialogPaper: {
    height: '80vh'
  }
});

const PlannedLeavingsDialog = ({
  numberOfPlannedLeavings,
  classes,
  intl,
  history
}) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [plannedLeavings, setPlannedLeavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();

  useEffect(() => {
    if (window.location.pathname === ROUTES.PLANNED_LEAVINGS) {
      setDialogOpened(true);
    }
    getPlannedLeavings(setPlannedLeavings, setIsLoading, error);
  }, []);

  const dialogOpen = () => {
    history.push(ROUTES.PLANNED_LEAVINGS);
    setDialogOpened(true);
  };

  const dialogClose = () => {
    history.push(ROUTES.DASHBOARD);
    setDialogOpened(false);
  };

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({
          id: 'dashboard.plannedleavings'
        })}
        onClick={dialogOpen}
        value={numberOfPlannedLeavings}
        linkTo={ROUTES.PLANNED_LEAVINGS}
        icon={'emoji_people'}
      />
      <Dialog
        open={dialogOpened}
        classes={{ paper: classes.dialogPaper }}
        onClose={dialogClose}
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
            <PlannedLeavingsTable plannedLeavings={plannedLeavings} />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withRouter(
  injectIntl(withStyles(styles)(PlannedLeavingsDialog))
);
