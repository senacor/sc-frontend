import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
  tableRow: {
    backgroundColor: theme.palette.primary['50'],
    width: '100%'
  },
  table: {
    tableLayout: 'fixed',
    width: '100%',
    marginBottom: '1px'
  }
});

class PrSalary extends React.Component {
  render() {
    const { prDetail, classes } = this.props;

    return (
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Gehalt seit:</TableCell>
              <TableCell colSpan={2}>OTE:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prDetail.employee.salaries ? (
              prDetail.employee.salaries
                .sort((a, b) => a.validFrom < b.validFrom)
                .map(value => {
                  return (
                    <TableRow
                      key={prDetail.employee.salaries.indexOf(value)}
                      className={
                        prDetail.employee.salaries.indexOf(value) % 2 === 0
                          ? classes.tableRow
                          : ''
                      }
                    >
                      <TableCell colSpan={2}>
                        {moment(value.validFrom).format('DD.MM.YY')}
                      </TableCell>

                      <TableCell colSpan={2}>{value.ote}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow />
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(PrSalary);
