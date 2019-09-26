import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography/index';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { ErrorContext, InfoContext } from '../App';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  error: {
    color: theme.palette.secondary.darkRed,
    backgroundColor: theme.palette.secondary.red,
    flexDirection: 'row',
    margin: 3 * theme.spacing.unit
  },
  info: {
    color: theme.palette.secondary.darkBlue,
    backgroundColor: theme.palette.secondary.brightBlue,
    flexDirection: 'row',
    margin: 3 * theme.spacing.unit
  },
  icon: {
    padding: theme.spacing.unit
  },
  message: {
    display: 'inline-block',
    marginTop: 10
  }
});

const Message = ({ classes, intl }) => {
  const { value: errors } = useContext(ErrorContext.context);
  const { value: infos } = useContext(InfoContext.context);
  if (errors.hasErrors) {
    return (
      <Paper
        style={{ display: errors.hasErrors ? 'flex' : 'none' }}
        className={classes.error}
      >
        <ErrorIcon className={classes.icon} />
        <Typography component="span" className={classes.message}>
          {intl.formatMessage({
            id: `${errors.messageId}`
          })}
        </Typography>
      </Paper>
    );
  }

  return infos.hasInfos ? (
    <Paper
      style={{ display: infos.hasInfos ? 'flex' : 'none' }}
      className={classes.info}
    >
      <InfoIcon className={classes.icon} />
      <Typography component="span" className={classes.message}>
        {intl.formatMessage(
          {
            id: `${infos.messageId}`
          },
          { ...infos.messageVars }
        )}
      </Typography>
    </Paper>
  ) : null;
};

export default injectIntl(withStyles(styles)(Message));
