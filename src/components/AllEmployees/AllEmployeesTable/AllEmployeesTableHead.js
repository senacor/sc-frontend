import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({});

const AllEmployeesTableHead = ({
  intl,
  classes,
  handleSort,
  sortDirection
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            active={true}
            direction={sortDirection}
            onClick={handleSort}
          >
            {intl.formatMessage({
              id: 'employeeInfo.name'
            })}
          </TableSortLabel>
        </TableCell>
        <TableCell>
          {intl.formatMessage({
            id: 'employeeInfo.position'
          })}
        </TableCell>
        <TableCell>
          {intl.formatMessage({
            id: 'employeeInfo.cst'
          })}
        </TableCell>
        <TableCell>
          {intl.formatMessage({
            id: 'employeeInfo.supervisor'
          })}
        </TableCell>
        <TableCell>
          {intl.formatMessage({
            id: 'employeeInfo.cc'
          })}
        </TableCell>
        <TableCell>
          {intl.formatMessage({
            id: 'employeeInfo.location'
          })}
        </TableCell>
        <TableCell>
          {intl.formatMessage({
            id: 'employeeInfo.startDate'
          })}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesTableHead));
