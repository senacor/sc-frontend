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
import EmployeesPRsDialog from '../EmployeesPRsDialog';

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
  },
  selection,
  selected,
  toggleSelected
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const employeeName = `${firstName} ${lastName}`;
  let bgClass = '';
  let onRowClick = handleDialogOpen;

  if (selection) {
    if (hasOpenedPr || !supervisorName) {
      bgClass = classes.selectionUnavailable;
      onRowClick = () => {};
    } else {
      onRowClick = () => toggleSelected(id);
      bgClass = selected ? classes.selected : classes.selectable;
    }
  } else {
    bgClass = classes.notSelection;
  }

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
      {dialogOpen && (
        <EmployeesPRsDialog
          firstName={firstName}
          lastName={lastName}
          employeeId={id}
          dialogOpen={dialogOpen}
          dialogClose={handleDialogClose}
        />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeTableRow));
