import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { modifyString } from '../../../helper/string';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';

// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { linkToPr } from '../../../calls/pr';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  }
});

const PrsTodoHrTable = ({ classes, intl, prs, history }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {intl.formatMessage({ id: 'meetingcreator.employee' })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({ id: 'prdetailinformation.occasion' })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({ id: 'employeeInfo.startDate' })}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {prs.map(pr => {
          const employeeName = `${pr.employeeFirstName} ${pr.employeeLastName}`;
          return (
            <TableRow
              key={pr.prId}
              onClick={() => linkToPr(pr.prId, null, history)}
              className={classes.tableRow}
            >
              <TableCell>{employeeName}</TableCell>
              <TableCell>{modifyString(pr.prOccasion)}</TableCell>
              <TableCell>
                {formatLocaleDateTime(pr.startDate, FRONTEND_DATE_FORMAT)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PrsTodoHrTable)));
