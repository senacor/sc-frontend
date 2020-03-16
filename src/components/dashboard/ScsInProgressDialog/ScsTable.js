import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {
  checkFilterValues,
  handleScProgressFilterActive,
  sortBySortActive
} from '../../../helper/filterFunctions';
import { linkToSc } from '../../../calls/sc';
// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  employeeNameCell: {
    maxWidth: 100
  },
  tableHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.secondary.white,
    marginBottom: 1
  },
  table: {
    overflowY: 'scroll',
    borderCollapse: 'separate'
  }
});

const ScsTable = ({ classes, intl, scs, history, filterInputs }) => {
  const [filterActive, setFilterActive] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    employeeLastName: true,
    position: false,
    supervisor: false,
    department: false,
    office: false,
    createdDate: false,
    statusStartTime: false
  });

  useEffect(() => {
    handleScProgressFilterActive(filterInputs, setFilterActive);
  });

  const changeDirection = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  };

  const handleSort = column => {
    const newSortActive = { ...sortActive };
    Object.keys(newSortActive).forEach(v => (newSortActive[v] = false));
    switch (column) {
      case 'EMPLOYEE':
        newSortActive.employeeLastName = true;
        break;
      case 'POSITION':
        newSortActive.position = true;
        break;
      case 'SUPERVISOR':
        newSortActive.supervisor = true;
        break;
      case 'DEPARTMENT':
        newSortActive.department = true;
        break;
      case 'OFFICE':
        newSortActive.office = true;
        break;
      case 'CREATED_DATE':
        newSortActive.createdDate = true;
        break;
      case 'STATUS_START':
        newSortActive.statusStartTime = true;
        break;
      default:
        break;
    }
    setSortActive(newSortActive);
    changeDirection();
  };

  const filterScs = (scs, filterInputs) => {
    return scs.filter(sc => {
      const employeeName = sc.employeeFirstName + ' ' + sc.employeeLastName;

      return (
        checkFilterValues(filterInputs.searchEmployee, employeeName) &&
        checkFilterValues(filterInputs.searchSupervisor, sc.supervisor) &&
        checkFilterValues(filterInputs.position, sc.position) &&
        checkFilterValues(filterInputs.department, sc.department) &&
        checkFilterValues(filterInputs.office, sc.office)
      );
    });
  };

  const filteredScs = filterScs(scs, filterInputs);

  let scsToDisplay = filterActive ? filteredScs : scs;

  scsToDisplay = sortBySortActive(scsToDisplay, sortActive, sortDirection);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.employeeLastName}
              direction={sortDirection}
              onClick={() => handleSort('EMPLOYEE')}
            >
              {intl.formatMessage({ id: 'meetingcreator.employee' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.position}
              direction={sortDirection}
              onClick={() => handleSort('POSITION')}
            >
              {intl.formatMessage({ id: 'employeeInfo.position' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.supervisor}
              direction={sortDirection}
              onClick={() => handleSort('SUPERVISOR')}
            >
              {intl.formatMessage({ id: 'employeeInfo.supervisor' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.department}
              direction={sortDirection}
              onClick={() => handleSort('DEPARTMENT')}
            >
              {intl.formatMessage({ id: 'employeeInfo.department' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.office}
              direction={sortDirection}
              onClick={() => handleSort('OFFICE')}
            >
              {intl.formatMessage({ id: 'employeeInfo.office' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.createdDate}
              direction={sortDirection}
              onClick={() => handleSort('CREATED_DATE')}
            >
              {intl.formatMessage({ id: 'sc.start' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.statusStartTime}
              direction={sortDirection}
              onClick={() => handleSort('STATUS_START')}
            >
              {intl.formatMessage({ id: 'scdialog.scstatusstarttime' })}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scsToDisplay.map(sc => {
          const employeeName = `${sc.employeeLastName}, ${
            sc.employeeFirstName
          }`;
          return (
            <TableRow
              key={sc.scId}
              onClick={() => linkToSc(sc.scId, history)}
              className={classes.tableRow}
            >
              <TableCell className={classes.employeeNameCell}>
                {employeeName}
              </TableCell>
              <TableCell>{sc.position}</TableCell>
              <TableCell>{sc.supervisor}</TableCell>
              <TableCell>{sc.department}</TableCell>
              <TableCell>{sc.office}</TableCell>
              <TableCell>
                {formatLocaleDateTime(sc.createdDate, FRONTEND_DATE_FORMAT)}
              </TableCell>
              <TableCell>
                {formatLocaleDateTime(sc.statusStartTime, FRONTEND_DATE_FORMAT)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScsTable)));
