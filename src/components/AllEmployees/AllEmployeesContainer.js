import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';
import { Tooltip, withStyles } from '@material-ui/core';
import AllEmployeesGrid from './AllEmployeesGrid';
import SearchFilter from './SearchFilter';
import SortingFilter from './SortingFilter';
import {
  competenceCenters,
  cst,
  locations,
  positions
} from '../../helper/filterData';
// Calls
import { getAllEmployees } from '../../calls/employees';
// Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import FilterIcon from '@material-ui/icons/FilterList';
import TableViewIcon from '@material-ui/icons/List';
import CardsViewIcon from '@material-ui/icons/AccountBox';
import AllEmployeesTable from './AllEmployeesTable/AllEmployeesTable';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  },
  gridContainer: {
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  containerMenu: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  filterWithUpload: {
    margin: '0.5rem',
    padding: '0.5rem 2rem'
  },
  upperPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  advFilter: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  advFilterButton: {
    margin: theme.spacing.unit
  },
  btnUpload: {
    border: `1px solid ${theme.palette.secondary.grey}`,
    margin: theme.spacing.unit
  },
  selectEmployee: {
    width: '100%',
    textAlign: 'end'
  },
  label: {
    marginRight: theme.spacing.unit
  },
  selectionMenu: {
    display: 'inline'
  },
  clearFilterText: {
    color: theme.palette.secondary.darkRed
  },
  clearFilterBtn: {
    border: `1px solid ${theme.palette.secondary.grey}`,
    height: 38,
    minWidth: 160
  },
  setViewBtn: {
    position: 'fixed',
    right: 13 * theme.spacing.unit,
    top: theme.spacing.unit,
    zIndex: 3,
    color: theme.palette.secondary.white
  }
});

