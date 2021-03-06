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
        newSortActive.employeeLastName = true;
        break;
      case 'periodName':
        newSortActive.periodName = true;
        break;
      case 'createdDate':
        newSortActive.createdDate = true;
        break;
      case 'scStatus':
        newSortActive.scStatus = true;
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
            active={sortActive.employeeLastName}
            direction={sortDirection}
            onClick={() => handleSort('employeeLastName')}
          >
            {intl.formatMessage({ id: 'employeeInfo.name' })}
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.periodName}
            direction={sortDirection}
            onClick={() => handleSort('createdDate')}
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
            active={sortActive.deadline}
            direction={sortDirection}
            onClick={() => handleSort('deadline')}
          >
            {intl.formatMessage({ id: 'employeeInfo.deadline' })}
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TableSortLabel
            active={sortActive.scStatus}
            direction={sortDirection}
            onClick={() => handleSort('scStatus')}
          >
            {intl.formatMessage({ id: 'scdialog.scstatus' })}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default injectIntl(withStyles(styles)(ScTableHead));
