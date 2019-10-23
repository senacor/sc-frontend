import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Tooltip } from '@material-ui/core';
import { modifyStringToUpperCase } from '../../../helper/string';
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
    id,
    chronology,
    priority,
    processType,
    regulationCriterion,
    timeUnit,
    timeUnitNumber,
    expirationDate
  },
  deleteRule
}) => {
  const processTypeString = modifyStringToUpperCase(processType);
  const timeUnitString = modifyStringToUpperCase(timeUnit);
  const chronologyString = modifyStringToUpperCase(chronology);
  const regulationCriterionString = modifyStringToUpperCase(
    regulationCriterion
  );

  return (
    <Grid container className={classes.ruleContainer} alignItems="center">
      <Grid item sm={10} md={8} className={classes.ruleGridItem}>
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
          {processTypeString}
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
          {timeUnitString}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          color="secondary"
          className={classes.span}
        >
          {chronologyString}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          color="secondary"
          className={classes.span}
        >
          {regulationCriterionString}
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
      <Grid item sm={1} md={2}>
        <PriorityIcon priority={priority} />
      </Grid>
      <Grid item sm={1} md={2}>
        <Tooltip title={intl.formatMessage({ id: 'autorules.deleteRule' })}>
          <IconButton onClick={deleteRule}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(Rule));
