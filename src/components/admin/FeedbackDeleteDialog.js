import React, { Fragment, useContext } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  withStyles,
  DialogActions
} from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { ErrorContext } from '../App';
import { deleteFeedbacks } from '../../calls/feedbacks';

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
