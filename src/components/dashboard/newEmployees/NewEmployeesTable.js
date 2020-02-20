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
import { withRouter } from 'react-router-dom';
import EmployeeFilter from '../../admin/EmployeeFilter';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
  textInfo: {
    color: theme.palette.primary[400]
  }
});

const NewEmployeesTable = ({
  currentSupervisors,
  newEmployees,
  handleChangeSupervisor,
  classes,
  intl
}) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    employeeName: true,
    position: false,
    supervisor: false,
    department: false,
    officeLocation: false,
    entryDate: false
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
        newSortActive.employeeName = true;
        break;
      case 'POSITION':
        newSortActive.position = true;
        break;
      case 'SUPERVISOR':
        newSortActive.supervisor = true;
        break;
      case 'DEPARTMENT':
        newSortActive.department = true;
        break;
      case 'OFFICE':
        newSortActive.officeLocation = true;
        break;
      case 'ENTRY_DATE':
        newSortActive.entryDate = true;
        break;
      default:
        break;
    }
    setSortActive(newSortActive);
    changeDirection();
  };

  const employeesToDisplay = [...newEmployees];
  sortBySortActive(employeesToDisplay, sortActive, sortDirection);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sortActive.employeeName}
              direction={sortDirection}
              onClick={() => handleSort('EMPLOYEE')}
            >
              {intl.formatMessage({
                id: 'newemployeesdialogtable.employeename'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.position}
              direction={sortDirection}
              onClick={() => handleSort('POSITION')}
            >
              {intl.formatMessage({
                id: 'newemployeesdialogtable.position'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.supervisor}
              direction={sortDirection}
              onClick={() => handleSort('SUPERVISOR')}
            >
              {intl.formatMessage({
                id: 'newemployeesdialogtable.supervisor'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.department}
              direction={sortDirection}
              onClick={() => handleSort('DEPARTMENT')}
            >
              {intl.formatMessage({
                id: 'newemployeesdialogtable.department'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.officeLocation}
              direction={sortDirection}
              onClick={() => handleSort('OFFICE')}
            >
              {intl.formatMessage({
                id: 'newemployeesdialogtable.office'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.entryDate}
              direction={sortDirection}
              onClick={() => handleSort('ENTRY_DATE')}
            >
              {intl.formatMessage({
                id: 'newemployeesdialogtable.entrydate'
              })}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employeesToDisplay.map((employee, index) => (
          <TableRow key={index} className={classes.tableRow}>
            <TableCell>
              {`${employee.lastName}, ${employee.firstName}`}
            </TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>
              <EmployeeFilter
                data={currentSupervisors}
                settingSupervisors
                index={index}
                supervisorName={
                  employee.supervisorName
                    ? employee.supervisorName
                    : intl.formatMessage({
                        id: 'employeeInfo.noSupervisor'
                      })
                }
                setSelectedEmployee={handleChangeSupervisor}
              />
            </TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.officeLocation}</TableCell>
            <TableCell>
              {formatLocaleDateTime(employee.entryDate, FRONTEND_DATE_FORMAT)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(NewEmployeesTable)));
