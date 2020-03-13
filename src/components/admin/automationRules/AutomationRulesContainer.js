import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { useErrorContext } from '../../../helper/contextHooks';
// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// Icons
import AutoRules from '@material-ui/icons/RotateRight';
import IgnoreListRule from './IgnoreListRule';
import { getAllEmployees } from '../../../calls/employees';
import ScPeriodsTable from './ScPeriodsTable';

const styles = theme => ({
  ...theme.styledComponents,
  rulesPaper: {
    margin: 3 * theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  title: {
    padding: 2 * theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '2rem'
    },
    '& h5': {
      paddingLeft: theme.spacing.unit
    }
  },
  divider: {
    marginBottom: 2 * theme.spacing.unit
  }
});

const AutomationRulesContainer = ({ classes, intl }) => {
  const [employees, setEmployees] = useState([]);
  const error = useErrorContext();

  useEffect(() => {
    getAllEmployees(setEmployees, () => {}, error);
  }, []);

  return (
    <Fragment>
      <Paper className={classes.rulesPaper}>
        <div className={classes.title}>
          <AutoRules color="primary" />
          <Typography variant="h5">
            {intl.formatMessage({ id: 'sidebar.autorules' })}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <Fragment>
          <ScPeriodsTable />
          <IgnoreListRule
            ruleId={'autorules.process.end'}
            ruleDescriptionId={'autorules.process.end.dates.title'}
            employees={employees}
          />
        </Fragment>
      </Paper>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AutomationRulesContainer));
