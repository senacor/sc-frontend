import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import ROUTES from '../../../helper/routes';
import { getDeclinedPrs } from '../../../calls/pr';
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
import PrsDeclinedTable from './PrsDeclinedTable';
import { useErrorContext } from '../../../helper/contextHooks';

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

const PrsDeclinedDialog = ({ isHr, refreshDashboard, classes, intl, declinedPrs }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [prs, setPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();

  useEffect(
    () => {
      if (window.location.pathname === ROUTES.DECLINED_PR) {
        setDialogOpened(true);
        getDeclinedPrs(isHr, setPrs, setIsLoading, error);
      }
    },
    [dialogOpened]
  );

  const dialogClose = () => {
    window.history.pushState(null, null, ROUTES.DASHBOARD);
    setDialogOpened(false);
  };

  const dialogOpen = () => {
    window.history.pushState(null, null, ROUTES.DECLINED_PR);
    setDialogOpened(true);
  };

  if (declinedPrs < 1) return null;

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({
          id: isHr ? 'dashboard.declined.supervisor' : 'dashboard.declined.hr'
        })}
        linkTo={ROUTES.DECLINED_PR}
        onClick={dialogOpen}
        value={declinedPrs}
        icon={'delete_sweep'}
      />
      <Dialog open={dialogOpened} onClose={dialogClose} fullWidth maxWidth="sm">
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">
            {intl.formatMessage({
              id: isHr ? 'dashboard.declined.supervisor' : 'dashboard.declined.hr'
            })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          {isLoading ? <CircularProgress /> : <PrsDeclinedTable refreshDashboard={() => {setDialogOpened(false); refreshDashboard()}} prs={prs} isHr={isHr} />}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(PrsDeclinedDialog));
