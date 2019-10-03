import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = () => ({});

const PrsTodoHrTable = ({ classes, intl, prs }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {intl.formatMessage({ id: 'meetingcreator.employee' })}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {prs.map(pr => {
          const employeeName = `${pr.employeeFirstName} ${pr.employeeLastName}`;
          return (
            <TableRow key={pr.prId}>
              <TableCell>{employeeName}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default injectIntl(withStyles(styles)(PrsTodoHrTable));
