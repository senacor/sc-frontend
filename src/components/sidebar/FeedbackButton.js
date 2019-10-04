import React, { useState, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import FeedbackIcon from '@material-ui/icons/Feedback';
import FeedbackCreateDialog from './FeedbackCreateDialog';

const styles = theme => ({
  feedbackBtn: {
    position: 'absolute',
    bottom: '3px',
    left: '3px'
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
      <Tooltip
        title={intl.formatMessage({
          id: 'sidebar.feedback'
        })}
      >
        <IconButton className={classes.feedbackBtn} onClick={handleClick}>
          <FeedbackIcon />
        </IconButton>
      </Tooltip>
      <FeedbackCreateDialog open={openDialog} handleClose={handleCloseDialog} />
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackButton));
