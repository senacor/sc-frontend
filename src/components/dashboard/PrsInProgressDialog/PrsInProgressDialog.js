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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

// Icons
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  card: {
    flexGrow: 1,
    margin: 3 * theme.spacing.unit,
    marginBottom: 0,
    textDecoration: 'none',
    cursor: 'pointer'
  },
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
      <Card className={classes.card} onClick={dialogOpen}>
        <CardContent>
          <Typography className={classes.title} variant="body1">
            {intl.formatMessage({
              id: 'dashboard.prsInProgress'
            })}
            :
          </Typography>
          <Typography color="textSecondary">{prsInProgress}</Typography>
        </CardContent>
      </Card>
      <Dialog open={dialogOpened} onClose={dialogClose} fullWidth maxWidth="sm">
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <span>
            {intl.formatMessage({
              id: 'dashboard.prsInProgress'
            })}
          </span>
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
