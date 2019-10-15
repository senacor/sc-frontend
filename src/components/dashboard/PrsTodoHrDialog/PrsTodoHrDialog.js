import React, { Fragment, useState, useEffect, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import ROUTES from '../../../helper/routes';
import { ErrorContext } from '../../App';
import { getPrsHrTodo } from '../../../calls/pr';
import PrsTodoHrTable from './PrsTodoHrTable';
import InfoWidget from '../../utils/InfoWidget';

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

const PrsTodoHrDialog = ({ classes, intl, todoForHr }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [prs, setPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  useEffect(
    () => {
      if (window.location.pathname === ROUTES.PR_HR_TODO) {
        setDialogOpened(true);
        getPrsHrTodo(setPrs, setIsLoading, errorContext);
      }
    },
    [dialogOpened]
  );

  const dialogClose = () => {
    window.history.pushState(null, null, ROUTES.DASHBOARD);
    setDialogOpened(false);
  };

  const dialogOpen = () => {
    window.history.pushState(null, null, ROUTES.PR_HR_TODO);
    setDialogOpened(true);
  };

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({
          id: 'dashboard.prsInProgressHrToDo'
        })}
        linkTo={ROUTES.PR_HR_TODO}
        onClick={dialogOpen}
        value={todoForHr}
        icon={'face'}
      />
      <Dialog open={dialogOpened} onClose={dialogClose} fullWidth maxWidth="sm">
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'dashboard.prsInProgressHrToDo'
            })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          {isLoading ? (
            <CircularProgress />
          ) : todoForHr > 0 ? (
            <PrsTodoHrTable prs={prs} />
          ) : (
            <Typography variant="body2" className={classes.noPrTodo}>
              {intl.formatMessage({
                id: 'dashboard.noPrsHrTodo'
              })}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(PrsTodoHrDialog));
