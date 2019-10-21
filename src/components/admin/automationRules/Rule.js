import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography, IconButton } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import { modifyStringToUpperCase } from '../../../helper/string';

const styles = theme => ({
  ...theme.styledComponents,
  ruleContainer: {
    margin: 3 * theme.spacing.unit
  },
  span: {
    display: 'inline-block',
    padding: theme.spacing.unit / 3
  },
  delete: {
    color: theme.palette.secondary.darkRed
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
    timeUnitNumber
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
      <Grid item sm={10}>
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
      </Grid>
      <Grid item sm={2}>
        <IconButton onClick={deleteRule} className={classes.delete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(Rule));
