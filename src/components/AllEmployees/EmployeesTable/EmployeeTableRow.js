import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
// Material UI
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { translateGeneralStatus } from '../../../helper/string';
import ROUTES from '../../../helper/routes';

const styles = theme => ({
  tableRow: {
    height: 80,
    '&:hover': {
      transition: 'all 0.3s'
    }
  },
  notSelection: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brighterGrey
    }
  },
  selectionUnavailable: {
    backgroundColor: theme.palette.secondary.grey,
    cursor: 'auto'
  },
  selected: {
    backgroundColor: theme.palette.secondary.green
  },
  selectable: {
    cursor: 'cell'
  }
});

const EmployeeTableRow = ({
  classes,
  intl,
  employee: {
    id,
    firstName,
    lastName,
    department,
    position,
    scStatus,
    officeLocation,
    supervisorName,
    entryDate,
    endDate
  },
  formerEmployee,
  setSelectedEmployee
}) => {

  const handleDialogOpen = () => {
    window.history.pushState(null, null, `${ROUTES.EMPLOYEE_SC}/${id}`);
    setSelectedEmployee({
      id: id,
      firstName: firstName,
      lastName: lastName,
      supervisorName: supervisorName
    });
  };

  const employeeName = `${firstName} ${lastName}`;

  return (
    <Fragment>
      <TableRow className={`${classes.tableRow} ${classes.notSelection}`} onClick={handleDialogOpen}>
        <TableCell>{employeeName}</TableCell>
        <TableCell>{position}</TableCell>
        {!formerEmployee && (
          <TableCell>
            {scStatus
              ? intl.formatMessage({ id: translateGeneralStatus(scStatus) })
              : intl.formatMessage({ id: 'employeeInfo.noScStatus' })}
          </TableCell>
        )}
        {!formerEmployee && <TableCell>{supervisorName}</TableCell>}
        <TableCell>{department}</TableCell>
        <TableCell>{officeLocation}</TableCell>
        <TableCell>
          {formerEmployee
            ? formatLocaleDateTime(endDate, FRONTEND_DATE_FORMAT)
            : formatLocaleDateTime(entryDate, FRONTEND_DATE_FORMAT)}
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeTableRow));
