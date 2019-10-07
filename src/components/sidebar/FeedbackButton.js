import React, { useState, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FeedbackIcon from '@material-ui/icons/Feedback';
import FeedbackCreateDialog from './FeedbackCreateDialog';

const styles = theme => ({
  feedbackIcon: {
    marginRight: theme.spacing.unit
  }
});

const FeedbackButton = ({ classes, intl }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <Button className={classes.feedbackBtn} onClick={handleClick}>
        <FeedbackIcon className={classes.feedbackIcon} />
        {intl.formatMessage({
          id: 'sidebar.feedback'
        })}
      </Button>
      <FeedbackCreateDialog open={openDialog} handleClose={handleCloseDialog} />
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackButton));
