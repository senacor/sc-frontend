import React, { useContext, useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ErrorContext, InfoContext } from '../App';
import { injectIntl } from 'react-intl';
import { Snackbar, IconButton } from '@material-ui/core';

// Icons
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  snackbar: {
    minWidth: '100%'
  },
  snackbarContent: {
    flexGrow: 1,
    marginLeft: 'auto',
    minWidth: 'calc(100% - 320px)',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      marginLeft: 0
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 2
  },
  contentText: {
    paddingLeft: theme.spacing.unit
  },
  errorColor: {
    color: theme.palette.secondary.darkRed,
    backgroundColor: theme.palette.secondary.red
  },
  infoColor: {
    color: theme.palette.secondary.darkBlue,
    backgroundColor: theme.palette.secondary.brightBlue
  },
  closeIcon: {
    paddingRight: theme.spacing.unit * 2
  }
});

const Message = ({ classes, intl }) => {
  const { value: errors } = useContext(ErrorContext.context);
  const { value: infos } = useContext(InfoContext.context);
  const [content, setContent] = useState(undefined);
  const [open, setOpen] = useState(false);
  let snackbarColor;

  useEffect(
    () => {
      if (errors.hasErrors) {
        setContent({ type: 'error', message: errors.messageId });
        setOpen(true);
      } else if (infos.hasInfos) {
        setContent({ type: 'info', message: infos.messageId });
        setOpen(true);
      } else setContent(undefined);
    },
    [errors, infos]
  );

  useEffect(
    () => {
      if (!open) {
        setContent(undefined);
      }
    },
    [open]
  );

  const handleClose = () => {
    setOpen(false);
    setContent(undefined);
  };

  const setSnackBarColor = color => {
    if (content.type === 'error') {
      color = classes.errorColor;
    } else {
      color = classes.infoColor;
    }
    return color;
  };

  return (
    <Fragment>
      {content && (
        <Snackbar
          className={classes.snackbar}
          ContentProps={{
            className: classes.snackbarContent,
            classes: {
              root: setSnackBarColor(snackbarColor)
            }
          }}
          autoHideDuration={5000}
          onClose={handleClose}
          open={open}
          message={
            <span className={classes.content}>
              {content.type === 'error' ? <ErrorIcon /> : <InfoIcon />}
              <span className={classes.contentText}>
                {intl.formatMessage({ id: `${content.message}` })}
              </span>
            </span>
          }
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              className={classes.closeIcon}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(Message));
