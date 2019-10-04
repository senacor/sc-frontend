import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { modifyString } from '../../../helper/string';
import { linkToPr } from '../../../calls/pr';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  employeeNameCell: { maxWidth: 100 }
});

const PrsInProgressTable = ({ classes, intl, prs, history }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {intl.formatMessage({ id: 'meetingcreator.employee' })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({ id: 'employeeInfo.startDate' })}
          </TableCell>
          <TableCell>{intl.formatMessage({ id: 'pr.occasion' })}</TableCell>
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
              <TableCell className={classes.employeeNameCell}>
                {employeeName}
              </TableCell>
              <TableCell>
                {formatLocaleDateTime(pr.startDate, FRONTEND_DATE_FORMAT)}
              </TableCell>
              <TableCell>{modifyString(pr.prOccasion)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PrsInProgressTable)));
