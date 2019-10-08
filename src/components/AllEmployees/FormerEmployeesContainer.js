import React, { Fragment, useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { ErrorContext } from '../App';
import { withStyles, Tooltip, FormControl } from '@material-ui/core';
import AllEmployeesGrid from './AllEmployeesGrid';
import SearchFilter from './SearchFilter';
import SortingFilter from './SortingFilter';
import {
  positions,
  competenceCenters,
  cst,
  locations
} from '../../helper/filterData';
import MonthYearPicker from 'react-month-year-picker';

// Calls
import { getAllEmployees } from '../../calls/employees';

// Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

// Icons
import FilterIcon from '@material-ui/icons/FilterList';
import TableViewIcon from '@material-ui/icons/List';
import CardsViewIcon from '@material-ui/icons/AccountBox';
import AllEmployeesTable from './AllEmployeesTable/AllEmployeesTable';
import moment from 'moment';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  ...theme,
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
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  btnUpload: {
    border: `1px solid ${theme.palette.secondary.grey}`,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit
    }
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
  },
  inputForFormer: {
    width: 105,
    margin: 2 * theme.spacing.unit
  }
});

const FormerEmployeesContainer = ({ classes, intl }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const errorContext = useContext(ErrorContext.context);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [monthSorting, setMonthSorting] = useState(null);
  const [yearSorting, setYearSorting] = useState(null);
  const [positionSorting, setPositionSorting] = useState([]);
  const [ccSorting, setCcSorting] = useState([]);
  const [cstSorting, setCstSorting] = useState([]);
  const [locationSorting, setLocationSorting] = useState([]);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('view') === 'table') {
      setTableView(true);
    }
    getAllEmployees(setEmployees, setIsLoading, errorContext);
  }, []);

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

  const handleClick = event => {
    if (monthSorting === null) {
      setMonthSorting(moment().month() + 1);
      setYearSorting(moment().year());
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      sortBy: intl.formatMessage({ id: 'employeeInfo.location' }),
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

  return (
    <div className={classes.container}>
      <IconButton className={classes.setViewBtn} onClick={toggleChangeView}>
        {tableView ? (
          <Tooltip title={intl.formatMessage({ id: 'switchView.cards' })}>
            <TableViewIcon />
          </Tooltip>
        ) : (
          <Tooltip title={intl.formatMessage({ id: 'switchView.table' })}>
            <CardsViewIcon />
          </Tooltip>
        )}
      </IconButton>
      <Paper className={classes.filterWithUpload}>
        <div className={classes.upperPanel}>
          <div className={classes.advFilter}>
            <SearchFilter
              searchValue={searchEmployeesValue}
              searchChange={handleSearchEmployeeChange}
              placeholder={intl.formatMessage({ id: 'filter.searchEmployee' })}
            />
            <Button
              onClick={() => toggleSortingFilter()}
              className={classes.advFilterButton}
            >
              <FilterIcon />
              <Typography variant="button">
                {intl.formatMessage({ id: 'filter.advanced' })}
              </Typography>
            </Button>
          </div>
        </div>
        {visibleAdvancedFilter && (
          <div className={classes.advFilter}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-month">
                {intl.formatMessage({ id: 'filter.month' })}
              </InputLabel>
              <Select
                onClick={handleClick}
                input={
                  <Input id="select-month" className={classes.inputForFormer} />
                }
              >{`${monthSorting}/${yearSorting}`}</Select>
            </FormControl>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <MonthYearPicker
                selectedMonth={monthSorting}
                selectedYear={yearSorting}
                minYear={1994}
                maxYear={2050}
                onChangeMonth={month => setMonthSorting(month)}
                onChangeYear={year => setYearSorting(year)}
              />
            </Popover>
            {sortingData.map(item => (
              <SortingFilter
                key={item.id}
                sortBy={item.sortBy}
                handleChange={item.handleChange}
                menuData={item.menuData}
                stateValue={item.stateValue}
                formerEmployees={true}
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
          selected={{}}
          employees={employees}
          isLoading={isLoading}
          formerEmployees={true}
        />
      ) : (
        <AllEmployeesGrid
          filterInputs={filterInputs}
          selected={{}}
          employees={employees}
          isLoading={isLoading}
          formerEmployees={true}
        />
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(FormerEmployeesContainer));
