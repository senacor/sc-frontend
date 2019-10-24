import React, { useState, useEffect, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Rule from './Rule';
import { getAllRules, deleteRule, addRule } from '../../../calls/rules';
import NewCustomRule from './NewCustomRule';
import { validPriority, validChronology, validProcess } from './validators';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';

// Material UI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AutoRules from '@material-ui/icons/RotateRight';

const styles = theme => ({
  ...theme.styledComponents,
  paper: {
    margin: 3 * theme.spacing.unit,
    paddingBottom: 5 * theme.spacing.unit,
    paddingTop: 5 * theme.spacing.unit
  },
  rulesPaper: {
    margin: 3 * theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,
    paddingTop: 2 * theme.spacing.unit,
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
  createRuleContainer: {
    marginTop: 2 * theme.spacing.unit,
    textAlign: 'center'
  },
  noRules: {
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

  const error = useErrorContext();
  const info = useInfoContext();

  useEffect(() => {
    getAllRules(setRules, setIsLoading, error);
  }, []);

  useEffect(
    () => {
      if (rules.length > 1) {
        setNewRuleActive(false);
      }
    },
    [rules]
  );

  const handleDeleteRule = (id) => {
    deleteRule(id, error);
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
    if (
      rules.length === 0 ||
      (validChronology(values, rules) &&
        validPriority(values, rules) &&
        validProcess(values))
    ) {
      error.hide();
      addRule(values, rules, setRules, error, info);
    } else if (!validPriority(values, rules)) {
      info.hide();
      error.show('message.invalidPriority');
    } else if (!validChronology(values, rules)) {
      info.hide();
      error.show('message.invalidChronology');
    } else if (!validProcess(values)) {
      info.hide();
      error.show('message.entryDateAndBeforeError');
    }
  };

  return (
    <Fragment>
      <div className={classes.createRuleContainer}>
        <Fragment>
          <Button
            disabled={rules.length > 1 || isLoading}
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
      </div>
      <Paper className={classes.rulesPaper}>
        <div className={classes.title}>
          <AutoRules color="primary" />
          <Typography variant="h5">
            {intl.formatMessage({ id: 'sidebar.autorules' })}
          </Typography>
        </div>
        {isLoading ? (
          <CircularProgress />
        ) : rules.length > 0 ? (
          rules.map(rule => (
            <Rule
              key={rule.id}
              rule={rule}
              deleteRule={() => handleDeleteRule(rule.id)}
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
