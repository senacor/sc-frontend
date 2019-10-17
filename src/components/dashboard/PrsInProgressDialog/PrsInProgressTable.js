import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { TableSortLabel, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { modifyString } from '../../../helper/string';
import { linkToPr } from '../../../calls/pr';
import {
  checkFilterValues,
  handleProgressFilterActive,
  sortBySortActive
} from '../../../helper/filterFunctions';

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

export const checkDateFilter = (filterInput, prDate) => {
  if (filterInput) {
    return filterInput === formatLocaleDateTime(prDate, 'YYYY-MM-DD');
  } else {
    return true;
  }
};

export const filterPrs = (prs, filterInputs) => {
  return prs.filter(pr => {
    const employeeName = pr.employeeFirstName + ' ' + pr.employeeLastName;
    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.searchSupervisor, pr.supervisor) &&
      checkDateFilter(filterInputs.date, pr.startDate) &&
      checkFilterValues(filterInputs.position, pr.currentPosition) &&
      checkFilterValues(filterInputs.occasion, modifyString(pr.prOccasion))
    );
  });
};

export const defaultSortActive = () => {
  return {
    employee: true,
    position: false,
    supervisor: false,
    date: false,
    occasion: false
  };
};

const PrsInProgressTable = ({ classes, intl, prs, history, filterInputs }) => {
  const [filterActive, setFilterActive] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState(defaultSortActive());

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
      case 'POSITION':
        newSortActive.position = true;
        break;
      case 'SUPERVISOR':
        newSortActive.supervisor = true;
        break;
      case 'DATE':
        newSortActive.date = true;
        break;
      case 'OCCASION':
        newSortActive.occasion = true;
        break;
      default:
        break;
    }
    setSortActive(newSortActive);
    changeDirection();
  };

  const filteredPrs = filterPrs(prs, filterInputs);

  const prsToDisplay = filterActive ? filteredPrs : prs;

  sortBySortActive(prsToDisplay, sortActive, sortDirection);

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
              active={sortActive.position}
              direction={sortDirection}
              onClick={() => handleSort('POSITION')}
            >
              {intl.formatMessage({ id: 'employeeInfo.positionAbrv' })}
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
              active={sortActive.date}
              direction={sortDirection}
              onClick={() => handleSort('DATE')}
            >
              {intl.formatMessage({ id: 'employeeInfo.startDate' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.occasion}
              direction={sortDirection}
              onClick={() => handleSort('OCCASION')}
            >
              {intl.formatMessage({ id: 'pr.occasion' })}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {prsToDisplay.map(pr => {
          const employeeName = `${pr.employeeFirstName} ${pr.employeeLastName}`;
          return (
            <TableRow
              key={pr.prId}
              onClick={() => linkToPr(pr.prId, null, history)}
              className={classes.tableRow}
            >
              <TableCell className={classes.employeeNameCell}>
                {employeeName}
              </TableCell>
              <TableCell>{pr.currentPosition}</TableCell>
              <TableCell>{pr.supervisor}</TableCell>
              <TableCell>
                {formatLocaleDateTime(pr.startDate, FRONTEND_DATE_FORMAT)}
              </TableCell>
              <TableCell>{modifyString(pr.prOccasion)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PrsInProgressTable)));
