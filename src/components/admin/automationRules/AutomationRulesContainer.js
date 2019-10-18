import React, { useState, useEffect, useContext, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import {
  withStyles,
  Button,
  Paper,
  Typography,
  CircularProgress
} from '@material-ui/core';
import Rule from './Rule';

// Icons
import AutoRules from '@material-ui/icons/RotateRight';
import { getAllRules, deleteRule } from '../../../calls/rules';
import { ErrorContext } from '../../App';
import NewCustomRule from './NewCustomRule';

const styles = theme => ({
  ...theme.styledComponents,
  paper: {
    margin: 3 * theme.spacing.unit
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
  ruleContainer: {
    textAlign: 'center'
  }
});

const AutomationRulesContainer = ({ classes, intl }) => {
  const [rules, setRules] = useState([]);
  const [newRuleActive, setNewRuleActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getAllRules(setRules, setIsLoading, errorContext);
  }, []);

  const handleDeleteRule = (id, errorContext) => {
    deleteRule(id, errorContext);
    const newRulesData = rules.filter(rule => rule.id !== id);
    setRules(newRulesData);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.title}>
        <AutoRules color="primary" />
        <Typography variant="h5">
          {intl.formatMessage({ id: 'sidebar.autorules' })}
        </Typography>
      </div>
      <div className={classes.ruleContainer}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Fragment>
            <Button disabled={rules.length > 1}>
              {intl.formatMessage({
                id: 'autorules.createRule'
              })}
            </Button>
            <NewCustomRule />
            {rules.length > 0 &&
              rules.map(rule => (
                <Rule
                  key={rule.id}
                  rule={rule}
                  deleteRule={() => handleDeleteRule(rule.id, errorContext)}
                />
              ))}
          </Fragment>
        )}
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(AutomationRulesContainer));
