import React, { useState, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import FeedbackIcon from '@material-ui/icons/Feedback';
import FeedbackCreateDialog from './FeedbackCreateDialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const styles = theme => ({
  noTextDecoration: {
    textDecoration: 'none',
    cursor: 'pointer'
  },
  textColor: {
    color: theme.palette.primary['900']
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
      <List component="nav">
        <ListItem className={classes.noTextDecoration} onClick={handleClick}>
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <div className={classes.textColor}>
                {intl.formatMessage({
                  id: 'sidebar.feedback'
                })}
              </div>
            }
          />
        </ListItem>
      </List>
      <FeedbackCreateDialog open={openDialog} handleClose={handleCloseDialog} />
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackButton));
