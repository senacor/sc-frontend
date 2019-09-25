import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, CircularProgress, withStyles } from '@material-ui/core';
import EmployeeCard from './EmployeeCard';
// Calls
// Material UI
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  gridContainer: {
    height: '70vh',
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
  toggleSelected,
  selection,
  selected,
  employees,
  isLoading
}) => {
  const [itemsShown, setItemsShown] = useState(15);
  const cardsToShow = 15;

  const showMore = () => {
    if (itemsShown + cardsToShow <= employees.length) {
      setItemsShown(itemsShown + cardsToShow);
    } else {
      setItemsShown(employees.length);
    }
  };

  const filteredEmployees = employees.filter(employee => {
    return employee.lastName
      .toLowerCase()
      .includes(searchEmployeesValue.toLowerCase());
  });

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
            {searchEmployeesValue ? filteredEmployeesData : employeesData}
          </Grid>
          {!searchEmployeesValue && itemsShown < employees.length && (
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
