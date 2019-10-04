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
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      '&:hover': {
        backgroundColor: theme.palette.secondary.brightGrey
      }
    }
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

  const employeeName = `${firstName} ${lastName}`;

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <TableRow className={classes.tableRow} onClick={handleDialogOpen}>
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
