import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Tooltip } from '@material-ui/core';
import FormerEmployeesGrid from './FormerEmployeesGrid';
import { positions, departments, locations } from '../../helper/filterData';
import FormerEmployeesTable from './FormerEmployeesTable/FormerEmployeesTable';
import { useErrorContext } from '../../helper/contextHooks';
import { years, months } from '../../helper/filterFunctions';
import UpperFilterMenu from '../filterComponents/UpperFilterMenu';
import { downloadExcelAllScs } from '../../helper/downloadExcel';

// Calls
import { getInactiveEmployees } from '../../calls/employees';

// Material UI
import IconButton from '@material-ui/core/IconButton';

// Icons
import TableViewIcon from '@material-ui/icons/List';
import CardsViewIcon from '@material-ui/icons/AccountBox';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  },
  filterWithUpload: {
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
  const error = useErrorContext();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [monthSorting, setMonthSorting] = useState([]);
  const [yearSorting, setYearSorting] = useState([]);
  const [positionSorting, setPositionSorting] = useState([]);
  const [departmentSorting, setDepartmentSorting] = useState([]);
  const [locationSorting, setLocationSorting] = useState([]);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const [tableView, setTableView] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('view') === 'table') {
      setTableView(true);
    }
    getInactiveEmployees(setEmployees, setIsLoading, error);
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

  const handleSortDepartmentChange = event => {
    setDepartmentSorting(event.target.value);
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

  const handleDownloadAllScs = () => {
    downloadExcelAllScs(error);
  };

  const filterInputs = {
    searchEmployee: searchEmployeesValue,
    year: [...yearSorting],
    month: [...monthSorting],
    position: [...positionSorting],
    department: [...departmentSorting],
    officeLocation: [...locationSorting]
  };

  const sortingData = [
    {
      id: 1,
      sortBy: intl.formatMessage({ id: 'employeeInfo.endYear' }),
      menuData: years(),
      stateValue: yearSorting,
      handleChange: handleSortYearChange
    },
    {
      id: 2,
      sortBy: intl.formatMessage({ id: 'employeeInfo.endMonth' }),
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
      <UpperFilterMenu
        searchEmployeesValue={searchEmployeesValue}
        handleSearchEmployeeChange={handleSearchEmployeeChange}
        handleDownloadAllScs={handleDownloadAllScs}
        visibleAdvancedFilter={visibleAdvancedFilter}
        clearFilter={clearFilter}
        toggleSortingFilter={toggleSortingFilter}
        sortingData={sortingData}
        formerEmployees
      />
      {tableView ? (
        <FormerEmployeesTable
          filterInputs={filterInputs}
          employees={employees}
          isLoading={isLoading}
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
