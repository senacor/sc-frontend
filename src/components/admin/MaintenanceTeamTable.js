import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { TextField, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  addMaintenanceTeamMember,
  deleteMaintenanceTeamMember,
  getAllEmployeesWithRoles,
  getMaintenanceTeam
} from '../../calls/admin';
import EmployeeFilter from './EmployeeFilter';
// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// Icons
import TeamIcon from '@material-ui/icons/SupervisorAccount';
import { useErrorContext } from '../../helper/contextHooks';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  ...theme.styledComponents,
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 2 * theme.spacing.unit,
    '& h5': {
      paddingLeft: theme.spacing.unit
    },
    '& svg': {
      fontSize: '2rem'
    }
  },
  padding: {
    paddingTop: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit
  },
  center: {
    alignItems: 'center'
  },
  maintenanceAddPanel: {
    padding: '1vh',
    paddingLeft: '2vw'
  },
  buttonAdd: {
    marginTop: '1em',
    margin: 3 * theme.spacing.unit
  },
  inputText: {
    marginRight: '1vw'
  },
  paddingLeft: {
    paddingLeft: 2 * theme.spacing.unit
  }
});

const MaintenanceTeamTable = ({ classes, intl }) => {
  const [maintenanceMemberName, setMaintenanceMemberName] = useState('');
  const [maintenanceMemberEmail, setMaintenanceMemberEmail] = useState('');
  const [allEmployeesData, setAllEmployeesData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const error = useErrorContext();

  useEffect(() => {
    getAllEmployeesWithRoles(setAllEmployeesData, setIsLoading, error);
    getMaintenanceTeam(setData, setIsLoading, error);
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleOnDeleteClick = (event, email) => {
    const deleteDTO = { email: email };
    deleteMaintenanceTeamMember(deleteDTO, error);
    setData(data.filter(entry => entry.email !== email));
  };

  const validateAndAddContact = () => {
    //VALIDATION
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(maintenanceMemberEmail) ||
      !maintenanceMemberName ||
      maintenanceMemberName.length < 1
    ) {
      setMaintenanceMemberEmail('');
      setMaintenanceMemberName('');
      error.show('maintenance.invalid.input');
      return;
    }

    //DTO
    const memberDTO = {
      name: maintenanceMemberName,
      email: maintenanceMemberEmail
    };

    const afterAdd = () => {
      const newData = [...data];
      newData.push(memberDTO);
      setData(newData);
      setMaintenanceMemberEmail('');
      setMaintenanceMemberName('');
    };
    addMaintenanceTeamMember(memberDTO, afterAdd, error);
  };

  const handleSelectedUser = employee => {
    const name = employee.firstName + ' ' + employee.lastName;
    const email = employee.email;
    setMaintenanceMemberEmail(email);
    setMaintenanceMemberName(name);
  };

  return (
    <Paper className={classes.spacing}>
      <div className={classes.header}>
        <TeamIcon color={'primary'} />
        <Typography variant="h5">
          {intl.formatMessage({
            id: 'maintenance.team'
          })}
        </Typography>
      </div>
      <div className={classes.tableContent}>
        {isLoading ? (
          <div className={classes.progressBarCentered}>
            <CircularProgress />
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {`${intl.formatMessage({
                    id: 'maintenance.member'
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
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(entry => {
                  return (
                    <TableRow key={entry.email}>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={event =>
                            handleOnDeleteClick(event, entry.email)
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
          </Table>
        )}
      </div>
      <Grid container className={classes.center}>
        <Grid item xs={12} md={12}>
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
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.paddingLeft}>
            {intl.formatMessage({
              id: 'maintenance.addmember'
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} className={classes.maintenanceAddPanel}>
          <TextField
            value={maintenanceMemberName}
            label={intl.formatMessage({
              id: 'maintenance.name'
            })}
            className={classes.inputText}
            onChange={e => {
              setMaintenanceMemberName(e.target.value);
            }}
          />
          <TextField
            value={maintenanceMemberEmail}
            label={intl.formatMessage({
              id: 'maintenance.email'
            })}
            type={'email'}
            onChange={e => {
              setMaintenanceMemberEmail(e.target.value);
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonAdd}
            onClick={validateAndAddContact}
          >
            <AddIcon className={classes.leftIcon} />
            {intl.formatMessage({
              id: 'maintenance.add'
            })}
          </Button>
          <EmployeeFilter
            className={classes.buttonAdd}
            data={allEmployeesData}
            setSelectedEmployee={handleSelectedUser}
            maintenance={true}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(MaintenanceTeamTable));