const AllEmployeesContainer = ({ classes, intl }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const error = useErrorContext();
  const [selection, setSelection] = useState(false);
  const [selected, setSelected] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [positionSorting, setPositionSorting] = useState([]);
  const [ccSorting, setCcSorting] = useState([]);
  const [cstSorting, setCstSorting] = useState([]);
  const [locationSorting, setLocationSorting] = useState([]);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const [tableView, setTableView] = useState(false);
  const user = useUserinfoContext();

  const downloadPrsExcel = () => {
  };

  useEffect(() => {
    if (localStorage.getItem('view') === 'table') {
      setTableView(true);
    }
    getAllEmployees(setEmployees, setIsLoading, error);
  }, []);

  const checkFileForm = file => {
    const regex = /^20[0-9]{6}_\D{3}/g;
    if (file.match(regex)) {
      return true;
    } else {
      error.show('message.uploadError');
    }
  };

  const handleChange = event => {
    if (checkFileForm(event.target.files[0].name)) {
    }
  };

  const toggleSelected = employeeId => {
    if (selected[employeeId]) {
      delete selected[employeeId];
    } else {
      selected[employeeId] = true;
    }
    setSelected({ ...selected });
  };

  const requestPr = () => {
  };

  const handleSearchEmployeeChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  const handleSortPositionChange = event => {
    setPositionSorting(event.target.value);
  };

  const handleSortCcChange = event => {
    setCcSorting(event.target.value);
  };

  const handleSortCstChange = event => {
    setCstSorting(event.target.value);
  };

  const handleSortLocationChange = event => {
    setLocationSorting(event.target.value);
  };

  const toggleSortingFilter = () => {
    setVisibleAdvancedFilter(!visibleAdvancedFilter);
  };

  const clearFilter = () => {
    setSearchEmployeesValue('');
    setCstSorting([]);
    setPositionSorting([]);
    setCcSorting([]);
    setLocationSorting([]);
  };

  const toggleChangeView = () => {
    if (tableView) {
      localStorage.setItem('view', 'cards');
      setTableView(false);
    } else {
      localStorage.setItem('view', 'table');
      setTableView(true);
    }
  };

  const filterInputs = {
    searchEmployee: searchEmployeesValue,
    position: [...positionSorting],
    cc: [...ccSorting],
    cst: [...cstSorting],
    officeLocation: [...locationSorting]
  };

  const sortingData = [
    {
      id: 1,
      sortBy: intl.formatMessage({ id: 'employeeInfo.positionAbrv' }),
      menuData: positions,
      stateValue: positionSorting,
      handleChange: handleSortPositionChange
    },
    {
      id: 2,
      sortBy: intl.formatMessage({ id: 'employeeInfo.cc' }),
      menuData: competenceCenters,
      stateValue: ccSorting,
      handleChange: handleSortCcChange
    },
    {
      id: 3,
      sortBy: intl.formatMessage({ id: 'employeeInfo.officelocation' }),
      menuData: locations,
      stateValue: locationSorting,
      handleChange: handleSortLocationChange
    },
    {
      id: 4,
      sortBy: intl.formatMessage({ id: 'employeeInfo.cst' }),
      menuData: cst,
      stateValue: cstSorting,
      handleChange: handleSortCstChange
    }
  ];

  const upperMenu = intl => {
    let selectionMenu = selection ? (
      <Fragment>
        <Button
          className={classes.btnUpload}
          onClick={() => {
            setSelected({});
            setSelection(false);
          }}
        >
          {intl.formatMessage({
            id: 'pr.cancel'
          })}
        </Button>{' '}
        <Button
          className={classes.btnUpload}
          onClick={requestPr}
          color="secondary"
        >
          {intl.formatMessage({
            id: 'requestperformancereview.requestpr'
          })}
        </Button>
      </Fragment>
    ) : (
      <Button
        className={classes.btnUpload}
        color="secondary"
        onClick={() => {
          setSelected({});
          setSelection(true);
        }}
      >
        {intl.formatMessage({
          id: 'pr.select.employees'
        })}
      </Button>
    );

    return (
      <Fragment>
        <Grid item xs={5}>
          <SearchFilter
            searchValue={searchEmployeesValue}
            searchChange={handleSearchEmployeeChange}
            placeholder={intl.formatMessage({
              id: 'filter.searchEmployee'
            })}
          />
          <Button
            onClick={() => toggleSortingFilter()}
            className={classes.btnUpload}
          >
            <FilterIcon />
            <Typography variant="button">
              {intl.formatMessage({ id: 'filter.advanced' })}
            </Typography>
          </Button>
        </Grid>
        {user.hasRoleHr() ? (
          <Grid item xs={7}>
            <div className={classes.selectEmployee}>
              <Button
                component="span"
                className={`${classes.label} ${classes.btnUpload}`}
                onClick={downloadPrsExcel}
              >
                {intl.formatMessage({
                  id: 'excelexport'
                })}
              </Button>
              <TextField
                style={{ display: 'none' }}
                id="upload-button"
                multiple
                type="file"
                onChange={handleChange}
              />
              <label htmlFor="upload-button" className={classes.label}>
                <Button component="span" className={classes.btnUpload}>
                  {intl.formatMessage({
                    id: 'allemployeescontainer.upload'
                  })}
                </Button>
              </label>
              {selectionMenu}
            </div>
          </Grid>
        ) : (
          user.hasRoleSupervisor() && (
            <Grid item xs={7} alignItems={'flex-end'}>
              <div className={classes.selectEmployee}>{selectionMenu}</div>
            </Grid>
          )
        )}
      </Fragment>
    );
  };

  return (
    <div className={classes.container}>
      <IconButton className={classes.setViewBtn} onClick={toggleChangeView}>
        <Tooltip
          title={
            tableView
              ? intl.formatMessage({ id: 'switchView.cards' })
              : intl.formatMessage({ id: 'switchView.table' })
          }
        >
          <span>{tableView ? <TableViewIcon /> : <CardsViewIcon />}</span>
        </Tooltip>
      </IconButton>
      <Paper className={classes.filterWithUpload}>
        <Grid container direction="row">
          {upperMenu(intl)}
        </Grid>
        {visibleAdvancedFilter && (
          <div className={classes.advFilter}>
            {sortingData.map(item => (
              <SortingFilter
                key={item.id}
                sortBy={item.sortBy}
                handleChange={item.handleChange}
                menuData={item.menuData}
                stateValue={item.stateValue}
              />
            ))}
            <Button onClick={clearFilter} className={classes.clearFilterBtn}>
              <Typography variant="button" className={classes.clearFilterText}>
                x {intl.formatMessage({ id: 'filter.clear' })}
              </Typography>
            </Button>
          </div>
        )}
      </Paper>
      {tableView ? (
        <AllEmployeesTable
          filterInputs={filterInputs}
          selection={selection}
          selected={selected}
          toggleSelected={toggleSelected}
          employees={employees}
          isLoading={isLoading}
        />
      ) : (
        <AllEmployeesGrid
          filterInputs={filterInputs}
          selection={selection}
          selected={selected}
          toggleSelected={toggleSelected}
          employees={employees}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
