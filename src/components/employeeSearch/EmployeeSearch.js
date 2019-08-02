import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import PlotEmployeeSearchList from './PlotEmployeeSearchList';

const styles = {
  box: {
    display: 'flex',
    padding: '20px',
    flexDirection: 'column',
    width: '200px'
  },
  employeeList: {
    width: '100%',
    maxHeight: '300px'
  }
};

export const EmployeeSearch = ({
  employeeSearchClear,
  employeeSearchValue,
  selectEmployee,
  employeeSearch,
  extClasses,
  classes,
  excludeList,
  inputElement
}) => {
  useEffect(() => {
    employeeSearchClear();
  }, []);

  const [employeeSearchVal, setEmployeeSearchVal] = useState(
    employeeSearchValue ? employeeSearchValue : ''
  );

  const handleChange = event => {
    setEmployeeSearchVal(event.target.value);
    if (event.target.value) {
      executeSearch(event.target.value);
    }
  };

  const selectedEmployee = employee => () => {
    const employeeName = `${employee.firstName} ${employee.lastName}`;
    setEmployeeSearchVal(employeeName);
    selectEmployee(employee);
    employeeSearchClear();
  };

  const executeSearch = debounce(employeeSearch, 500);

  return (
    <div className={extClasses.root ? extClasses.root : classes.box}>
      {inputElement(employeeSearchVal, handleChange)}
      {employeeSearchVal !== '' ? (
        <List
          dense
          id="employeeSearchResultList"
          component="nav"
          className={classes.employeeList}
        >
          <PlotEmployeeSearchList
            excludeList={excludeList}
            selectEmployee={selectedEmployee}
          />
        </List>
      ) : null}
    </div>
  );
};

EmployeeSearch.defaultProps = {
  inputElement: (value, onChange) => (
    <TextField
      label="Name, Email, ..."
      value={value}
      InputProps={{
        name: 'employeeSearchValue'
      }}
      onChange={onChange}
    />
  ),
  extClasses: {},
  excludeList: []
};

export const StyledComponent = withStyles(styles)(EmployeeSearch);
export default connect(
  state => ({}),
  {
    employeeSearch: actions.employeeSearch,
    employeeSearchClear: actions.employeeSearchClear
  }
)(StyledComponent);
