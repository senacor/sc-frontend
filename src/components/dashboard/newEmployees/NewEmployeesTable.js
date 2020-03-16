import React from 'react';
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

const NewEmployeesTable = ({
  currentSupervisors,
  newEmployees,
  handleChangeSupervisor,
  classes,
  intl,
  sortActive,
  sortDirection,
  handleSort
}) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.lastName}
              direction={sortDirection}
              onClick={() => handleSort('EMPLOYEE')}
            >
              {intl.formatMessage({
                id: 'newemployeesdialogtable.employeename'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
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
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.supervisorName}
              direction={sortDirection}
              onClick={() => handleSort('SUPERVISOR')}
            >
              {intl.formatMessage({
                id: 'newemployeesdialogtable.supervisor'
              })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
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
          <TableCell className={classes.tableHeader}>
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
          <TableCell className={classes.tableHeader}>
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
        {newEmployees.map((employee, index) => (
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
