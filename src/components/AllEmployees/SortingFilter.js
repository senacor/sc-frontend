import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  ...theme,
  expansionFilter: {
    display: 'block'
  },
  input: {
    width: 120,
    margin: 2 * theme.spacing.unit
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

const SortingFilter = ({
  classes,
  sortBy,
  handleChange,
  menuData,
  stateValue
}) => {
  return (
    <div className={classes.expansionFilter}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-positions">{sortBy}</InputLabel>
        <Select
          multiple
          value={stateValue}
          onChange={handleChange}
          input={
            <Input id="select-multiple-positions" className={classes.input} />
          }
          renderValue={selected => (
            <div className={classes.chips}>{`${selected.length} items`}</div>
          )}
        >
          {menuData.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default injectIntl(withStyles(styles)(SortingFilter));
