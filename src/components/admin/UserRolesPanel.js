import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllEmployeesWithRoles } from '../../actions/calls/employeeSearch';
import { ErrorContext } from '../App';
import UserRolesMenu from './UserRolesMenu';

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

  let errorContext = useContext(ErrorContext.context);

  useEffect(
    () => {
      getAllEmployeesWithRoles(
        setData,
        setIsLoading,
        errorContext
      );
    },
    []
  );

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  return (
    <Paper className={classes.spacing}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {`${intl.formatMessage({
                  id: 'userrolespanel.user'
                })}`}
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
            ) : (
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(entry => {
                return (
                  <TableRow>
                    <TableCell>
                      {`${entry.firstName} ${entry.lastName}`}
                    </TableCell>
                    <TableCell>
                      <UserRolesMenu />
                    </TableCell>
                  </TableRow>
                )
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
