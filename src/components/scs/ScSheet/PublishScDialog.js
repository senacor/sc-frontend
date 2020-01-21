import React from 'react';
import {injectIntl} from 'react-intl';
import {Tooltip, withStyles} from '@material-ui/core';
// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  }
});

const PublishScDialog = ({
                           intl,
                           classes,
                           open,
                           handlePublish,
                           handleClose,
                           withEvaluationsButtonDisabled,
                           onBackdropClick
                         }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onBackdropClick={onBackdropClick}
    >
      <DialogTitle>
        {intl.formatMessage({id: 'scsheet.publishScDialog.header'})}
      </DialogTitle>
      <Divider/>
      <DialogContent className={classes.content}>
        {intl.formatMessage({id: 'scsheet.publishScDialog.content'})}
      </DialogContent>
      <DialogActions>
        <Tooltip
          disableHoverListener={!withEvaluationsButtonDisabled}
          title={intl.formatMessage({id: 'scsheet.publishScDialog.publishEvaluationsFirst'})}
        >
          <span data-tip-disable={false}>
            {/*button is inside of span to enable tooltip when button is disabled.*/}
            <Button
              disabled={withEvaluationsButtonDisabled}
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => {
                handlePublish(true);
                handleClose()
              }}
            >
              {intl.formatMessage({id: 'scsheet.publishScDialog.withEvaluation'})}
            </Button>
          </span>

        </Tooltip>

        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            handlePublish(false);
            handleClose()
          }}
        >
          {intl.formatMessage({id: 'scsheet.publishScDialog.withoutEvaluation'})}
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          {intl.formatMessage({id: 'scsheet.publishScDialog.cancel'})}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default injectIntl(withStyles(styles)(PublishScDialog));
