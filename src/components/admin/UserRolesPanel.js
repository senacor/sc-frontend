import React, { useContext, useEffect, useState } from 'react';
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
import { getAllEmployeesWithRoles, getRoles } from '../../actions/calls/role';
import { ErrorContext } from '../App';
import UserRolesMenu from './UserRolesMenu';
import { sortByLastName } from '../../helper/sort';
import EmployeeFilter from './EmployeeFilter';

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
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  let errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getRoles(setRoles, setIsLoading, errorContext);
    getAllEmployeesWithRoles(setData, setIsLoading, errorContext);
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  };

  const updateEmployee = (employeeId, roles) => {
    let employee = data.filter(e => e.id === employeeId)[0];
    employee.roles = roles;
    let newData = data.filter(e => e.id !== employeeId);
    newData.push(employee);
    setData(newData);
  };

  sortByLastName(data, sortDirection);

  return (
    <Paper className={classes.spacing}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={sortDirection}
                onClick={handleSort}
              >
                <EmployeeFilter
                  data={data}
                  setSelectedEmployee={setSelectedEmployee}
                />
                {`${intl.formatMessage({
                  id: 'userrolespanel.user'
                })}`}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              {`${intl.formatMessage({
                id: 'userrolespanel.roles'
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
                {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
              </TableCell>
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
                  <TableRow>
                    <TableCell>
                      {`${entry.firstName} ${entry.lastName}`}
                    </TableCell>
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
