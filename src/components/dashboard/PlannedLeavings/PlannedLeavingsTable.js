import React from 'react';
import { injectIntl } from 'react-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { translateGeneralStatus } from '../../../helper/string';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ROUTES from '../../../helper/routes';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  }
});

const PlannedLeavingsTable = ({
  plannedLeavings,
  sortDirection,
  handleSort,
  classes,
  intl,
  history
}) => {
  const handleClick = employeeId => {
    history.push(`${ROUTES.EMPLOYEE_SC}/${employeeId}`);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {intl.formatMessage({
              id: 'plannedleavingstable.employeename'
            })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({
              id: 'plannedleavingstable.position'
            })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({
              id: 'plannedleavingstable.scstatus'
            })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({
              id: 'plannedleavingstable.supervisor'
            })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({
              id: 'plannedleavingstable.department'
            })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({
              id: 'plannedleavingstable.office'
            })}
          </TableCell>
          <TableCell>
            <TableSortLabel
              active
              direction={sortDirection}
              onClick={() => handleSort()}
            >
              {intl.formatMessage({
                id: 'plannedleavingstable.enddate'
              })}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {plannedLeavings.map((employee, index) => (
          <TableRow
            key={index}
            onClick={() => handleClick(employee.id)}
            className={classes.tableRow}
          >
            <TableCell>
              {`${employee.firstName} ${employee.lastName}`}
            </TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>
              {intl.formatMessage({
                id: translateGeneralStatus(employee.scStatus)
              })}
            </TableCell>
            <TableCell>{employee.supervisorName}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.officeLocation}</TableCell>
            <TableCell>
              {formatLocaleDateTime(employee.endDate, FRONTEND_DATE_FORMAT)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PlannedLeavingsTable)));
