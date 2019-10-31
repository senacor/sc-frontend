import React, { Fragment, useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import ROUTES from '../../../helper/routes';
import ScsTodoHrTable from './ScsTodoHrTable';
import InfoWidget from '../../utils/InfoWidget';
import { useErrorContext } from '../../../helper/contextHooks';
import { getScsHrTodo } from '../../../calls/sc';

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
  noPrTodo: {
    color: theme.palette.secondary.mediumGrey
  }
});

const ScsTodoHrDialog = ({ classes, intl, todoForHr }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [scs, setScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();

  useEffect(
    () => {
      if (window.location.pathname === ROUTES.SC_HR_TODO) {
        setDialogOpened(true);
        getScsHrTodo(setScs, setIsLoading, error);
      }
    },
    [dialogOpened]
  );

  const dialogClose = () => {
    window.history.pushState(null, null, ROUTES.DASHBOARD);
    setDialogOpened(false);
  };

  const dialogOpen = () => {
    window.history.pushState(null, null, ROUTES.SC_HR_TODO);
    setDialogOpened(true);
  };

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({
          id: 'dashboard.scsInProgressHrToDo'
        })}
        linkTo={ROUTES.SC_HR_TODO}
        onClick={dialogOpen}
        value={todoForHr}
        icon={'bar_chart'}
      />
      <Dialog open={dialogOpened} onClose={dialogClose} fullWidth maxWidth="sm">
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'dashboard.scsInProgressHrToDo'
            })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          {isLoading ? (
            <CircularProgress />
          ) : todoForHr > 0 ? (
            <ScsTodoHrTable scs={scs} />
          ) : (
            <Typography variant="body2" className={classes.noPrTodo}>
              {intl.formatMessage({
                id: 'dashboard.noScsHrTodo'
              })}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScsTodoHrDialog));
