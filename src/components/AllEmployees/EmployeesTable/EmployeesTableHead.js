import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
// Material UI
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
  tableHead: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.secondary.white
  },
  tableCell: {
    fontSize: '0.8rem'
  }
});

const EmployeesTableHead = ({
  intl,
  classes,
  formerEmployee,
  sortActive,
  setSortActive,
  sortDirection,
  setSortDirection
}) => {
  const handleSort = column => {
    const newSortActive = { ...sortActive };
    Object.keys(newSortActive).forEach(v => (newSortActive[v] = false));
    switch (column) {
      case 'lastName':
        newSortActive.lastName = true;
        break;
      case 'position':
        newSortActive.position = true;
        break;
      case 'supervisorName':
        newSortActive.supervisorName = true;
        break;
      case 'department':
        newSortActive.department = true;
        break;
      case 'officeLocation':
        newSortActive.officeLocation = true;
        break;
      case 'endDate':
        newSortActive.endDate = true;
        break;
      case 'entryDate':
        newSortActive.entryDate = true;
        break;
      case 'scStatus':
        newSortActive.scStatus = true;
        break;
      default:
        break;
    }
    setSortActive(newSortActive);
    changeDirection();
  };

  const changeDirection = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  };

  return (
    <TableHead className={classes.tableHead}>
      <TableRow className={classes.tableCell}>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.lastName}
            direction={sortDirection}
            onClick={() => handleSort('lastName')}
          >
            {intl.formatMessage({ id: 'employeeInfo.name' })}
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.position}
            direction={sortDirection}
            onClick={() => handleSort('position')}
          >
            {intl.formatMessage({ id: 'employeeInfo.position' })}
          </TableSortLabel>
        </TableCell>
        {!formerEmployee && (
          <TableCell className={classes.tableCell}>
            <TableSortLabel
              active={sortActive.supervisorName}
              direction={sortDirection}
              onClick={() => handleSort('supervisorName')}
            >
              {intl.formatMessage({ id: 'employeeInfo.supervisor' })}
            </TableSortLabel>
          </TableCell>
        )}
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.department}
            direction={sortDirection}
            onClick={() => handleSort('department')}
          >
            {intl.formatMessage({ id: 'employeeInfo.department' })}
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.officeLocation}
            direction={sortDirection}
            onClick={() => handleSort('officeLocation')}
          >
            {intl.formatMessage({ id: 'employeeInfo.office' })}
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell}>
          {formerEmployee ? (
            <TableSortLabel
              active={sortActive.endDate}
              direction={sortDirection}
              onClick={() => handleSort('endDate')}
            >
              {intl.formatMessage({ id: 'employeeInfo.exitDate' })}
            </TableSortLabel>
          ) : (
            <TableSortLabel
              active={sortActive.entryDate}
              direction={sortDirection}
              onClick={() => handleSort('entryDate')}
            >
              {intl.formatMessage({ id: 'employeeInfo.entryDate' })}
            </TableSortLabel>
          )}
        </TableCell>
        {!formerEmployee && (
          <Fragment>
            <TableCell className={classes.tableCell}>
              <TableSortLabel
                active={sortActive.scStatus}
                direction={sortDirection}
                onClick={() => handleSort('scStatus')}
              >
                {intl.formatMessage({ id: 'employeeInfo.scStatus' })}
              </TableSortLabel>
            </TableCell>
          </Fragment>
        )}
      </TableRow>
    </TableHead>
  );
};

export default injectIntl(withStyles(styles)(EmployeesTableHead));
