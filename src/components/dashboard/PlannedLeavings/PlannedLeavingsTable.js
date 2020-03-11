import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { translateGeneralStatus } from '../../../helper/string';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ROUTES from '../../../helper/routes';
import { withRouter } from 'react-router-dom';
import { sortBySortActive } from '../../../helper/filterFunctions';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  tableHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.secondary.white,
    marginBottom: 1
  },
  table: {
    overflowY: 'scroll',
    borderCollapse: 'separate'
  }
});

const PlannedLeavingsTable = ({ plannedLeavings, classes, intl, history }) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    lastName: true,
    position: false,
    supervisorName: false,
    department: false,
    office: false,
    endDate: false,
    scStatus: false
  });

  const changeDirection = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  };

  const handleSort = column => {
    const newSortActive = { ...sortActive };
    Object.keys(newSortActive).forEach(v => (newSortActive[v] = false));
    switch (column) {
      case 'EMPLOYEE':
        newSortActive.lastName = true;
        break;
      case 'POSITION':
        newSortActive.position = true;
        break;
      case 'SUPERVISOR':
        newSortActive.supervisorName = true;
        break;
      case 'DEPARTMENT':
        newSortActive.department = true;
        break;
      case 'OFFICE':
        newSortActive.office = true;
        break;
      case 'END_DATE':
        newSortActive.endDate = true;
        break;
      case 'SC_STATUS':
        newSortActive.scStatus = true;
        break;
      default:
        break;
    }
    setSortActive(newSortActive);
    changeDirection();
  };

  const handleClick = employeeId => {
    history.push(`${ROUTES.EMPLOYEE_SC}/${employeeId}`);
  };

  let plannedLeavingsToDisplay = [...plannedLeavings];
  plannedLeavingsToDisplay = sortBySortActive(
    plannedLeavingsToDisplay,
    sortActive,
    sortDirection
  );

  return (
    <Table className={classes.table}>
      <TableHead className={classes.tableHeader}>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sortActive.lastName}
              direction={sortDirection}
              onClick={() => handleSort('EMPLOYEE')}
            >
              {intl.formatMessage({
                id: 'plannedleavingstable.employeename'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.position}
              direction={sortDirection}
              onClick={() => handleSort('POSITION')}
            >
              {intl.formatMessage({ id: 'employeeInfo.position' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.supervisorName}
              direction={sortDirection}
              onClick={() => handleSort('SUPERVISOR')}
            >
              {intl.formatMessage({ id: 'employeeInfo.supervisor' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.department}
              direction={sortDirection}
              onClick={() => handleSort('DEPARTMENT')}
            >
              {intl.formatMessage({ id: 'employeeInfo.department' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.office}
              direction={sortDirection}
              onClick={() => handleSort('OFFICE')}
            >
              {intl.formatMessage({ id: 'employeeInfo.office' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.endDate}
              direction={sortDirection}
              onClick={() => handleSort('END_DATE')}
            >
              {intl.formatMessage({
                id: 'plannedleavingstable.enddate'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.scStatus}
              direction={sortDirection}
              onClick={() => handleSort('SC_STATUS')}
            >
              {intl.formatMessage({
                id: 'plannedleavingstable.scstatus'
              })}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {plannedLeavingsToDisplay.map((employee, index) => (
          <TableRow
            key={index}
            onClick={() => handleClick(employee.id)}
            className={classes.tableRow}
          >
            <TableCell>
              {`${employee.lastName}, ${employee.firstName}`}
            </TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.supervisorName}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.officeLocation}</TableCell>
            <TableCell>
              {formatLocaleDateTime(employee.endDate, FRONTEND_DATE_FORMAT)}
            </TableCell>
            <TableCell>
              {employee.scStatus
                ? intl.formatMessage({
                    id: translateGeneralStatus(employee.scStatus)
                  })
                : intl.formatMessage({ id: 'employeeInfo.noScStatus' })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PlannedLeavingsTable)));
