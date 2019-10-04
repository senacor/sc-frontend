import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import FilterList from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
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
import { addMaintenanceTeamMember } from '../../calls/admin';

const styles = theme => ({
  box: {
    display: 'flex',
    padding: 2 * theme.spacing.unit,
    flexDirection: 'column'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  pointer: {
    cursor: 'pointer'
  },
  spacing: {
    margin: 2 * theme.spacing.unit
  }
});

export const EmployeeFilter = ({
  data,
  setSelectedEmployee,
  maintenance,
  errorContext,
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
    if (maintenance) {
      addMaintenanceTeamMember(employee.id, errorContext);
    }
    handleClose(event);
  };

  // TODO: value stays in the popup after closing

  return (
    <div>
      {maintenance ? (
        <Button
          color="primary"
          className={classes.spacing}
          onClick={handleOpen}
        >
          <AddIcon className={classes.leftIcon} />
          {intl.formatMessage({
            id: 'maintenance.add'
          })}
        </Button>
      ) : (
        <IconButton onClick={handleOpen}>
          <FilterList />
        </IconButton>
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={event => event.stopPropagation()}
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
                  (employee.firstName
                    .toLowerCase()
                    .startsWith(value.toLowerCase()) ||
                    employee.lastName
                      .toLowerCase()
                      .startsWith(value.toLowerCase())) && (
                    <ListItem className={classes.pointer}>
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
