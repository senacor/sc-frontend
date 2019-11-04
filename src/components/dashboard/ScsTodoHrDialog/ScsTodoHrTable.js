import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { mapPosition } from '../../../helper/string';

// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { linkToSc } from '../../../calls/sc';

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

const ScsTodoHrTable = ({ classes, intl, scs, history }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {intl.formatMessage({ id: 'meetingcreator.employee' })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({ id: 'employeeInfo.department' })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({ id: 'employeeInfo.positionAbrv' })}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scs.map(sc => {
          const employeeName = `${sc.employeeFirstName} ${sc.employeeLastName}`;
          return (
            <TableRow
              key={sc.prId}
              onClick={() => linkToSc(sc.prId, history)}
              className={classes.tableRow}
            >
              <TableCell>{employeeName}</TableCell>
              <TableCell>{sc.department}</TableCell>
              <TableCell>{mapPosition(sc.employeePosition)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScsTodoHrTable)));
