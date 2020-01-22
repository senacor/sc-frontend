import React, { useState, useEffect, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import EmployeeCard from './EmployeeCard';
import {
  handleFilterActive,
  checkFilterValues
} from '../../helper/filterFunctions';
import { modifyString } from '../../helper/string';

// Material UI
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress, withStyles } from '@material-ui/core';
import { useUserinfoContext } from '../../helper/contextHooks';

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

  const user = useUserinfoContext();

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
    if (!empl.entryDate) {
      return false;
    }
    const employeeName = empl.firstName + ' ' + empl.lastName;
    const modifiedScStatus = modifyString(empl.scStatus);
    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.searchSupervisor, empl.supervisorName) &&
      checkFilterValues(filterInputs.position, empl.position) &&
      checkFilterValues(filterInputs.department, empl.department) &&
      checkFilterValues(filterInputs.scStatus, modifiedScStatus) &&
      checkFilterValues(filterInputs.officeLocation, empl.officeLocation) &&
      checkFilterValues(filterInputs.year, empl.entryDate[0]) &&
      checkFilterValues(filterInputs.month, empl.entryDate[1])
    );
  });

  // All employees
  const employeesData = employees.slice(0, itemsShown).map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard
        employee={employee}
        employees={employees}
        personalDev={user.hasRoleHr()}
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
          employees={employees}
          personalDev={user.hasRoleHr()}
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
