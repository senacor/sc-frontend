import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Tooltip } from '@material-ui/core';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import PriorityIcon from './PriorityIcon';

const styles = theme => ({
  ...theme.styledComponents,
  ruleContainer: {
    margin: theme.spacing.unit
  },
  ruleGridItem: {
    textAlign: 'left'
  },
  span: {
    display: 'inline-block',
    padding: theme.spacing.unit / 3
  },
  endDate: {
    paddingLeft: theme.spacing.unit / 3,
    color: theme.palette.secondary.mediumGrey
  }
});

const Rule = ({
  intl,
  classes,
  rule: {
    chronology,
    priority,
    processType,
    regulationCriterion,
    timeUnit,
    timeUnitNumber,
    expirationDate
  },
  openDialog
}) => {
  const determineProcessTypeLang = value => {
    let string;
    switch (value) {
      case 'PR_GENERATION':
        string = intl.formatMessage({
          id: 'autorules.processType.prGeneration'
        });
        break;
      default:
        string = undefined;
    }
    return string.toUpperCase();
  };

  const determineCriterionLang = value => {
    let string;
    switch (value) {
      case 'DUE_DATE_OF_PR':
        string = intl.formatMessage({ id: 'autorules.criterion.dueDatePR' });
        break;
      case 'ENTRY_DATE': {
        string = intl.formatMessage({ id: 'autorules.criterion.entryDate' });
        break;
      }
      default:
        string = undefined;
    }
    return string.toUpperCase();
  };

  const determineChronologyLang = value => {
    let string;
    switch (value) {
      case 'BEFORE':
        string = intl.formatMessage({ id: 'autorules.chronology.before' });
        break;
      case 'AFTER': {
        string = intl.formatMessage({ id: 'autorules.chronology.after' });
        break;
      }
      default:
        string = undefined;
    }
    return string.toUpperCase();
  };

  const determineTimeUnitLang = value => {
    let string;
    switch (value) {
      case 'MONTHS':
        string = intl.formatMessage({ id: 'autorules.timeUnit.months' });
        break;
      case 'WEEKS': {
        string = intl.formatMessage({ id: 'autorules.timeUnit.weeks' });
        break;
      }
      default:
        string = undefined;
    }
    return string.toUpperCase();
  };

  return (
    <Grid container className={classes.ruleContainer} alignItems="center">
      <Grid item sm={8} md={10} className={classes.ruleGridItem}>
        <Typography variant="body1" component="span" className={classes.span}>
          {intl.formatMessage({
            id: 'autorules.textThe'
          })}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          color="secondary"
          className={classes.span}
        >
          {determineProcessTypeLang(processType)}
        </Typography>
        <Typography variant="body1" component="span" className={classes.span}>
          {intl.formatMessage({
            id: 'autorules.textMain'
          })}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          color="secondary"
          className={classes.span}
        >
          {timeUnitNumber}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          color="secondary"
          className={classes.span}
        >
          {determineTimeUnitLang(timeUnit)}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          color="secondary"
          className={classes.span}
        >
          {determineChronologyLang(chronology)}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          color="secondary"
          className={classes.span}
        >
          {determineCriterionLang(regulationCriterion)}
        </Typography>
        <Typography variant="body1" component="span" className={classes.span}>
          {intl.formatMessage({
            id: 'autorules.textStartDE'
          })}
        </Typography>
        <Typography variant="caption" className={classes.endDate}>
          {expirationDate
            ? intl.formatMessage({ id: 'autorules.endDate' }) +
              ': ' +
              formatLocaleDateTime(expirationDate, FRONTEND_DATE_FORMAT)
            : intl.formatMessage({ id: 'autorules.noEndDate' })}
        </Typography>
      </Grid>
      <Grid item sm={2} md={1}>
        <PriorityIcon priority={priority} />
      </Grid>
      <Grid item sm={2} md={1}>
        <Tooltip
          title={intl.formatMessage({ id: 'autorules.deleteRule' })}
          disableFocusListener
        >
          <IconButton onClick={openDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(Rule));
