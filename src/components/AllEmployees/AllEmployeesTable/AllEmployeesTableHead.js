import React, { Fragment } from 'react';
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

const AllEmployeesTableHead = ({ intl, classes, formerEmployee }) => {
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
        {!formerEmployee && (
          <Fragment>
            <TableCell className={classes.tableCell}>
              {intl.formatMessage({
                id: 'employeeInfo.scStatus'
              })}
            </TableCell>
            <TableCell className={classes.tableCell}>
              {intl.formatMessage({
                id: 'employeeInfo.supervisor'
              })}
            </TableCell>
          </Fragment>
        )}
        <TableCell className={classes.tableCell}>
          {intl.formatMessage({
            id: 'employeeInfo.department'
          })}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {intl.formatMessage({
            id: 'employeeInfo.office'
          })}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {formerEmployee
            ? intl.formatMessage({ id: 'employeeInfo.exitDate' })
            : intl.formatMessage({
                id: 'employeeInfo.entryDate'
              })}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesTableHead));
