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
import { getAllRules, deleteRule, addRule } from '../../../calls/rules';
import { ErrorContext } from '../../App';
import NewCustomRule from './NewCustomRule';

const styles = theme => ({
  ...theme.styledComponents,
  paper: {
    margin: 3 * theme.spacing.unit,
    paddingBottom: 5 * theme.spacing.unit
  },
  rulesPaper: {
    margin: 3 * theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,
    paddingTop: 2 * theme.spacing.unit
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
  const [values, setValues] = useState({
    processType: '',
    regulationCriterion: '',
    timeUnit: '',
    chronology: '',
    priority: '',
    timeUnitNumber: 0,
    expirationDate: ''
  });
  const [endDateChecked, setEndDateChecked] = useState(true);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getAllRules(setRules, setIsLoading, errorContext);
  }, []);

  useEffect(
    () => {
      if (rules.length > 1) {
        setNewRuleActive(false);
      }
    },
    [rules]
  );

  console.log('rules', rules);
  const handleDeleteRule = (id, errorContext) => {
    deleteRule(id, errorContext);
    const newRulesData = rules.filter(rule => rule.id !== id);
    setRules(newRulesData);
  };

  const handleNewRuleActive = () => {
    setNewRuleActive(!newRuleActive);
  };

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleChangeNumber = event => {
    const newValues = { ...values };
    newValues.timeUnitNumber = event.target.value;
    setValues(newValues);
  };

  const handleChangeEndDate = () => {
    if (endDateChecked) {
      setEndDateChecked(false);
    } else {
      const newValues = { ...values };
      newValues.expirationDate = '';
      setValues(newValues);
      setEndDateChecked(true);
    }
  };

  const newRuleSubmit = () => {
    addRule(values, rules, setRules, errorContext);
  };

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <div className={classes.title}>
          <Typography variant="h5">
            {intl.formatMessage({ id: 'sidebar.autorules' })}
          </Typography>
        </div>
        <div className={classes.ruleContainer}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Fragment>
              <Button
                disabled={rules.length > 1}
                onClick={handleNewRuleActive}
                color="primary"
                variant="contained"
              >
                {intl.formatMessage({
                  id: 'autorules.createRule'
                })}
              </Button>
              {newRuleActive && (
                <NewCustomRule
                  values={values}
                  handleChange={handleChange}
                  handleChangeNumber={handleChangeNumber}
                  newRuleSubmit={newRuleSubmit}
                  handleChangeEndDate={handleChangeEndDate}
                  endDateChecked={endDateChecked}
                />
              )}
            </Fragment>
          )}
        </div>
      </Paper>
      {rules.length > 0 && (
        <Paper className={classes.rulesPaper}>
          {rules.map(rule => (
            <Rule
              key={rule.id}
              rule={rule}
              deleteRule={() => handleDeleteRule(rule.id, errorContext)}
            />
          ))}
        </Paper>
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AutomationRulesContainer));
