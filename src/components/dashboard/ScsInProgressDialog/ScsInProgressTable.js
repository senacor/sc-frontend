import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
  checkFilterValues,
  handleProgressFilterActive,
  sortBySortActive
} from '../../../helper/filterFunctions';
import { linkToSc } from '../../../calls/sc';
import { mapPosition } from '../../../helper/string';

export const filterScs = (scs, filterInputs) => {
  return scs.filter(sc => {
    const employeeName = sc.employeeFirstName + ' ' + sc.employeeLastName;
    const checkStatus = (desired, actual) => {
      if (desired.length === 2 || desired.length < 1) {
        return true;
      }
      if (desired.toString().includes('In progress') && actual === true) {
        return true;
      }
      return desired.toString().includes('Done') && actual === false;
    };

    const checkPosition = (desired, actual) => {
      if (!desired || desired.length < 1) {
        return true;
      }
      return desired
        .map(position => position.toUpperCase().replace(' ', '_'))
        .includes(actual);
    };

    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.searchSupervisor, sc.supervisor) &&
      checkFilterValues(filterInputs.department, sc.department) &&
      checkPosition(filterInputs.position, sc.employeePosition) &&
      checkFilterValues(filterInputs.office, sc.office) &&
      checkStatus(filterInputs.status, sc.inProgress)
    );
  });
};

export const defaultScSortActive = () => {
  return {
    employee: true,
    department: false,
    supervisor: false,
    scposition: false,
    office: false,
    status: false
  };
};

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  employeeNameCell: { maxWidth: 100 }
});

const ScsInProgressTable = ({ classes, intl, scs, history, filterInputs }) => {
  const [filterActive, setFilterActive] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState(defaultScSortActive());

  useEffect(() => {
    handleProgressFilterActive(filterInputs, setFilterActive);
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
        newSortActive.employee = true;
        break;
      case 'DEPARTMENT':
        newSortActive.department = true;
        break;
      case 'SUPERVISOR':
        newSortActive.supervisor = true;
        break;
      case 'POSITION':
        newSortActive.scposition = true;
        break;
      case 'OFFICE':
        newSortActive.office = true;
        break;
      case 'STATUS':
        newSortActive.status = true;
        break;
      default:
        break;
    }
    setSortActive(newSortActive);
    changeDirection();
  };

  const filteredScs = filterScs(scs, filterInputs);

  const scsToDisplay = filterActive ? filteredScs : scs;

  sortBySortActive(scsToDisplay, sortActive, sortDirection);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sortActive.employee}
              direction={sortDirection}
              onClick={() => handleSort('EMPLOYEE')}
            >
              {intl.formatMessage({ id: 'meetingcreator.employee' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.department}
              direction={sortDirection}
              onClick={() => handleSort('DEPARTMENT')}
            >
              {intl.formatMessage({ id: 'employeeInfo.department' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.supervisor}
              direction={sortDirection}
              onClick={() => handleSort('SUPERVISOR')}
            >
              {intl.formatMessage({ id: 'employeeInfo.supervisor' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.scposition}
              direction={sortDirection}
              onClick={() => handleSort('POSITION')}
            >
              {intl.formatMessage({ id: 'employeeInfo.positionAbrv' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.office}
              direction={sortDirection}
              onClick={() => handleSort('OFFICE')}
            >
              {intl.formatMessage({ id: 'employeeInfo.office' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.status}
              direction={sortDirection}
              onClick={() => handleSort('STATUS')}
            >
              {intl.formatMessage({ id: 'sc.workstatus' })}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scsToDisplay.map(sc => {
          const employeeName = `${sc.employeeFirstName} ${sc.employeeLastName}`;
          return (
            <TableRow
              key={sc.scId}
              onClick={() => linkToSc(sc.scId, history)}
              className={classes.tableRow}
            >
              <TableCell className={classes.employeeNameCell}>
                {employeeName}
              </TableCell>
              <TableCell>{sc.department}</TableCell>
              <TableCell>{sc.supervisor}</TableCell>
              <TableCell>{mapPosition(sc.employeePosition)}</TableCell>
              <TableCell>{sc.office}</TableCell>
              <TableCell>
                {sc.inProgress
                  ? intl.formatMessage({ id: 'sc.running' })
                  : intl.formatMessage({ id: 'sc.done' })}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScsInProgressTable)));
