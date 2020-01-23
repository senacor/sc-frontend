import React, { Fragment, useState } from 'react';
import { injectIntl } from 'react-intl';
import FilterList from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/People';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Tooltip,
  withStyles
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { addMaintenanceTeamMember } from '../../calls/admin';
import { useErrorContext } from '../../helper/contextHooks';

const styles = theme => ({
  box: {
    display: 'flex',
    padding: 2 * theme.spacing.unit,
    flexDirection: 'column'
  },
  btnDelete: {
    margin: 2 * theme.spacing.unit,
    backgroundColor: theme.palette.secondary.darkRed,
    color: theme.palette.secondary.white
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  pointer: {
    cursor: 'pointer'
  },
  spacing: {
    margin: 2 * theme.spacing.unit
  },
  textInfoUnderlined: {
    color: theme.palette.secondary.darkBlue,
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.secondary.darkRed
    }
  }
});

export const EmployeeFilter = ({
  data,
  setSelectedEmployee,
  maintenance,
  setMaintenanceData,
  maintenanceData,
  delegation,
  isDisabled,
  settingReviewers,
  supervisorName,
  index,
  intl,
  classes
}) => {
  const error = useErrorContext();
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
    if (!maintenance && !delegation && !settingReviewers) {
      setSelectedEmployee(null);
    }
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const selectEmployee = (employee, event) => {
    if (maintenance) {
      addMaintenanceTeamMember(
        employee.id,
        maintenanceData,
        setMaintenanceData,
        error
      );
    } else if (settingReviewers) {
      setSelectedEmployee(employee, index);
    } else {
      setSelectedEmployee(employee);
    }
    handleClose(event);
  };

  // TODO: value stays in the popup after closing

  return (
    <Fragment>
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
      ) : delegation ? (
        <Button
          variant="contained"
          color="secondary"
          className={classes.spacing}
          onClick={handleOpen}
          disabled={isDisabled}
        >
          <Fragment>
            {delegation.includes('edit') ? (
              <EditIcon className={classes.leftIcon} />
            ) : (
              <PersonAddIcon className={classes.leftIcon} />
            )}
            {intl.formatMessage({
              id: delegation
            })}
          </Fragment>
        </Button>
      ) : settingReviewers ? (
        <Button
          color="primary"
          className={classes.spacing}
          onClick={handleOpen}
        >
          <EditIcon className={classes.leftIcon} />
        </Button>
      ) : supervisorName ? (
        <Tooltip
          title={intl.formatMessage({
            id: 'employeeInfo.clicktochange'
          })}
        >
          <span className={classes.textInfoUnderlined} onClick={handleOpen}>
            {supervisorName}
          </span>
        </Tooltip>
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
                    <ListItem className={classes.pointer} key={employee.id}>
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
          {delegation && delegation.includes('edit') && (
            <Button
              variant="contained"
              className={classes.btnDelete}
              onClick={() => setSelectedEmployee(null)}
            >
              <DeleteIcon />
              {intl.formatMessage({
                id: 'sc.reviewerbutton.remove'
              })}
            </Button>
          )}
        </div>
      </Popover>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeFilter));
