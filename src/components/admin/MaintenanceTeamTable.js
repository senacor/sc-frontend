import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, Grid, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  deleteMaintenanceTeamMember,
  getAllEmployeesWithRoles,
  getMaintenanceTeam
} from '../../calls/admin';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ErrorContext } from '../App';
import EmployeeFilter from './EmployeeFilter';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  padding: {
    paddingTop: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit
  },
  center: {
    alignItems: 'center'
  }
});

const MaintenanceTeamTable = ({ classes, intl }) => {
  const [allEmployeesData, setAllEmployeesData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getAllEmployeesWithRoles(setAllEmployeesData, setIsLoading, errorContext);
    getMaintenanceTeam(setData, setIsLoading, errorContext);
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleOnDeleteClick = (event, employeeId) => {
    deleteMaintenanceTeamMember(employeeId, errorContext);
    setData(data.filter(entry => entry.employeeId !== employeeId));
  };

  return (
    <Paper className={classes.spacing}>
      <Typography className={classes.padding} variant="h5">
        {intl.formatMessage({
          id: 'maintenance.team'
        })}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {`${intl.formatMessage({
                id: 'maintenance.employeeId'
              })}`}
            </TableCell>
            <TableCell>
              {`${intl.formatMessage({
                id: 'maintenance.user'
              })}`}
            </TableCell>
            <TableCell>
              {`${intl.formatMessage({
                id: 'maintenance.email'
              })}`}
            </TableCell>
            <TableCell>
              {`${intl.formatMessage({
                id: 'maintenance.delete'
              })}`}
            </TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <CircularProgress className={classes.spacing} />
        ) : (
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(entry => {
                return (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.employeeId}</TableCell>
                    <TableCell>{`${entry.firstName} ${
                      entry.lastName
                    }`}</TableCell>
                    <TableCell>{entry.email}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={event =>
                          handleOnDeleteClick(event, entry.employeeId)
                        }
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        )}
      </Table>
      <Grid container className={classes.center}>
        <Grid item xs={2}>
          <EmployeeFilter
            data={allEmployeesData}
            maintenanceData={data}
            setMaintenanceData={setData}
            maintenance={true}
            errorContext={errorContext}
          />
        </Grid>
        <Grid item xs={10}>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(MaintenanceTeamTable));
