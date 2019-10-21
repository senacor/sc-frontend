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
import { getAllRules, deleteRule, addRule } from '../../../calls/rules';
import { ErrorContext } from '../../App';
import NewCustomRule from './NewCustomRule';

// Icons
import AutoRules from '@material-ui/icons/RotateRight';

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
  createRuleContainer: {
    marginTop: 2 * theme.spacing.unit,
    textAlign: 'center'
  },
  noRules: {
    textAlign: 'center',
    color: theme.palette.secondary.mediumGrey
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
    timeUnitNumber: '',
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
      <div className={classes.createRuleContainer}>
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
              <Paper className={classes.paper}>
                <NewCustomRule
                  values={values}
                  handleChange={handleChange}
                  handleChangeNumber={handleChangeNumber}
                  newRuleSubmit={newRuleSubmit}
                  handleChangeEndDate={handleChangeEndDate}
                  endDateChecked={endDateChecked}
                />
              </Paper>
            )}
          </Fragment>
        )}
      </div>
      <Paper className={classes.rulesPaper}>
        <div className={classes.title}>
          <AutoRules color="primary" />
          <Typography variant="h5">
            {intl.formatMessage({ id: 'sidebar.autorules' })}
          </Typography>
        </div>
        {rules.length > 0 ? (
          rules.map(rule => (
            <Rule
              key={rule.id}
              rule={rule}
              deleteRule={() => handleDeleteRule(rule.id, errorContext)}
            />
          ))
        ) : (
          <Typography variant="body2" className={classes.noRules}>
            {intl.formatMessage({ id: 'autorules.noRulesDefined' })}
          </Typography>
        )}
      </Paper>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AutomationRulesContainer));
