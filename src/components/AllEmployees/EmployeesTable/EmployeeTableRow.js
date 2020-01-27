import React, { useState, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';

// Material UI
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { modifyString } from '../../../helper/string';
import EmployeeScsDialog from '../EmployeeScsDialog';

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
  formerEmployee
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const employeeName = `${firstName} ${lastName}`;

  return (
    <Fragment>
      <TableRow className={`${classes.tableRow}`} onClick={handleDialogOpen}>
        <TableCell>{employeeName}</TableCell>
        <TableCell>{position}</TableCell>
        {!formerEmployee && (
          <TableCell>
            {scStatus
              ? modifyString(scStatus)
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
