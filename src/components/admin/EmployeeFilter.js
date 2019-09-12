import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import FilterList from '@material-ui/icons/FilterList';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  withStyles
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  box: {
    display: 'flex',
    padding: 2 * theme.spacing.unit,
    flexDirection: 'column'
  }
});

export const EmployeeFilter = ({
  data,
  setSelectedEmployee,
  intl,
  classes
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState('');

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = event => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleDelete = () => {
    setValue('');
    setSelectedEmployee(null);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const selectEmployee = (employee, event) => {
    setSelectedEmployee(employee);
    handleClose(event);
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <FilterList />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <div className={classes.box}>
          <TextField
            id="outlined-adornment-filter"
            variant="outlined"
            label={intl.formatMessage({
              id: 'employeefilter.name'
            })}
            value={value}
            onChange={handleChange}
            onClick={event => {
              event.stopPropagation();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleDelete}>
                    <Icon id="adornmentIcon">clear</Icon>
                  </IconButton>
                </InputAdornment>
              ),
              name: 'employeeSearchValue'
            }}
          />
          {value && (
            <List>
              {data.map(employee => {
                return (
                  (employee.firstName.toLowerCase().startsWith(value) ||
                    employee.lastName.toLowerCase().startsWith(value)) && (
                    <ListItem>
                      <Avatar>
                        {employee.firstName.charAt(0)}
                        {employee.lastName.charAt(0)}
                      </Avatar>
                      <ListItemText
                        primary={`${employee.firstName} ${employee.lastName}`}
                        onClick={event => selectEmployee(employee, event)}
                      />
                    </ListItem>
                  )
                );
              })}
            </List>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default injectIntl(withStyles(styles)(EmployeeFilter));
