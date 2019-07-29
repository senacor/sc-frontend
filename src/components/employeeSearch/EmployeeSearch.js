import React, { useState } from 'react';
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

const EmployeeSearch = props => {
  props.employeeSearchClear();

  const [employeeSearchValue, setEmployeeSearchValue] = useState(
    props.employeeSearchValue ? props.employeeSearchValue : ''
  );

  const handleChange = event => {
    setEmployeeSearchValue(event.target.value);
    if (event.target.value) {
      executeSearch(event.target.value);
    }
  };

  const selectedEmployee = employee => () => {
    let employeeName = `${employee.firstName} ${employee.lastName}`;
    setEmployeeSearchValue(employeeName);
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
      {props.inputElement(employeeSearchValue, handleChange, props.intl)}
      {employeeSearchValue !== '' ? (
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
