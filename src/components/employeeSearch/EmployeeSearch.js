import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import PlotEmployeeSearchList from './PlotEmployeeSearchList';
import { injectIntl } from 'react-intl';

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

export const EmployeeSearch = props => {
  useEffect(() => {
    props.employeeSearchClear();
  }, []);

  const [employeeSearchVal, setEmployeeSearchVal] = useState(
    props.employeeSearchValue ? props.employeeSearchValue : ''
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
    props.selectEmployee(employee);
    props.employeeSearchClear();
  };

  const executeSearch = debounce(props.employeeSearch, 500);

  return (
    <div
      className={
        props.extClasses.root ? props.extClasses.root : props.classes.box
      }
    >
      {props.inputElement(employeeSearchVal, handleChange)}
      {employeeSearchVal !== '' ? (
        <List
          dense
          id="employeeSearchResultList"
          component="nav"
          className={props.classes.employeeList}
        >
          <PlotEmployeeSearchList
            excludeList={props.excludeList}
            selectEmployee={selectedEmployee}
          />
        </List>
      ) : null}
    </div>
  );
};

EmployeeSearch.defaultProps = {
  inputElement: (value, onChange, intl) => (
    <TextField
      label={intl.formatMessage({
        id: 'employeesearch.search'
      })}
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
export default injectIntl(
  connect(
    state => ({}),
    {
      employeeSearch: actions.employeeSearch,
      employeeSearchClear: actions.employeeSearchClear
    }
  )(StyledComponent)
);
