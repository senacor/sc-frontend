import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Button, CircularProgress, withStyles } from '@material-ui/core';
import EmployeeCard from './EmployeeCard';
// Calls
// Material UI
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  gridContainer: {
    height: '65vh',
    width: '100%',
    paddingTop: 2 * theme.spacing.unit,
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  content: {
    textAlign: 'center'
  },
  showMore: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

const EmployeesGrid = ({
  classes,
  intl,
  searchEmployeesValue,
  filterInputs,
  toggleSelected,
  selection,
  selected,
  employees,
  isLoading
}) => {
  const [itemsShown, setItemsShown] = useState(15);
  const [filterActive, setFilterActive] = useState(false);
  const cardsToShow = 15;
  let filteredEmployees = [];

  useEffect(() => {
    const handleFilterActive = () => {
      const emptyInputs = {
        searchEmployee: '',
        position: [],
        cc: [],
        cst: [],
        officeLocation: []
      };
      if (JSON.stringify(emptyInputs) === JSON.stringify(filterInputs)) {
        setFilterActive(false);
      } else {
        setFilterActive(true);
      }
    };
    handleFilterActive();
  });

  useEffect(() => {
    if (filterActive) {
      filterByInputs(filterInputs, employees);
    }
  });

  const showMore = () => {
    if (itemsShown + cardsToShow <= employees.length) {
      setItemsShown(itemsShown + cardsToShow);
    } else {
      setItemsShown(employees.length);
    }
  };

  const checkFilterValues = (filterData, userData) => {
    if (filterData.length > 0 || filterData === '') {
      return filterData.includes(userData);
    } else {
      return true;
    }
  };

  console.log('employees', employees);

  const filterByInputs = () => {
    filteredEmployees = employees.filter(empl => {
      return (
        checkFilterValues(filterInputs.position, empl.currentPosition) &&
        checkFilterValues(filterInputs.cc, empl.competenceCenter) &&
        checkFilterValues(filterInputs.cst, empl.currentCst) &&
        checkFilterValues(filterInputs.officeLocation, empl.officeLocation)
      );
    });
  };

  // All employees
  const employeesData = employees.slice(0, itemsShown).map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard
        employee={employee}
        toggleSelected={toggleSelected}
        selection={selection}
        selected={selected[employee.id]}
      />
    </Grid>
  ));

  // Filtered employees
  const filteredEmployeesData = filteredEmployees.map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard
        employee={employee}
        toggleSelected={toggleSelected}
        selection={selection}
        selected={selected[employee.id]}
      />
    </Grid>
  ));

  return (
    <div className={classes.gridContainer}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={classes.content}>
          <Grid container spacing={40}>
            {filterActive ? filteredEmployeesData : employeesData}
          </Grid>
          {!filterActive && itemsShown < employees.length && (
            <Button className={classes.showMore} onClick={showMore}>
              {`${intl.formatMessage({
                id: 'showMore'
              })}..`}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(EmployeesGrid));
