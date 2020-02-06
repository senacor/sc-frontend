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

const styles = theme => ({});

const PlannedLeavingsTable = ({
  plannedLeavings,
  sortDirection,
  handleSort,
  classes,
  intl
}) => {
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
          <TableRow key={index}>
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

export default injectIntl(withStyles(styles)(PlannedLeavingsTable));
