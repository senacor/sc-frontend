import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { CircularProgress } from '@material-ui/core';
import PlotEmployeeSearchList from './PlotEmployeeSearchList';
import { employeeSearch } from '../../calls/employeeSearch';
import { debounce } from '../../helper/debounce';
import { ErrorContext } from '../App';

const styles = theme => ({
  box: {
    display: 'flex',
    padding: 2 * theme.spacing.unit,
    flexDirection: 'column',
    width: '200px'
  },
  employeeList: {
    width: '100%',
    maxHeight: '300px'
  }
});

export const EmployeeSearch = props => {
  const [employeeSearchResults, setEmployeeSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    setEmployeeSearchResults([]);
  }, []);

  const [employeeSearchVal, setEmployeeSearchVal] = useState(
    props.employeeSearchValue ? props.employeeSearchValue : ''
  );

  const handleChange = event => {
    setEmployeeSearchVal(event.target.value);
    if (event.target.value) {
      executeSearch(
        event.target.value,
        setEmployeeSearchResults,
        setIsLoading,
        errorContext
      );
    }
  };

  const selectedEmployee = employee => () => {
    const employeeName = `${employee.firstName} ${employee.lastName}`;
    setEmployeeSearchVal(employeeName);
    props.selectEmployee(employee);
    setEmployeeSearchResults([]);
  };

  const executeSearch = debounce(employeeSearch, 500);
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <PlotEmployeeSearchList
              excludeList={props.excludeList}
              selectEmployee={selectedEmployee}
              searchResults={employeeSearchResults}
              isLoading={isLoading}
            />
          )}
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

export default injectIntl(withStyles(styles)(EmployeeSearch));
