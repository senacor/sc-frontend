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
    id,
    firstName,
    lastName,
    competenceCenter,
    currentPosition,
    currentCst,
    officeLocation,
    dateOfNextPr,
    supervisorName,
    hasOpenedPr
  }
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const employeeName = `${firstName} ${lastName}`;
  let bgClass = '';
  let onRowClick = handleDialogOpen;

  return (
    <Fragment>
      <TableRow
        className={`${classes.tableRow} ${bgClass}`}
        onClick={onRowClick}
      >
        <TableCell>{employeeName}</TableCell>
        <TableCell>{currentPosition}</TableCell>
        <TableCell>{currentCst}</TableCell>
        <TableCell>{supervisorName}</TableCell>
        <TableCell>{competenceCenter}</TableCell>
        <TableCell>{officeLocation}</TableCell>
        <TableCell>
          {formatLocaleDateTime(dateOfNextPr, FRONTEND_DATE_FORMAT)}
        </TableCell>
      </TableRow>
      {dialogOpen &&
        {
          /* TODO: add SCs view*/
        }}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeTableRow));
