import React, { Fragment, useState, useEffect, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import ROUTES from '../../../helper/routes';
import { ErrorContext } from '../../App';
import { getPrsInProgress } from '../../../calls/pr';
import PrsInProgressTable from './PrsInProgressTable';

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
import InfoWidget from '../InfoWidget';

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
  }
});

const PrsInProgressDialog = ({ classes, intl, prsInProgress }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [prs, setPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  useEffect(
    () => {
      if (window.location.pathname === ROUTES.PR_IN_PROGRESS) {
        setDialogOpened(true);
        getPrsInProgress(setPrs, setIsLoading, errorContext);
      }
    },
    [dialogOpened]
  );

  const dialogClose = () => {
    window.history.pushState(null, null, ROUTES.DASHBOARD);
    setDialogOpened(false);
  };

  const dialogOpen = () => {
    window.history.pushState(null, null, ROUTES.PR_IN_PROGRESS);
    setDialogOpened(true);
  };

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({
          id: 'dashboard.prsInProgress'
        })}
        linkTo={ROUTES.PR_IN_PROGRESS}
        onClick={dialogOpen}
        value={prsInProgress}
        icon={'contact_mail'}
      />
      <Dialog open={dialogOpened} onClose={dialogClose} fullWidth maxWidth="sm">
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'dashboard.prsInProgress'
            })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          {isLoading ? <CircularProgress /> : <PrsInProgressTable prs={prs} />}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(PrsInProgressDialog));
