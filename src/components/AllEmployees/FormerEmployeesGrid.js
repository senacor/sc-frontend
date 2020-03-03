import React, { useState, useEffect, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import {
  checkFilterValues,
  handleFilterActive
} from '../../helper/filterFunctions';
import EmployeeCard from './EmployeeCard';

// Material UI
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress, withStyles } from '@material-ui/core';

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

const FormerEmployeesGrid = ({
  classes,
  intl,
  filterInputs,
  employees,
  isLoading,
  setSelectedEmployee
}) => {
  const [itemsShown, setItemsShown] = useState(15);
  const [filterActive, setFilterActive] = useState(false);
  const cardsToShow = 15;

  useEffect(() => {
    setFilterActive(handleFilterActive(filterInputs));
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
      checkFilterValues(filterInputs.position, empl.position) &&
      checkFilterValues(filterInputs.department, empl.department) &&
      checkFilterValues(filterInputs.officeLocation, empl.officeLocation) &&
      checkFilterValues(
        filterInputs.year,
        empl.endDate ? empl.endDate[0] : null
      ) &&
      checkFilterValues(
        filterInputs.month,
        empl.endDate ? empl.endDate[1] : null
      )
    );
  });

  // All employees
  const employeesData = employees.slice(0, itemsShown).map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard
        employee={employee}
        setSelectedEmployee={setSelectedEmployee}
        formerEmployee
      />
    </Grid>
  ));

  // Filtered employees
  const filteredEmployeesData = filteredEmployees
    .slice(0, itemsShown)
    .map(employee => (
      <Grid item key={employee.id}>
        <EmployeeCard
          employee={employee}
          setSelectedEmployee={setSelectedEmployee}
          formerEmployee
        />
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

export default injectIntl(withStyles(styles)(FormerEmployeesGrid));
