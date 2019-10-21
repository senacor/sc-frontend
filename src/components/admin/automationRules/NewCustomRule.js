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
  Grid
} from '@material-ui/core';
import {
  rulesDropdownProcess,
  rulesDropdownTimeUnit,
  rulesDropdownChronology,
  rulesDropdownRegulationCriteria,
  rulesDropdownPriority
} from '../../../helper/rulesData';

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
  newRuleSubmit
}) => {
  return (
    <Grid
      container
      className={classes.newRuleContainer}
      alignItems="center"
      justify="center"
    >
      <Grid item sm={7}>
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
            label="Time"
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
      {/* PRIORITY */}
      <Grid item sm={3}>
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
      <Grid item sm={2}>
        <Button onClick={newRuleSubmit} variant="contained" color="secondary">
          {intl.formatMessage({ id: 'autorules.save' })}
        </Button>
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(NewCustomRule));
