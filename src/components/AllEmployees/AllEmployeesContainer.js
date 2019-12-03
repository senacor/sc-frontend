import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useErrorContext } from '../../helper/contextHooks';
import { Tooltip, withStyles } from '@material-ui/core';
import AllEmployeesGrid from './AllEmployeesGrid';
import SearchFilter from './SearchFilter';
import SortingFilter from './SortingFilter';
import {
  departments,
  locations,
  positions,
  scStatuses
} from '../../helper/filterData';
// Calls
import { getAllEmployees } from '../../calls/employees';
// Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import FilterIcon from '@material-ui/icons/FilterList';
import TableViewIcon from '@material-ui/icons/List';
import CardsViewIcon from '@material-ui/icons/AccountBox';
import AllEmployeesTable from './AllEmployeesTable/AllEmployeesTable';
import { years, months } from '../../helper/filterFunctions';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  },
  upperMenuPaper: {
    margin: '0.5rem',
    padding: '0.5rem 2rem'
  },
  upperMenuContainer: {
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
  toggleFilterBtn: {
    border: `1px solid ${theme.palette.secondary.grey}`,
    margin: theme.spacing.unit
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
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [monthSorting, setMonthSorting] = useState([]);
  const [yearSorting, setYearSorting] = useState([]);
  const [positionSorting, setPositionSorting] = useState([]);
  const [departmentSorting, setDepartmentSorting] = useState([]);
  const [scStatusSorting, setScStatusSorting] = useState([]);
  const [locationSorting, setLocationSorting] = useState([]);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const [tableView, setTableView] = useState(false);

  console.log('employees', employees);

  useEffect(() => {
    if (localStorage.getItem('view') === 'table') {
      setTableView(true);
    }
    getAllEmployees(setEmployees, setIsLoading, error);
  }, []);

  const handleSearchEmployeeChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  const handleSortPositionChange = event => {
    setPositionSorting(event.target.value);
  };

  const handleSortDepartmentChange = event => {
    setDepartmentSorting(event.target.value);
  };

  const handleSortScStatusChange = event => {
    setScStatusSorting(event.target.value);
  };

  const handleSortLocationChange = event => {
    setLocationSorting(event.target.value);
  };

  const handleSortYearChange = event => {
    setYearSorting(event.target.value);
  };

  const handleSortMonthChange = event => {
    setMonthSorting(event.target.value);
  };

  const toggleSortingFilter = () => {
    setVisibleAdvancedFilter(!visibleAdvancedFilter);
  };

  const clearFilter = () => {
    setSearchEmployeesValue('');
    setScStatusSorting([]);
    setPositionSorting([]);
    setDepartmentSorting([]);
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
    year: [...yearSorting],
    month: [...monthSorting],
    position: [...positionSorting],
    department: [...departmentSorting],
    scStatus: [...scStatusSorting],
    officeLocation: [...locationSorting]
  };

  const sortingData = [
    {
      id: 1,
      sortBy: intl.formatMessage({ id: 'employeeInfo.year' }),
      menuData: years(),
      stateValue: yearSorting,
      handleChange: handleSortYearChange
    },
    {
      id: 2,
      sortBy: intl.formatMessage({ id: 'employeeInfo.month' }),
      menuData: months(),
      stateValue: monthSorting,
      handleChange: handleSortMonthChange
    },
    {
      id: 3,
      sortBy: intl.formatMessage({ id: 'employeeInfo.positionAbrv' }),
      menuData: positions,
      stateValue: positionSorting,
      handleChange: handleSortPositionChange
    },
    {
      id: 4,
      sortBy: intl.formatMessage({ id: 'employeeInfo.department' }),
      menuData: departments,
      stateValue: departmentSorting,
      handleChange: handleSortDepartmentChange
    },
    {
      id: 5,
      sortBy: intl.formatMessage({ id: 'employeeInfo.office' }),
      menuData: locations,
      stateValue: locationSorting,
      handleChange: handleSortLocationChange
    },
    {
      id: 6,
      sortBy: intl.formatMessage({ id: 'employeeInfo.scStatus' }),
      menuData: scStatuses,
      stateValue: scStatusSorting,
      handleChange: handleSortScStatusChange
    }
  ];

  const upperFilterMenu = (
    <div className={classes.upperMenuContainer}>
      <SearchFilter
        searchValue={searchEmployeesValue}
        searchChange={handleSearchEmployeeChange}
        placeholder={intl.formatMessage({
          id: 'filter.searchEmployee'
        })}
      />
      {visibleAdvancedFilter && (
        <Button
          variant="contained"
          onClick={clearFilter}
          className={classes.clearFilterBtn}
        >
          <Typography variant="button" className={classes.clearFilterText}>
            x {intl.formatMessage({ id: 'filter.clear' })}
          </Typography>
        </Button>
      )}
      <Button
        onClick={() => toggleSortingFilter()}
        className={classes.toggleFilterBtn}
        variant="contained"
      >
        <FilterIcon />
        <Typography variant="button">
          {intl.formatMessage({ id: 'filter.advanced' })}
        </Typography>
      </Button>
    </div>
  );

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
      <Paper className={classes.upperMenuPaper}>
        {upperFilterMenu}
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
          </div>
        )}
      </Paper>
      {tableView ? (
        <AllEmployeesTable
          filterInputs={filterInputs}
          employees={employees}
          isLoading={isLoading}
        />
      ) : (
        <AllEmployeesGrid
          filterInputs={filterInputs}
          employees={employees}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
