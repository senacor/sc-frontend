import React, { Fragment, useContext } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  withStyles
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { injectIntl } from 'react-intl';
import { deleteFeedbacks } from '../../calls/admin';
import { ErrorContext } from '../App';

const styles = theme => ({
  buttonsGrid: {
    textAlign: 'center',
    marginTop: theme.spacing.unit
  },
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
        <Divider />
        <DialogContent>
          <Grid
            variant="contained"
            color="primary"
            className={classes.buttonsGrid}
            container
          >
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackDeleteDialog));
