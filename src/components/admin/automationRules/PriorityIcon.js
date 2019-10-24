import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import Typography from '@material-ui/core/Typography';

// Icons
import ArrowUp from '@material-ui/icons/ArrowUpward';

const styles = theme => ({
  priorityContainer: {
    textAlign: 'center'
  },
  colorRed: {
    color: theme.palette.secondary.darkRed
  },
  colorYellow: {
    color: theme.palette.secondary.darkYellow
  },
  colorGreen: {
    color: theme.palette.secondary.main
  },
  caption: {
    color: theme.palette.secondary.mediumGrey
  }
});

const PriorityIcon = ({ classes, intl, priority }) => {
  let className, text;
  const determineStyling = className => {
    switch (priority) {
      case 'HIGHEST':
        className = classes.colorRed;
        text = intl.formatMessage({ id: 'autorules.highestPriority' });
        break;
      case 'HIGH':
        className = classes.colorRed;
        text = intl.formatMessage({ id: 'autorules.highPriority' });
        break;
      case 'MEDIUM':
        className = classes.colorYellow;
        text = intl.formatMessage({ id: 'autorules.mediumPriority' });
        break;
      case 'LOW':
        className = classes.colorGreen;
        text = intl.formatMessage({ id: 'autorules.lowPriority' });
        break;
      case 'LOWEST':
        className = classes.colorGreen;
        text = intl.formatMessage({ id: 'autorules.lowestPriority' });
        break;
      default:
        className = undefined;
    }
    return className;
  };

  const determineText = text => {
    switch (priority) {
      case 'HIGHEST':
        text = intl.formatMessage({ id: 'autorules.highestPriority' });
        break;
      case 'HIGH':
        text = intl.formatMessage({ id: 'autorules.highPriority' });
        break;
      case 'MEDIUM':
        text = intl.formatMessage({ id: 'autorules.mediumPriority' });
        break;
      case 'LOW':
        text = intl.formatMessage({ id: 'autorules.lowPriority' });
        break;
      case 'LOWEST':
        text = intl.formatMessage({ id: 'autorules.lowestPriority' });
        break;
      default:
        text = undefined;
    }
    return text;
  };

  return (
    <div className={classes.priorityContainer}>
      <ArrowUp className={determineStyling(className)} />
      <Typography variant="caption" className={classes.caption}>
        {determineText(text)}
      </Typography>
    </div>
  );
};

export default injectIntl(withStyles(styles)(PriorityIcon));
