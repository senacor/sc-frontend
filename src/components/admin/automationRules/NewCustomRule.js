import React from 'react';
import { injectIntl } from 'react-intl';
import {
  withStyles,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import {
  rulesDropdownProcess,
  rulesDropdownTimeUnit,
  rulesDropdownChronology,
  rulesDropdownRegulationCriteria,
  rulesDropdownPriority
} from '../../../helper/rulesData';
import { FRONTEND_LOCALE_DATE_TIME_FORMAT } from '../../../helper/date';
import moment from 'moment';

const styles = theme => ({
  newRuleContainer: {},
  text: {
    display: 'inline-block',
    position: 'relative',
    top: 30
  },
  formControl: {
    margin: theme.spacing.unit
  },
  dropDown: {
    minWidth: 150
  },
  timeUnitNumber: {
    width: 50
  },
  priority: {
    width: 70
  },
  prioWithDate: {}
});

const NewCustomRule = ({
  classes,
  intl,
  values,
  handleChangeNumber,
  handleChange,
  newRuleSubmit,
  handleChangeEndDate,
  endDateChecked
}) => {
  const inputsEmpty = obj => {
    const newObj = { ...obj };
    delete newObj.expirationDate;
    for (let key in newObj) {
      if (!newObj[key]) {
        return true;
      }
    }
    return false;
  };

  const dateIsBeforeTodayOrEqual = date => {
    const formattedDate = Date.parse(date, FRONTEND_LOCALE_DATE_TIME_FORMAT);
    const today = Date.parse(moment().format(FRONTEND_LOCALE_DATE_TIME_FORMAT));

    if (formattedDate <= today) {
      return true;
    } else if (formattedDate > today) {
      return false;
    }
  };

  const timeIsPositive = value => {
    if (value > 0) {
      return true;
    } else return false;
  };

  return (
    <Grid
      container
      className={classes.newRuleContainer}
      alignItems="center"
      justify="center"
    >
      <Grid item sm={8}>
        <Typography variant="body1" className={classes.text}>
          {intl.formatMessage({ id: 'autorules.textThe' })}
        </Typography>
        {/* Process type */}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="process-type">
            {intl.formatMessage({ id: 'autorules.process' })}
          </InputLabel>
          <Select
            className={classes.dropDown}
            value={values.processType}
            onChange={handleChange}
            inputProps={{
              name: 'processType',
              id: 'process-type'
            }}
          >
            {rulesDropdownProcess.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body1" className={classes.text}>
          {intl.formatMessage({ id: 'autorules.textMain' })}
        </Typography>
        {/* Time unit number */}
        <FormControl className={classes.formControl}>
          <TextField
            className={classes.timeUnitNumber}
            type="number"
            label={intl.formatMessage({ id: 'autorules.time' })}
            name="timeUnitNumber"
            value={values.timeUnitNumber}
            onChange={e => handleChangeNumber(e)}
            inputProps={{
              name: 'timeUnitNumber',
              id: 'time-unit-number'
            }}
          />
        </FormControl>
        {/* Time unit */}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="time-unit">
            {intl.formatMessage({ id: 'autorules.timeUnit' })}
          </InputLabel>
          <Select
            className={classes.dropDown}
            value={values.timeUnit}
            onChange={handleChange}
            inputProps={{
              name: 'timeUnit',
              id: 'time-unit'
            }}
          >
            {rulesDropdownTimeUnit.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* CHRONOLOGY INDICATOR */}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="chronology-indicator">
            {intl.formatMessage({ id: 'autorules.chronology' })}
          </InputLabel>
          <Select
            className={classes.dropDown}
            value={values.chronology}
            onChange={handleChange}
            inputProps={{
              name: 'chronology',
              id: 'chronology-indicator'
            }}
          >
            {rulesDropdownChronology.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* REGULATION CRITERION */}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="regulation-criterion">
            {intl.formatMessage({ id: 'autorules.criterion' })}
          </InputLabel>
          <Select
            className={classes.dropDown}
            value={values.regulationCriterion}
            onChange={handleChange}
            inputProps={{
              name: 'regulationCriterion',
              id: 'regulation-criterion'
            }}
          >
            {rulesDropdownRegulationCriteria.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body1" className={classes.text}>
          {intl.formatMessage({ id: 'autorules.textStartDE' })}
        </Typography>
      </Grid>
      <Grid item sm={2}>
        <div className={classes.prioWithDate}>
          <TextField
            type="date"
            label={intl.formatMessage({ id: 'autorules.endDate' })}
            inputProps={{ name: 'expirationDate' }}
            value={values.expirationDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            disabled={endDateChecked}
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={endDateChecked}
                onChange={handleChangeEndDate}
              />
            }
            label={intl.formatMessage({ id: 'autorules.noEndDate' })}
          />
        </div>
      </Grid>
      {/* PRIORITY */}
      <Grid item sm={2}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="priority-rule">
            {intl.formatMessage({ id: 'autorules.priority' })}
          </InputLabel>
          <Select
            className={classes.priority}
            value={values.priority}
            onChange={e => handleChange(e)}
            inputProps={{
              name: 'priority',
              id: 'priority-rule'
            }}
          >
            {rulesDropdownPriority.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={12}>
        <Button
          disabled={
            inputsEmpty(values) ||
            !timeIsPositive(values.timeUnitNumber) ||
            dateIsBeforeTodayOrEqual(values.expirationDate)
          }
          onClick={newRuleSubmit}
          variant="contained"
          color="secondary"
        >
          {intl.formatMessage({ id: 'autorules.save' })}
        </Button>
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(NewCustomRule));
