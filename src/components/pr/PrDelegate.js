import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Popover from '@material-ui/core/Popover/Popover';
import PropTypes from 'prop-types';
import PlotEmployeeSearchList from '../employeeSearch/PlotEmployeeSearchList';

const styles = theme => ({
  box: {
    display: 'flex',
    padding: '0px',
    flexDirection: 'column',
    width: '200px',
    height: '20px'
  },
  listItem: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '5px',
      paddingRight: '0'
    },
    textAlign: 'left',
    width: '200px'
  },
  popover: {
    height: '300px',
    align: 'stretch'
  },
  list: {
    width: '200px',
    maxHeight: '300px'
  },
  textField: {
    marginLeft: '0px',
    marginRight: theme.spacing.unit,
    '&:hover': {
      border: '1px solid rgba(0,0,0,0.235)',
      borderRadius: '4px'
    }
  },
  input: {
    fontSize: '0.875rem',
    cursor: 'pointer',
    color: '#9d9d9d',
    marginLeft: '5px'
  },
  delegatedInput: {
    fontSize: '0.8125rem',
    cursor: 'pointer',
    marginLeft: '5px'
  },
  delegatedInputSecondary: {
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer',
    marginLeft: '5px'
  },
  focused: {
    border: '2px solid rgba(0,73,83)',
    borderRadius: '4px',
    '&:hover': {
      border: '0px'
    }
  }
});

export const PrDelegate = ({
  classes,
  defaultText,
  isDelegated,
  startValue,
  pr,
  employeeSearch,
  color,
  employeeSearchClear,
  delegateReviewer
}) => {
  const [employeeSearchValue, setEmployeeSearchValue] = useState(startValue);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPr] = useState(pr);
  const [showDefault, setShowDefault] = useState(false);

  employeeSearchClear();

  const excludeList = [
    currentPr.employee.id,
    currentPr.reviewer.id,
    currentPr.supervisor.id
  ];

  const executeSearch = debounce(employeeSearch, 500);

  const onClick = event => {
    setShowDefault(true);
    setAnchorEl(event.currentTarget);
    event.target.select();
    employeeSearchClear();
    executeSearch(' ');
    event.stopPropagation();
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      if (employeeSearchValue === '') {
        resetToSupervisor();
      } else {
        handleClose(event);
      }
    }
  };

  const handleChange = event => {
    setEmployeeSearchValue(event.target.value);
    setAnchorEl(event.currentTarget);
    setShowDefault(event.target.value === '');
    executeSearch(event.target.value === '' ? ' ' : event.target.value);
  };

  const selectedEmployee = employee => event => {
    let employeeName = `${employee.firstName} ${employee.lastName}`;
    setEmployeeSearchValue(employeeName);
    delegateReviewer(currentPr.id, employee.id);
    employeeSearchClear();
    handleClose(event);
  };

  const handleClose = event => {
    setEmployeeSearchValue(startValue);
    setAnchorEl(null);
    setShowDefault(false);
    event.stopPropagation();
  };

  const resetToSupervisor = () => {
    setAnchorEl(null);
    setShowDefault(false);
    delegateReviewer(currentPr.id, currentPr.supervisor.id);
  };

  useEffect(
    () => {
      setEmployeeSearchValue(startValue);
    },
    [startValue]
  );

  const getDelegatedInputStyle = classes => {
    if (color === 'textSecondary') {
      return classes.delegatedInputSecondary;
    } else {
      return classes.delegatedInput;
    }
  };

  return (
    <div className={classes.box}>
      <TextField
        id={'PrDelegate' + currentPr.id}
        value={employeeSearchValue}
        onChange={handleChange}
        onClick={onClick}
        placeholder={defaultText}
        className={classes.textField}
        onKeyDown={onKeyDown}
        InputProps={{
          classes: {
            input: isDelegated
              ? getDelegatedInputStyle(classes)
              : classes.input,
            focused: classes.focused
          },
          disableUnderline: true
        }}
      />
      {
        <Popover
          id="simple-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          className={classes.popover}
          disableAutoFocus={true}
        >
          <List dense id="employeeSearchResultList" className={classes.list}>
            {showDefault ? (
              <ListItem
                button
                className={classes.listItem}
                onClick={resetToSupervisor}
              >
                <ListItemText primary={defaultText} />
              </ListItem>
            ) : null}
            <PlotEmployeeSearchList
              excludeList={excludeList}
              selectEmployee={selectedEmployee}
              searchValue={employeeSearchValue}
            />
          </List>
        </Popover>
      }
    </div>
  );
};

PrDelegate.propTypes = {
  startValue: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  pr: PropTypes.object.isRequired
};

export const StyledComponent = withStyles(styles)(PrDelegate);
export default connect(
  null,
  {
    employeeSearch: actions.employeeSearch,
    employeeSearchClear: actions.employeeSearchClear,
    delegateReviewer: actions.delegateReviewer
  }
)(StyledComponent);
