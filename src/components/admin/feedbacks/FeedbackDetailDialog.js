import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  content: {
    padding: 3 * theme.spacing.unit,
    textAlign: 'justify'
  },
  margin: {
    margin: theme.spacing.unit
  },
  paddingBottom: {
    paddingBottom: 2 * theme.spacing.unit
  },
  grey: {
    color: theme.palette.secondary.grey
  }
});

const FeedbackDetailDialog = ({
  dialogDetailsOpen,
  handleDialogDetailsClose,
  intl,
  classes,
  message,
  subject,
  senderFirstName,
  senderLastName,
  context
}) => {
  return (
    <Dialog
      open={dialogDetailsOpen !== undefined ? dialogDetailsOpen : false}
      onClose={handleDialogDetailsClose}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle disableTypography>
        <Typography
          variant="h5"
          className={classes.paddingBottom}
        >{`${senderFirstName} ${senderLastName}`}</Typography>
        <Typography variant="subtitle2" className={classes.grey}>
          {`${intl.formatMessage({
            id: 'feedbackcreatedialog.subject'
          })}: ${subject}`}
        </Typography>
        <Typography variant="subtitle2" className={classes.grey}>
          {`${intl.formatMessage({
            id: 'feedbackcreatedialog.type'
          })}: ${context}`}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>{message}</DialogContent>
      <DialogActions>
        <Button
          className={classes.margin}
          onClick={handleDialogDetailsClose}
          variant="contained"
          color="primary"
        >
          {intl.formatMessage({
            id: 'feedbackcreatedialog.close'
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default injectIntl(withStyles(styles)(FeedbackDetailDialog));
