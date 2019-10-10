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

const FormerEmployeeTableRow = ({
  classes,
  employee: {
    id,
    firstName,
    lastName,
    competence,
    position,
    cst,
    officeLocation,
    endDate,
    supervisor
  }
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

  return (
    <Fragment>
      <TableRow
        className={`${classes.tableRow} ${bgClass}`}
        onClick={onRowClick}
      >
        <TableCell>{employeeName}</TableCell>
        <TableCell>{position}</TableCell>
        <TableCell>{cst}</TableCell>
        <TableCell>{supervisor}</TableCell>
        <TableCell>{competence}</TableCell>
        <TableCell>{officeLocation}</TableCell>
        <TableCell>
          {formatLocaleDateTime(endDate, FRONTEND_DATE_FORMAT)}
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

export default injectIntl(withStyles(styles)(FormerEmployeeTableRow));
