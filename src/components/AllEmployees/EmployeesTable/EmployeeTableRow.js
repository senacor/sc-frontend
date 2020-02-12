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
import EmployeeScsDialog from '../EmployeeScsDialog';
import EmployeeFilter from '../../admin/EmployeeFilter';
import { changeSupervisor } from '../../../calls/employees';

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
  currentSupervisors
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [supervisorNameState, setSupervisorNameState] = useState(
    supervisorName
  );

  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const employeeName = `${firstName} ${lastName}`;

  const handleChangeSupervisor = supervisor => {
    changeSupervisor(id, supervisor.id, info, error).then(() => {
      setSupervisorNameState(`${supervisor.firstName} ${supervisor.lastName}`);
    });
  };

  return (
    <Fragment>
      <TableRow className={`${classes.tableRow}`} onClick={handleDialogOpen}>
        <TableCell>{employeeName}</TableCell>
        <TableCell>{position}</TableCell>
        {!formerEmployee && (
          <TableCell>
            {scStatus
              ? intl.formatMessage({ id: translateGeneralStatus(scStatus) })
              : intl.formatMessage({ id: 'employeeInfo.noScStatus' })}
          </TableCell>
        )}
        <TableCell>
          {!formerEmployee && (
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
                <TableCell>
                  <span className={classes.textInfo}>
                    {supervisorName
                      ? supervisorName
                      : intl.formatMessage({ id: 'employeeInfo.noSupervisor' })}
                  </span>
                </TableCell>
              )}
            </Typography>
          )}
        </TableCell>
        <TableCell>{department}</TableCell>
        <TableCell>{officeLocation}</TableCell>
        <TableCell>
          {formerEmployee
            ? formatLocaleDateTime(endDate, FRONTEND_DATE_FORMAT)
            : formatLocaleDateTime(entryDate, FRONTEND_DATE_FORMAT)}
        </TableCell>
      </TableRow>
      {dialogOpen && (
        <EmployeeScsDialog
          employeeId={id}
          firstName={firstName}
          lastName={lastName}
          supervisorName={supervisorName}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeTableRow));
