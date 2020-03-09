import React, { Fragment, useState } from 'react';
import { Button, Tooltip, Typography, withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import WarningIcon from '@material-ui/icons/Warning';
import Grid from '@material-ui/core/Grid';
import ROUTES from '../../../helper/routes';
import { withRouter } from 'react-router-dom';
import { archiveAndCreateSc, archiveSc } from '../../../calls/sc';

const styles = theme => ({
  btnArchive: {
    marginRight: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.darkRed
  },
  warningGrid: {
    display: 'flex'
  },
  content: {
    padding: theme.spacing.unit * 3,
    paddingBottom: '1vh',
    textAlign: 'center'
  },
  warningLeft: {
    color: theme.palette.secondary.darkRed,
    textAlign: 'left'
  },
  warningCentered: {
    color: theme.palette.secondary.darkRed,
    paddingTop: '1em',
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit
  },
  actionsBar: {
    display: 'flex',
    justifyContent: 'center'
  },
  warningIcon: {
    padding: '1vh',
    color: theme.palette.secondary.darkRed
  }
});

const ArchiveButtonWithDialog = ({ classes, intl, sc, history }) => {
  if (!sc) {
    return null;
  }
  const [dialogOpen, setDialogOpen] = useState(false);

  const user = useUserinfoContext();
  const error = useErrorContext();
  const info = useInfoContext();

  const archive = () => {
    const afterArchived = () => {
      history.goBack();
      info.msg('sc.archived');
    };
    archiveSc(sc.id, afterArchived, error);
  };

  const archiveWithRecreate = () => {
    const afterArchived = newScId => {
      history.push(ROUTES.DASHBOARD);
      history.push(`/scDetail/` + newScId);
      info.msg('sc.archived.and.created');
    };
    archiveAndCreateSc(sc.id, afterArchived, error);
  };

  const renderButtonsForPD = () => {
    return (
      <Fragment>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => setDialogOpen(false)}
        >
          {intl.formatMessage({ id: 'scsheet.archive.cancel' })}
        </Button>

        <Button
          className={classes.btnArchive}
          variant="contained"
          color="secondary"
          onClick={archive}
        >
          {intl.formatMessage({
            id: 'scsheet.archive'
          })}
        </Button>
      </Fragment>
    );
  };
  const renderButtonsForBU = () => {
    return (
      <Fragment>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => setDialogOpen(false)}
        >
          {intl.formatMessage({ id: 'scsheet.archive.cancel' })}
        </Button>

        <Button
          className={classes.btnArchive}
          variant="contained"
          color="secondary"
          onClick={archive}
        >
          {intl.formatMessage({
            id: 'scsheet.sc.archive'
          })}
        </Button>

        <Button
          className={classes.btnArchive}
          variant="contained"
          color="secondary"
          onClick={archiveWithRecreate}
        >
          {intl.formatMessage({
            id: 'scsheet.sc.archive.create'
          })}
        </Button>
      </Fragment>
    );
  };

  const renderDescriptionPD = () => (
    <Typography variant="body1" className={classes.content}>
      {intl.formatMessage({ id: 'scsheet.archive.dialog.pd.addition' })}
    </Typography>
  );

  const renderDescriptionBU = () => (
    <Fragment>
      <Typography variant="body1" className={classes.content}>
        {intl.formatMessage({ id: 'scsheet.archive.dialog.bu.addition' })}
      </Typography>
    </Fragment>
  );

  return (
    <div>
      <Tooltip
        title={intl.formatMessage({
          id: 'scsheet.archive.tooltip'
        })}
      >
        <Button
          className={classes.btnArchive}
          variant="contained"
          color="secondary"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          {intl.formatMessage({ id: 'scsheet.archive' })}
        </Button>
      </Tooltip>
      <Dialog open={dialogOpen} onBackdropClick={() => setDialogOpen(false)}>
        <DialogTitle>
          {intl.formatMessage({ id: 'scsheet.archive.dialog.header' })}
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.content}>
          <Grid sm={12} className={classes.warningGrid}>
            <Grid sm={2}>
              <WarningIcon className={classes.warningIcon} fontSize={'large'} />
            </Grid>
            <Grid sm={10}>
              <Typography variant="body1" className={classes.warningLeft}>
                {intl.formatMessage({ id: 'scsheet.archive.dialog.warning1' })}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body1" className={classes.warningCentered}>
            {intl.formatMessage({ id: 'scsheet.archive.dialog.warning2' })}
          </Typography>
          {user.isReviewerInSc(sc)
            ? renderDescriptionBU()
            : renderDescriptionPD()}
        </DialogContent>
        <DialogActions className={classes.actionsBar}>
          {user.isReviewerInSc(sc)
            ? renderButtonsForBU()
            : renderButtonsForPD()}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(
  injectIntl(withStyles(styles)(ArchiveButtonWithDialog))
);
