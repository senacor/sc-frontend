import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography, IconButton } from '@material-ui/core';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  ...theme.styledComponents,
  ruleContainer: {
    marginLeft: 3 * theme.spacing.unit,
    marginRight: 3 * theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  return (
    <div className={classes.ruleContainer}>
      <Typography variant="body1">{`${intl.formatMessage({
        id: 'autorules.textThe'
      })} ${processType} ${intl.formatMessage({
        id: 'autorules.textMain'
      })} ${timeUnitNumber} ${timeUnit} ${chronology} ${regulationCriterion}${intl.formatMessage(
        {
          id: 'autorules.textStartDE'
        }
      )}`}</Typography>
      <IconButton onClick={deleteRule}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default injectIntl(withStyles(styles)(Rule));
