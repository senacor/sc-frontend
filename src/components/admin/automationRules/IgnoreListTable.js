import React, { useEffect, useState } from 'react';
import { List, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { injectIntl } from 'react-intl';
import { getIgnoreList, saveIgnoreList } from '../../../calls/rules';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';
import { checkFilterValues } from '../../../helper/filterFunctions';
import { sortBySortActive } from '../../../helper/sorting';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ConfirmDialog from '../../utils/ConfirmDialog';
import Grid from '@material-ui/core/Grid';
import SearchFilter from '../../filterComponents/SearchFilter';
import { departments } from '../../../helper/filterData';
import SortingFilter from '../../filterComponents/SortingFilter';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  ...theme.styledComponents,
  upperMenuContainer: {
    margin: '0.5rem',
    padding: '0.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableHead: {
    height: 80,
    backgroundColor: theme.palette.secondary.brightGrey,
    color: theme.palette.secondary.black
  },
  tableCell: {
    fontSize: '0.8rem'
  },
  employeeCell: {
    paddingRight: 2 * theme.spacing.unit
  },
  tableHeader: {
    fontSize: '0.8rem',
    paddingRight: 0
  },
  ruleTitle: {
    fontSize: '1.3em'
  },
  ignorelistsection: {
    paddingTop: 5 * theme.spacing.unit
  },
  subtitle: {
    justifyContent: 'center'
  },
  addMenu: {
    display: 'flex',
    width: '100%',
    textAlign: 'left'
  },
  actionBtn: {
    margin: 1 * theme.spacing.unit
  },
  hidden: {
    display: 'none'
  },
  listItem: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 1 * theme.spacing.unit,
    borderRadius: 1 * theme.spacing.unit
  },
  checkAllLabel: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.775rem'
  },
  checkAllInput: {
    marginLeft: 1.25 * theme.spacing.unit,
    paddingRight: 0.5 * theme.spacing.unit,
    paddingLeft: 0.5 * theme.spacing.unit,
    fontSize: 2.25 * theme.spacing.unit,
    '& span > svg': {
      fontSize: '1rem'
    }
  }
});

