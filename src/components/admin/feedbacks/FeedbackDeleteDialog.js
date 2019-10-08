import React, { Fragment, useContext } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { ErrorContext } from '../../App';
import { deleteFeedbacks } from '../../../calls/feedbacks';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
  buttons: {
    color: theme.palette.secondary.white
  }
});

const FeedbackDeleteDialog = ({
  id,
  closeDialog,
  classes,
  intl,
  data,
  setData
}) => {
  const errorContext = useContext(ErrorContext.context);

  const handleYesClick = id => {
    deleteFeedbacks([id], errorContext);
    const newData = data.filter(entry => entry.id !== id);
    setData(newData);
    closeDialog();
  };

  const handleNoClick = () => {
    closeDialog();
  };

  return (
    <Fragment>
      <Dialog open={Boolean(id)} close={closeDialog}>
        <DialogTitle>
          <Typography>
            {intl.formatMessage({
              id: 'feedbackdeletedialog.deletemessage'
            })}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            className={classes.buttons}
            onClick={() => handleYesClick(id)}
            variant="contained"
            color="primary"
          >
            {intl.formatMessage({
              id: 'feedbackdeletedialog.yes'
            })}
          </Button>
          <Button
            className={classes.buttons}
            onClick={handleNoClick}
            variant="contained"
            color="primary"
          >
            {intl.formatMessage({
              id: 'feedbackdeletedialog.no'
            })}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackDeleteDialog));
