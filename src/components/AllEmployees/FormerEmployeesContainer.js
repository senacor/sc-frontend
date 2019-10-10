import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { ErrorContext } from '../App';
import { withStyles, Tooltip } from '@material-ui/core';
import FormerEmployeesGrid from './FormerEmployeesGrid';
import SearchFilter from './SearchFilter';
import SortingFilter from './SortingFilter';
import {
  positions,
  competenceCenters,
  cst,
  locations
} from '../../helper/filterData';

// Calls
import { getInactiveEmployees } from '../../calls/employees';

// Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons
import FilterIcon from '@material-ui/icons/FilterList';
import TableViewIcon from '@material-ui/icons/List';
import CardsViewIcon from '@material-ui/icons/AccountBox';
import moment from 'moment';
import FormerEmployeesTable from './FormerEmployeesTable/FormerEmployeesTable';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
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

const FormerEmployeesContainer = ({ classes, intl }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const errorContext = useContext(ErrorContext.context);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [monthSorting, setMonthSorting] = useState([]);
  const [yearSorting, setYearSorting] = useState([]);
  const [positionSorting, setPositionSorting] = useState([]);
  const [ccSorting, setCcSorting] = useState([]);
  const [cstSorting, setCstSorting] = useState([]);
  const [locationSorting, setLocationSorting] = useState([]);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const [tableView, setTableView] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('view') === 'table') {
      setTableView(true);
    }
    getInactiveEmployees(setEmployees, setIsLoading, errorContext);
  }, []);

  const handleSortYearChange = event => {
    setYearSorting(event.target.value);
  };

  const handleSortMonthChange = event => {
    setMonthSorting(event.target.value);
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
    setYearSorting([]);
    setMonthSorting([]);
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
    year: [...yearSorting],
    month: [...monthSorting],
    position: [...positionSorting],
    cc: [...ccSorting],
    cst: [...cstSorting],
    officeLocation: [...locationSorting]
  };

  const years = () => {
    let years = [];
    const currentYear = moment().year();
    for (let i = currentYear; i >= 2000; i--) {
      years.push(i);
    }
    return years;
  };

  const months = () => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    return months;
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
      sortBy: intl.formatMessage({ id: 'employeeInfo.cc' }),
      menuData: competenceCenters,
      stateValue: ccSorting,
      handleChange: handleSortCcChange
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
        // TODO: change to FormerEmployeeTable
        <FormerEmployeesTable
          filterInputs={filterInputs}
          selected={{}}
          employees={employees}
        />
      ) : (
        <FormerEmployeesGrid
          filterInputs={filterInputs}
          employees={employees}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(FormerEmployeesContainer));
