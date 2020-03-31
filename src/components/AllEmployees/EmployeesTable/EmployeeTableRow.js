import React, { Fragment, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
// Material UI
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { translateGeneralStatus } from '../../../helper/string';
import EmployeeFilter from '../../admin/EmployeeFilter';
import { changeSupervisor } from '../../../calls/employees';
import ROUTES from '../../../helper/routes';
import { JSS } from '../../../styles/jsStyles';

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
  user,
  info,
  error,
  currentSupervisors,
  setSelectedEmployee
}) => {
  const [supervisorNameState, setSupervisorNameState] = useState(
    supervisorName
  );

  const handleDialogOpen = () => {
    window.history.pushState(null, null, `${ROUTES.EMPLOYEE_SC}/${id}`);
    setSelectedEmployee({
      id: id,
      firstName: firstName,
      lastName: lastName,
      supervisorName: supervisorName
    });
  };

  const employeeName = `${lastName}, ${firstName}`;

  const handleChangeSupervisor = supervisor => {
    changeSupervisor(id, supervisor.id, info, error).then(() => {
      setSupervisorNameState(`${supervisor.firstName} ${supervisor.lastName}`);
    });
  };

  return (
    <Fragment>
      <TableRow
        className={`${classes.tableRow} ${classes.notSelection}`}
        onClick={handleDialogOpen}
      >
        <TableCell id={JSS.TOID.LASTNAME}>{employeeName}</TableCell>
        <TableCell id={JSS.TOID.POSITION}>{position}</TableCell>
        {!formerEmployee && (
          <TableCell id={JSS.TOID.SUPERVISOR}>
            <Typography>
              {user.hasRoleHr() ? (
                <EmployeeFilter
                  data={currentSupervisors}
                  supervisorName={
                    supervisorNameState
                      ? supervisorNameState
                      : intl.formatMessage({
                          id: 'employeeInfo.noSupervisor'
                        })
                  }
                  setSelectedEmployee={handleChangeSupervisor}
                />
              ) : (
                <span className={classes.textInfo}>
                  {supervisorName
                    ? supervisorName
                    : intl.formatMessage({ id: 'employeeInfo.noSupervisor' })}
                </span>
              )}
            </Typography>
          </TableCell>
        )}
        <TableCell id={JSS.TOID.DEPARTMENT}>{department}</TableCell>
        <TableCell id={JSS.TOID.OFFICE}>{officeLocation}</TableCell>
        <TableCell id={JSS.TOID.DATE}>
          {formerEmployee
            ? formatLocaleDateTime(endDate, FRONTEND_DATE_FORMAT)
            : formatLocaleDateTime(entryDate, FRONTEND_DATE_FORMAT)}
        </TableCell>
        {!formerEmployee && (
          <TableCell id={JSS.TOID.STATUS}>
            {scStatus
              ? intl.formatMessage({ id: translateGeneralStatus(scStatus) })
              : intl.formatMessage({ id: 'employeeInfo.noScStatus' })}
          </TableCell>
        )}
      </TableRow>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeTableRow));
