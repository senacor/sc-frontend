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
  FormControlLabel,
  Tooltip
} from '@material-ui/core';
import {
  rulesDropdownProcess,
  rulesDropdownTimeUnit,
  rulesDropdownChronology,
  rulesDropdownRegulationCriteria,
  rulesDropdownPriority
} from '../../../helper/rulesData';
import {
  timeIsPositive,
  dateIsBeforeTodayOrEqual,
  inputsEmpty,
  validProcess
} from './validators';

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
  }
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
  const tooltipText = dateIsBeforeTodayOrEqual(values.expirationDate)
    ? intl.formatMessage({ id: 'autorules.dateIsValid' })
    : !validProcess(values)
    ? intl.formatMessage({ id: 'autorules.processValid' })
    : !timeIsPositive(values.timeUnitNumber)
    ? intl.formatMessage({ id: 'autorules.timePositive' })
    : inputsEmpty(values)
    ? intl.formatMessage({ id: 'autorules.fieldsEmpty' })
    : '';

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
        <Tooltip title={tooltipText}>
          <span>
            <Button
              disabled={
                inputsEmpty(values) ||
                !timeIsPositive(values.timeUnitNumber) ||
                dateIsBeforeTodayOrEqual(values.expirationDate) ||
                !validProcess(values)
              }
              onClick={newRuleSubmit}
              variant="contained"
              color="secondary"
            >
              {intl.formatMessage({ id: 'autorules.save' })}
            </Button>
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(NewCustomRule));