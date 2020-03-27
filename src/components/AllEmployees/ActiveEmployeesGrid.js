import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import EmployeeCard from './EmployeeCard';
import {
  checkFilterValues,
  handleFilterActive
} from '../../helper/filterFunctions';
// Material UI
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress, withStyles } from '@material-ui/core';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../helper/contextHooks';
import { convertToStatusEnum } from '../../helper/filterData';

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

const ActiveEmployeesGrid = ({
  classes,
  intl,
  filterInputs,
  employees,
  isLoading,
  setSelectedEmployee
}) => {
  const [itemsShown, setItemsShown] = useState(15);
  const [filterActive, setFilterActive] = useState(false);

  const user = useUserinfoContext();
  const info = useInfoContext();
  const error = useErrorContext();

  const cardsToShow = 15;

  useEffect(() => {
    setFilterActive(handleFilterActive(filterInputs));
  });

  useEffect(
    () => {
      const splitUrl = window.location.pathname.split('/');
      if (!isNaN(splitUrl[splitUrl.length - 1])) {
        setSelectedEmployee(
          employees.filter(
            employee => employee.id === Number(splitUrl[splitUrl.length - 1])
          )[0]
        );
      }
    },
    [employees]
  );

  const showMore = employees => {
    if (itemsShown + cardsToShow <= employees.length) {
      setItemsShown(itemsShown + cardsToShow);
    } else {
      setItemsShown(employees.length);
    }
  };

  const sortEmployees = employees => {
    return employees.sort((employee1, employee2) => {
      if (employee1.lastName > employee2.lastName) {
        return 1;
      }
      if (employee1.lastName < employee2.lastName) {
        return -1;
      }
      return 0;
    });
  };

  const statusEnums = convertToStatusEnum(filterInputs.scStatus);

  let filteredEmployees = employees.filter(empl => {
    if (!empl.entryDate) {
      return false;
    }
    const employeeName = empl.firstName + ' ' + empl.lastName;

    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.searchSupervisor, empl.supervisorName) &&
      checkFilterValues(filterInputs.position, empl.position) &&
      checkFilterValues(filterInputs.department, empl.department) &&
      checkFilterValues(statusEnums, empl.scStatus) &&
      checkFilterValues(filterInputs.officeLocation, empl.officeLocation) &&
      checkFilterValues(
        filterInputs.year,
        empl.entryDate ? empl.entryDate[0] : null
      ) &&
      checkFilterValues(
        filterInputs.month,
        empl.entryDate ? empl.entryDate[1] : null
      )
    );
  });

  employees = sortEmployees(employees);
  filteredEmployees = sortEmployees(filteredEmployees);

  const currentSupervisors = employees.filter(
    employee => employee.hasSupervisorRole
  );

  // All employees
  const employeesData = employees.slice(0, itemsShown).map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard
        employee={employee}
        currentSupervisors={currentSupervisors}
        setSelectedEmployee={setSelectedEmployee}
        user={user}
        info={info}
        error={error}
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
          currentSupervisors={currentSupervisors}
          setSelectedEmployee={setSelectedEmployee}
          user={user}
          info={info}
          error={error}
        />
      </Grid>
    ));

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ActiveEmployeesGrid));
