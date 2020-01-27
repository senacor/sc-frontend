import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useErrorContext } from '../../helper/contextHooks';
import { Tooltip, withStyles } from '@material-ui/core';
import ActiveEmployeesGrid from './ActiveEmployeesGrid';
import {
  departments,
  locations,
  positions,
  scStatuses
} from '../../helper/filterData';
import ActiveEmployeesTable from './EmployeesTable/ActiveEmployeesTable';
import { years, months } from '../../helper/filterFunctions';
import UpperFilterMenu from '../filterComponents/UpperFilterMenu';
import { downloadExcelAllScs } from '../../helper/downloadExcel';

// Calls
import { getAllEmployees } from '../../calls/employees';

// Material UI
import IconButton from '@material-ui/core/IconButton';

// Icons
import TableViewIcon from '@material-ui/icons/List';
import CardsViewIcon from '@material-ui/icons/AccountBox';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  },
  setViewBtn: {
    position: 'fixed',
    right: 13 * theme.spacing.unit,
    top: theme.spacing.unit,
    zIndex: 3,
    color: theme.palette.secondary.white
  }
});

const ActiveEmployeesContainer = ({ classes, intl }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const [searchSupervisorValue, setSearchSupervisorValue] = useState('');
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

  const error = useErrorContext();

  useEffect(() => {
    if (localStorage.getItem('view') === 'table') {
      setTableView(true);
    }
    getAllEmployees(setEmployees, setIsLoading, error);
  }, []);

  const handleSearchEmployeeChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  const handleSearchSupervisorChange = event => {
    setSearchSupervisorValue(event.target.value);
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
    setMonthSorting([]);
    setYearSorting([]);
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
    searchSupervisor: searchSupervisorValue,
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
      sortBy: 'employeeInfo.startYear',
      menuData: years(),
      stateValue: yearSorting,
      handleChange: handleSortYearChange
    },
    {
      id: 2,
      sortBy: 'employeeInfo.startMonth',
      menuData: months(),
      stateValue: monthSorting,
      handleChange: handleSortMonthChange
    },
    {
      id: 3,
      sortBy: 'employeeInfo.positionAbrv',
      menuData: positions,
      stateValue: positionSorting,
      handleChange: handleSortPositionChange
    },
    {
      id: 4,
      sortBy: 'employeeInfo.department',
      menuData: departments,
      stateValue: departmentSorting,
      handleChange: handleSortDepartmentChange
    },
    {
      id: 5,
      sortBy: 'employeeInfo.office',
      menuData: locations,
      stateValue: locationSorting,
      handleChange: handleSortLocationChange
    },
    {
      id: 6,
      sortBy: 'employeeInfo.scStatus',
      menuData: scStatuses,
      stateValue: scStatusSorting,
      handleChange: handleSortScStatusChange
    }
  ];

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
      <UpperFilterMenu
        searchEmployeesValue={searchEmployeesValue}
        handleSearchEmployeeChange={handleSearchEmployeeChange}
        searchSupervisorValue={searchSupervisorValue}
        handleSearchSupervisorChange={handleSearchSupervisorChange}
        handleDownloadAllScs={handleDownloadAllScs}
        visibleAdvancedFilter={visibleAdvancedFilter}
        clearFilter={clearFilter}
        toggleSortingFilter={toggleSortingFilter}
        sortingData={sortingData}
      />
      {tableView ? (
        <ActiveEmployeesTable
          filterInputs={filterInputs}
          employees={employees}
          isLoading={isLoading}
        />
      ) : (
        <ActiveEmployeesGrid
          filterInputs={filterInputs}
          employees={employees}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(ActiveEmployeesContainer));
