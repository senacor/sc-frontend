import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

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

const FormerEmployeesTableHead = ({ intl, classes }) => {
  return (
    <TableHead>
      <TableRow className={classes.tableHead}>
        <TableCell className={classes.tableCell}>
          {intl.formatMessage({
            id: 'employeeInfo.name'
          })}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {intl.formatMessage({
            id: 'employeeInfo.position'
          })}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {intl.formatMessage({
            id: 'employeeInfo.supervisor'
          })}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {intl.formatMessage({
            id: 'employeeInfo.department'
          })}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {intl.formatMessage({
            id: 'employeeInfo.officelocation'
          })}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {intl.formatMessage({
            id: 'employeeInfo.exitDate'
          })}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default injectIntl(withStyles(styles)(FormerEmployeesTableHead));
