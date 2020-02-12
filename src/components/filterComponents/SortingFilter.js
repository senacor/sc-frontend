import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  ...theme,
  dropdownFilter: {
    display: 'block',
    marginBottom: 2 * theme.spacing.unit
  },
  input: {
    width: 120
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
  stateValue,
  intl
}) => {
  const selectedTitle = countOfSelected => {
    return intl.formatMessage({
      id: countOfSelected < 2 ? 'filter.selected.item' : 'filter.selected.items'
    });
  };
  return (
    <div className={classes.dropdownFilter}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-positions">
          {intl.formatMessage({ id: sortBy })}
        </InputLabel>
        <Select
          multiple
          value={stateValue}
          onChange={handleChange}
          input={
            <Input id="select-multiple-positions" className={classes.input} />
          }
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.length} {selectedTitle(selected.length)}
            </div>
          )}
        >
          {menuData.map(value => {
            const showText = () => {
              return sortBy === 'employeeInfo.scStatus'
                ? intl.formatMessage({ id: value })
                : value;
            };
            return (
              <MenuItem key={value} value={value}>
                <Checkbox checked={stateValue.indexOf(value) > -1} />
                <ListItemText primary={showText()} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default injectIntl(withStyles(styles)(SortingFilter));
