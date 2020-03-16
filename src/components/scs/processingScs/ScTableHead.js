import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
// Material UI
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
  tableHead: {
    height: 80,
    backgroundColor: theme.palette.secondary.brightGrey,
    color: theme.palette.secondary.black
  },
  tableCell: {
    fontSize: '0.8rem'
  }
});

const ScTableHead = ({
  intl,
  classes,
  formerEmployee,
  sortActive,
  setSortActive,
  sortDirection,
  setSortDirection
}) => {
  const handleSort = column => {
    const newSortActive = { ...sortActive };
    Object.keys(newSortActive).forEach(v => (newSortActive[v] = false));
    switch (column) {
      case 'employee':
        newSortActive.employee = true;
        break;
      case 'createdDate':
        newSortActive.createdDate = true;
        break;
      case 'periodName':
        newSortActive.periodNameCD = true;
        break;
      case 'currentStatus':
        newSortActive.currentStatus = true;
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

  return (
    <TableHead>
      <TableRow className={classes.tableCell}>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.employee}
            direction={sortDirection}
            onClick={() => handleSort('employee')}
          >
            {intl.formatMessage({ id: 'employeeInfo.name' })}
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.periodName}
            direction={sortDirection}
            onClick={() => handleSort('periodName')}
          >
            {intl.formatMessage({ id: 'employeeInfo.periodName' })}
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.createdDate}
            direction={sortDirection}
            onClick={() => handleSort('createdDate')}
          >
            {intl.formatMessage({ id: 'employeeInfo.startDate' })}
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.currentStatus}
            direction={sortDirection}
            onClick={() => handleSort('currentStatus')}
          >
            {intl.formatMessage({ id: 'scdialog.scstatus' })}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default injectIntl(withStyles(styles)(ScTableHead));