const IgnoreListTable = ({ classes, intl, employees }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const [searchSupervisorValue, setSearchSupervisorValue] = useState('');
  const [searchDepartmentValue, setSearchDepartmentValue] = useState([]);
  const [ignorelist, setIgnorelist] = useState([]);
  const [loadedIgnorelist, setLoadedIgnorelist] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [checkedSelectMultiple, setCheckedSelectMultiple] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    lastName: false,
    supervisorName: false,
    department: false,
    ignorechecked: true
  });

  const filterInputs = {
    searchEmployee: searchEmployeesValue,
    searchSupervisor: searchSupervisorValue,
    department: searchDepartmentValue
  };

  const error = useErrorContext();
  const info = useInfoContext();

  useEffect(() => {
    const afterLoaded = loadedList => {
      setIgnorelist([...loadedList]);
      setLoadedIgnorelist([...loadedList]);
    };
    getIgnoreList(afterLoaded, setIsLoading, error);
  }, []);

  if (isLoading) {
    return null;
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const saveChanges = () => {
    const afterSave = () => {
      setLoadedIgnorelist([...ignorelist]);
    };
    saveIgnoreList(ignorelist, afterSave, error, info);
    setDialogOpen(false);
  };

  const revertChanges = () => {
    setIgnorelist([...loadedIgnorelist]);
  };

  const rulesUpdated = loadedIgnorelist.join('-') !== ignorelist.join('-');

  const handleSort = column => {
    const newSortActive = { ...sortActive };
    Object.keys(newSortActive).forEach(v => (newSortActive[v] = false));
    switch (column) {
      case 'lastName':
        newSortActive.lastName = true;
        break;
      case 'supervisorName':
        newSortActive.supervisorName = true;
        break;
      case 'department':
        newSortActive.department = true;
        break;
      case 'ignorechecked':
        newSortActive.ignorechecked = true;
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

  const employeeRow = employee => {
    const handleChange = event => {
      if (event.target.checked) {
        //addEmployee
        setIgnorelist([...ignorelist, employee.id]);
      } else {
        //removeFromIgnorelist
        const newIgnoreList = ignorelist.filter(a => a !== employee.id);
        setIgnorelist(newIgnoreList);
      }
    };

    return (
      <TableRow className={`${classes.tableRow} ${classes.notSelection}`}>
        <TableCell className={classes.employeeCell}>{`${employee.lastName}, ${
          employee.firstName
        }`}</TableCell>
        <TableCell className={classes.employeeCell}>
          {employee.supervisorName}
        </TableCell>
        <TableCell>{employee.department}</TableCell>
        <TableCell>
          <Checkbox
            checked={employee.ignorechecked}
            onChange={handleChange}
            value="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </TableCell>
      </TableRow>
    );
  };

  const employeesWithIgnoreChecked = employees.map(e => {
    e.ignorechecked = ignorelist.includes(e.id);
    return e;
  });

  const sortedEmployees = sortBySortActive(
    employeesWithIgnoreChecked,
    sortActive,
    sortDirection,
    intl
  );

  const filterEmployees = (employees, filterInputs) => {
    return employees.filter(empl => {
      const employeeName = empl.firstName + ' ' + empl.lastName;
      return (
        checkFilterValues(filterInputs.searchEmployee, employeeName) &&
        checkFilterValues(filterInputs.searchSupervisor, empl.supervisorName) &&
        checkFilterValues(filterInputs.department, empl.department)
      );
    });
  };

  let filteredEmployees = filterEmployees(sortedEmployees, filterInputs);

  const filteredEmployeesData = filteredEmployees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => {
      return employeeRow(employee);
    });

  const renderFilter = () => {
    const handleDepartmentChange = event => {
      setSearchDepartmentValue(event.target.value);
    };
    return (
      <div className={classes.upperMenuContainer}>
        <SearchFilter
          searchValue={searchEmployeesValue}
          searchChange={event => setSearchEmployeesValue(event.target.value)}
          placeholder={intl.formatMessage({
            id: 'scignorelist.name'
          })}
        />
        <SearchFilter
          searchValue={searchSupervisorValue}
          searchChange={event => setSearchSupervisorValue(event.target.value)}
          placeholder={intl.formatMessage({
            id: 'scignorelist.supervisor'
          })}
        />
        <SortingFilter
          sortBy={'employeeInfo.department'}
          menuData={departments}
          handleChange={handleDepartmentChange}
          stateValue={searchDepartmentValue}
        />
      </div>
    );
  };

  return (
    <div className={classes.ignorelistsection}>
      <Typography variant="body1" className={classes.ruleTitle}>
        {intl.formatMessage({ id: 'autorules.sc.ignorelist' })}
      </Typography>
      <div className={classes.subtitle}>
        <Typography variant="body1">
          {intl.formatMessage({ id: 'autorules.sc.ignorelist.dates.title' })}
        </Typography>
      </div>
      {renderFilter()}
      <Table>
        <TableHead>
          <TableRow className={classes.tableCell}>
            <TableCell className={classes.tableHeader}>
              <TableSortLabel
                active={sortActive.lastName}
                direction={sortDirection}
                onClick={() => handleSort('lastName')}
              >
                {intl.formatMessage({ id: 'scignorelist.name' })}
              </TableSortLabel>
            </TableCell>
            <TableCell className={classes.tableHeader}>
              <TableSortLabel
                active={sortActive.supervisorName}
                direction={sortDirection}
                onClick={() => handleSort('supervisorName')}
              >
                {intl.formatMessage({ id: 'scignorelist.supervisor' })}
              </TableSortLabel>
            </TableCell>
            <TableCell className={classes.tableHeader}>
              <TableSortLabel
                active={sortActive.department}
                direction={sortDirection}
                onClick={() => handleSort('department')}
              >
                {intl.formatMessage({ id: 'scignorelist.department' })}
              </TableSortLabel>
            </TableCell>
            <TableCell className={classes.tableHeader}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TableSortLabel
                  active={sortActive.ignorechecked}
                  direction={sortDirection}
                  onClick={() => handleSort('ignorechecked')}
                >
                  {intl.formatMessage({ id: 'scignorelist.check' })}
                </TableSortLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedSelectMultiple}
                      onChange={event => {
                        if (!checkedSelectMultiple) {
                          const newIgnoreList = [
                            ...new Set([
                              ...ignorelist,
                              ...filteredEmployees.map(e => e.id)
                            ])
                          ];
                          setIgnorelist(newIgnoreList);
                        } else {
                          const newIgnoreList = ignorelist.filter(
                            a =>
                              filteredEmployees.filter(e => a === e.id)
                                .length === 0
                          );
                          setIgnorelist(newIgnoreList);
                        }

                        setCheckedSelectMultiple(event.target.checked);
                      }}
                      size={'small'}
                      color="secondary"
                      className={classes.checkAllInput}
                    />
                  }
                  label={
                    <div className={classes.checkAllLabel}>
                      {filteredEmployees.length}{' '}
                      {checkedSelectMultiple
                        ? intl.formatMessage({
                            id: 'scignorelist.uncheckmultiple'
                          })
                        : intl.formatMessage({
                            id: 'scignorelist.checkmultiple'
                          })}
                    </div>
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{filteredEmployeesData}</TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredEmployees.length}
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
      <List>
        <ListItem className={classes.listItem}>
          <div className={classes.addMenu}>
            <Grid sm={8} className={classes.leftSide}>
              <Button
                onClick={revertChanges}
                color="primary"
                variant="contained"
                className={!rulesUpdated ? classes.hidden : classes.actionBtn}
              >
                {intl.formatMessage({
                  id: 'autorules.revert'
                })}
              </Button>
              <Button
                disabled={!rulesUpdated}
                onClick={() => setDialogOpen(true)}
                color="primary"
                variant="contained"
                className={classes.actionBtn}
              >
                {intl.formatMessage({
                  id: 'autorules.savechanges'
                })}
              </Button>
            </Grid>
          </div>
        </ListItem>
        <ConfirmDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          handleConfirm={() => saveChanges()}
          confirmationText={intl.formatMessage({
            id: 'autorules.dialogText'
          })}
          confirmationHeader={intl.formatMessage({
            id: 'autorules.dialogTitle'
          })}
        />
      </List>
    </div>
  );
};

export default injectIntl(withStyles(styles)(IgnoreListTable));
