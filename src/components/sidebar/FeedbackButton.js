import React, { Fragment, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import FeedbackIcon from '@material-ui/icons/Feedback';
import FeedbackCreateDialog from './FeedbackCreateDialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  noTextDecoration: {
    textDecoration: 'none'
  },
  textColor: {
    color: theme.palette.primary['900'],
    cursor: 'pointer'
  },
  loginTextColor: {
    color: theme.palette.primary['900'],
    display: 'flex',
    justifyContent: 'center',
    marginTop: 3 * theme.spacing.unit,
    cursor: 'pointer'
  }
});

const FeedbackButton = ({ classes, intl, login }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <ListItem className={classes.noTextDecoration}>
        {!login ? (
          <Fragment>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <div className={classes.textColor} onClick={handleClick}>
                  {intl.formatMessage({
                    id: 'sidebar.feedback'
                  })}
                </div>
              }
            />
          </Fragment>
        ) : (
          <ListItemText
            className={classes.loginTextColor}
            onClick={handleClick}
            disableTypography
            primary={
              <div>
                {intl.formatMessage({
                  id: 'login.feedback'
                })}
              </div>
            }
          />
        )}
      </ListItem>
      {openDialog && (
        <FeedbackCreateDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          login={login}
        />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackButton));
