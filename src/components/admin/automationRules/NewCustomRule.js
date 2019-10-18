import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  withStyles,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import {
  rulesDropdownProcess,
  rulesDropdownTimeUnit,
  rulesDropdownChronology,
  rulesDropdownRegulationCriteria
} from '../../../helper/rulesData';

const styles = () => ({
  newRuleContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  }
});

const NewCustomRule = ({ classes, intl }) => {
  const [values, setValues] = useState({
    processType: 'PR',
    regulationCriterion: 'DUE_DATE_OF_PR',
    timeUnit: 'MONTHS',
    chronology: 'BEFORE',
    priority: 'LOWER',
    timeUnitNumber: 4
  });

  console.log('values', values);

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

  return (
    <div className={classes.newRuleContainer}>
      <FormControl>
        <InputLabel htmlFor="process-type">Process</InputLabel>
        <Select
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
      {/* Time unit number */}
      <TextField
        type="number"
        name="timeUnitNumber"
        label="Time unit number"
        onChange={e => handleChangeNumber(e)}
      />
      <FormControl>
        <InputLabel htmlFor="time-unit">Time unit</InputLabel>
        <Select
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
      <FormControl>
        <InputLabel htmlFor="chronology-indicator">Chronology</InputLabel>
        <Select
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
      <FormControl>
        <InputLabel htmlFor="regulation-criterion">
          Regulation Criterion
        </InputLabel>
        <Select
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
      <Button>Save</Button>
    </div>
  );
};

export default injectIntl(withStyles(styles)(NewCustomRule));
