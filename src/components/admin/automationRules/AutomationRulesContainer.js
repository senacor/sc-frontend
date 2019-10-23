import React, { useState, useEffect, useContext, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, ListItem, List } from '@material-ui/core';
import Rule from './Rule';
import {
  getAllRules,
  deleteRule,
  addRule,
  updateRulePriority
} from '../../../calls/rules';
import { ErrorContext, InfoContext } from '../../App';
import NewCustomRule from './NewCustomRule';
import { validPriority, validChronology, validProcess } from './validators';
import Sortable from 'react-sortablejs';

// Material UI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AutoRules from '@material-ui/icons/RotateRight';
import ConfirmDialog from '../../utils/ConfirmDialog';

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
  },
  listItem: {
    background: theme.palette.secondary.brightGrey,
    marginBottom: theme.spacing.unit,
    cursor: 'grab'
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const errorContext = useContext(ErrorContext.context);
  const infoContext = useContext(InfoContext.context);
  const maxRulesAmount = 2;

  useEffect(() => {
    getAllRules(setRules, setIsLoading, errorContext);
  }, []);

  useEffect(
    () => {
      if (rules.length >= maxRulesAmount) {
        setNewRuleActive(false);
      }
    },
    [rules]
  );

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDeleteRule = (id, errorContext) => {
    deleteRule(id, errorContext);
    const newRulesData = rules.filter(rule => rule.id !== id);
    setRules(newRulesData);
  };

  const handleNewRuleActive = () => {
    setNewRuleActive(!newRuleActive);
  };

  const handleChange = event => {
    event.persist();
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
      errorContext.setValue({
        hasErrors: false
      });
      addRule(values, rules, setRules, errorContext, infoContext);
    } else if (!validPriority(values, rules)) {
      infoContext.setValue({
        hasInfos: false
      });
      errorContext.setValue({
        hasErrors: true,
        messageId: 'message.invalidPriority'
      });
    } else if (!validChronology(values, rules)) {
      infoContext.setValue({
        hasInfos: false
      });
      errorContext.setValue({
        hasErrors: true,
        messageId: 'message.invalidChronology'
      });
    } else if (!validProcess(values)) {
      infoContext.setValue({
        hasInfos: false
      });
      errorContext.setValue({
        hasErrors: true,
        messageId: 'message.entryDateAndBeforeError'
      });
    }
  };

  const setNewPriority = arr => {
    let arrWithNewPriorities = arr;
    arrWithNewPriorities[0].priority = 'HIGHEST';
    arrWithNewPriorities[1].priority = 'LOWEST';
    return arrWithNewPriorities;
  };

  const createMap = arr => {
    const newMap = new Map();
    arr.map(item => {
      return newMap.set(item.id, item.priority);
    });
    return newMap;
  };

  const handleOrderRules = order => {
    let newRules = [...rules];
    const mapOrder = (array, order, key) => {
      array.sort((a, b) => {
        let A = a[key],
          B = b[key];

        if (order.indexOf(A) > order.indexOf(B)) {
          return 1;
        } else {
          return -1;
        }
      });
      return array;
    };
    const orderedArr = mapOrder(newRules, order, 'id');
    setNewPriority(orderedArr);
    setRules(orderedArr);
    updateRulePriority(
      createMap(orderedArr),
      rules[0].processType,
      errorContext
    );
  };

  return (
    <Fragment>
      <div className={classes.createRuleContainer}>
        <Fragment>
          <Button
            disabled={rules.length === maxRulesAmount || isLoading}
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
          <List>
            <Sortable
              onChange={order => handleOrderRules(order)}
              options={{
                animation: 150,
                sortable: true
              }}
            >
              {rules.map(rule => (
                <Fragment key={rule.id}>
                  <ListItem className={classes.listItem} data-id={rule.id}>
                    <Rule rule={rule} openDialog={handleDialogOpen} />
                  </ListItem>
                  <ConfirmDialog
                    open={dialogOpen}
                    handleClose={handleDialogClose}
                    handleConfirm={() =>
                      handleDeleteRule(rule.id, errorContext)
                    }
                    confirmationText={intl.formatMessage({
                      id: 'autorules.dialogText'
                    })}
                    confirmationHeader={intl.formatMessage({
                      id: 'autorules.dialogTitle'
                    })}
                  />
                </Fragment>
              ))}
            </Sortable>
          </List>
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
