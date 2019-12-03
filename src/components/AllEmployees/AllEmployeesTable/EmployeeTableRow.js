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
  employee: {
    firstName,
    lastName,
    department,
    currentPosition,
    scStatus,
    officeLocation,
    supervisorName,
    entryDate,
    exitDate
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
        <TableCell>{currentPosition}</TableCell>
        <TableCell>{scStatus}</TableCell>
        <TableCell>{supervisorName}</TableCell>
        <TableCell>{department}</TableCell>
        <TableCell>{officeLocation}</TableCell>
        <TableCell>
          {formerEmployee
            ? formatLocaleDateTime(exitDate, FRONTEND_DATE_FORMAT)
            : formatLocaleDateTime(entryDate, FRONTEND_DATE_FORMAT)}
        </TableCell>
      </TableRow>
      {dialogOpen && <div>TODO add dialog</div>}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeTableRow));
