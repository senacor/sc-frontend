import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  CircularProgress,
  TableSortLabel,
  withStyles
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllEmployeesWithRoles, getRoles } from '../../calls/admin';
import UserRolesMenu from './UserRolesMenu';
import EmployeeFilter from './EmployeeFilter';
import { useErrorContext } from '../../helper/contextHooks';
import { translateRole } from '../../helper/string';
import { sortBySortActive } from '../../helper/sorting';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  }
});

export const UserRolesPanel = ({ classes, intl }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [roles, setRoles] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    lastName: true,
    roles: false
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  let error = useErrorContext();

  useEffect(() => {
    getRoles(setRoles, setIsLoading, error);
    getAllEmployeesWithRoles(setData, setIsLoading, error);
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleSort = field => {
    const newSortActive = {
      lastName: false,
      roles: false
    };
    newSortActive[field] = true;
    setSortActive(newSortActive);

    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);

    const sortedData = sortBySortActive(data, newSortActive, newSortDirection);
    setData(sortedData);
  };

  const updateEmployee = (employeeId, roles) => {
    let employee = data.filter(e => e.id === employeeId)[0];
    employee.roles = roles;
    let newData = data.filter(e => e.id !== employeeId);
    newData.push(employee);
    const sortedData = sortBySortActive(newData, sortActive, sortDirection);
    setData(sortedData);
  };

  const translateRoles = roles => {
    if (roles.length === 0) {
      return [intl.formatMessage({ id: 'rolemanagement.unknown' })];
    } else {
      return roles
        .map(role => intl.formatMessage({ id: translateRole(role) }))
        .join(', ');
    }
  };

  return (
    <Paper className={classes.spacing}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortActive.lastName}
                direction={sortDirection}
                onClick={() => handleSort('lastName')}
              >
                <EmployeeFilter
                  data={data}
                  setSelectedEmployee={setSelectedEmployee}
                  settingRoles
                />
                {`${intl.formatMessage({
                  id: 'userrolespanel.user'
                })}`}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortActive.roles}
                direction={sortDirection}
                onClick={() => handleSort('roles')}
              >
                {`${intl.formatMessage({
                  id: 'userrolespanel.roles'
                })}`}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              {`${intl.formatMessage({
                id: 'userrolespanel.actions'
              })}`}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : selectedEmployee ? (
            <TableRow>
              <TableCell>
                {`${selectedEmployee.lastName}, ${selectedEmployee.firstName}`}
              </TableCell>
              <TableCell>{translateRoles(selectedEmployee.roles)}</TableCell>
              <TableCell>
                <UserRolesMenu
                  employeeId={selectedEmployee.id}
                  allRoles={roles}
                  selectedRoles={selectedEmployee.roles}
                  updateEmployee={updateEmployee}
                />
              </TableCell>
            </TableRow>
          ) : (
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(entry => {
                return (
                  <TableRow key={entry.id}>
                    <TableCell>
                      {`${entry.lastName}, ${entry.firstName}`}
                    </TableCell>
                    <TableCell>{translateRoles(entry.roles)}</TableCell>
                    <TableCell>
                      <UserRolesMenu
                        employeeId={entry.id}
                        allRoles={roles}
                        selectedRoles={entry.roles}
                        updateEmployee={updateEmployee}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': `${intl.formatMessage({
            id: 'performancereviewtable.previouspage'
          })}`
        }}
        nextIconButtonProps={{
          'aria-label': `${intl.formatMessage({
            id: 'performancereviewtable.nextpage'
          })}`
        }}
        labelRowsPerPage={intl.formatMessage({
          id: 'performancereviewtable.rowsperpage'
        })}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} ${intl.formatMessage({
            id: 'performancereviewtable.from'
          })} ${count}`
        }
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(UserRolesPanel));
