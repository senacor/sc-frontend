import React, { useState, useEffect, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Button, CircularProgress, withStyles } from '@material-ui/core';
import EmployeeCard from './EmployeeCard';
// Calls
// Material UI
import Grid from '@material-ui/core/Grid';
import {
  handleFilterActive,
  checkFilterValues
} from '../../helper/filterFunctions';

const styles = theme => ({
  gridContainer: {
    paddingTop: 2 * theme.spacing.unit,
    textAlign: 'center'
  },
  showMore: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    border: `1px solid ${theme.palette.secondary.grey}`
  }
});

const AllEmployeesGrid = ({
  classes,
  intl,
  filterInputs,
  employees,
  isLoading
}) => {
  const [itemsShown, setItemsShown] = useState(15);
  const [filterActive, setFilterActive] = useState(false);
  const cardsToShow = 15;

  useEffect(() => {
    handleFilterActive(filterInputs, setFilterActive);
  });

  const showMore = employees => {
    if (itemsShown + cardsToShow <= employees.length) {
      setItemsShown(itemsShown + cardsToShow);
    } else {
      setItemsShown(employees.length);
    }
  };

  let filteredEmployees = employees.filter(empl => {
    const employeeName = empl.firstName + ' ' + empl.lastName;
    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.position, empl.currentPosition) &&
      checkFilterValues(filterInputs.department, empl.department) &&
      checkFilterValues(filterInputs.scStatus, empl.scStatus) &&
      checkFilterValues(filterInputs.officeLocation, empl.officeLocation)
      // &&
      // checkFilterValues(filterInputs.year, empl.endDate[0]) &&
      // checkFilterValues(filterInputs.month, empl.endDate[1])
    );
  });

  // All employees
  const employeesData = employees.slice(0, itemsShown).map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard employee={employee} formerEmployee />
    </Grid>
  ));

  // Filtered employees
  const filteredEmployeesData = filteredEmployees
    .slice(0, itemsShown)
    .map(employee => (
      <Grid item key={employee.id}>
        <EmployeeCard employee={employee} formerEmployee />
      </Grid>
    ));

  return (
    <div className={classes.gridContainer}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Grid container spacing={16} justify="center">
            {filterActive ? filteredEmployeesData : employeesData}
          </Grid>
          {!filterActive && itemsShown < employees.length && (
            <Button
              className={classes.showMore}
              onClick={() => showMore(employees)}
              variant="contained"
            >
              {`${intl.formatMessage({
                id: 'showMore'
              })}..`}
            </Button>
          )}
          {filterActive && itemsShown < filteredEmployees.length && (
            <Button
              className={classes.showMore}
              onClick={() => showMore(filteredEmployees)}
              variant="contained"
            >
              {`${intl.formatMessage({
                id: 'showMore'
              })}..`}
            </Button>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesGrid));
