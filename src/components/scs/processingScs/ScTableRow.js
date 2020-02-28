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
import { withRouter } from 'react-router-dom';

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
  intl,
  classes,
  history,
  status,
  sc: { scId, employeeFirstName, employeeLastName, createdDate }
}) => {
  const linkToSc = id => {
    history.push(`/scDetail/${id}`);
  };

  return (
    <Fragment>
      <TableRow
        className={`${classes.tableRow} ${classes.notSelection}`}
        onClick={() => linkToSc(scId)}
      >
        <TableCell>{`${employeeLastName}, ${employeeFirstName}`}</TableCell>
        <TableCell>
          {formatLocaleDateTime(createdDate, FRONTEND_DATE_FORMAT)}
        </TableCell>
        <TableCell>{intl.formatMessage({ id: `${status}` })}</TableCell>
      </TableRow>
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(EmployeeTableRow)));
