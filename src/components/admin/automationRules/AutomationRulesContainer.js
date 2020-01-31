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
import { getAllRules } from '../../../calls/rules';
import AutomationRule from './AutomationRule';
import CircularProgress from '@material-ui/core/CircularProgress';
import IgnoreListRule from './IgnoreListRule';
import { getAllEmployees } from '../../../calls/employees';

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
  const defaultRules = {
    scGeneration: [],
    scProcessEnd: [],
    payrollReport: [],
    scIgnoreList: [2000]
  };
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [rules, setRules] = useState(defaultRules);
  const error = useErrorContext();

  useEffect(() => {
    const afterLoad = rules => {
      setRules({ ...rules });
    };
    getAllRules(afterLoad, setIsLoading, error);
    getAllEmployees(setEmployees, setIsLoading, error);
  }, []);

  return (
    <Fragment>
      <Paper className={classes.rulesPaper}>
        <div className={classes.title}>
          <AutoRules color="primary"/>
          <Typography variant="h5">
            {intl.formatMessage({ id: 'sidebar.autorules' })}
          </Typography>
        </div>
        <Divider className={classes.divider}/>
        {isLoading ? (
          <CircularProgress/>
        ) : (
          <Fragment>
            <AutomationRule
              ruleDatesProp={rules.scGeneration}
              ruleId={'autorules.sc.generation'}
              ruleDescriptionId={'autorules.sc.generation.dates.title'}
              ruleType={'SC_GENERATION'}
            />
            <IgnoreListRule
              ignorelistProp={rules.scIgnoreList}
              ruleId={'autorules.process.end'}
              ruleDescriptionId={'autorules.process.end.dates.title'}
              employees={employees}
              ruleType={'SC_IGNORE_LIST'}
            />
            <AutomationRule
              ruleDatesProp={rules.scProcessEnd}
              ruleId={'autorules.process.end'}
              ruleDescriptionId={'autorules.process.end.dates.title'}
              ruleType={'SC_PROCESS_END'}
            />
            <AutomationRule
              ruleDatesProp={rules.payrollReport}
              ruleId={'autorules.payroll.report'}
              ruleDescriptionId={'autorules.payroll.report.dates.title'}
              ruleType={'PAYROLL_REPORT'}
            />
          </Fragment>
        )}
      </Paper>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AutomationRulesContainer));
