import React from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import { withStyles } from 'material-ui/styles/index';

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
  constructor(props) {
    super(props);
    this.state = {
      prById: this.props.prById
    };
  }

  render() {
    const { prById } = this.props;
    const { classes } = this.props;

    return (
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Gehalt seit:</TableCell>
              <TableCell>OTE:</TableCell>
              <TableCell>FTE:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prById.employee.salaries
              .sort((a, b) => a.validFrom < b.validFrom)
              .map(salary => {
                return (
                  <TableRow
                    key={prById.employee.salaries.indexOf(salary)}
                    className={
                      prById.employee.salaries.indexOf(salary) === 0
                        ? classes.tableRow
                        : ''
                    }
                  >
                    <TableCell>
                      {moment(salary.validFrom).format('DD.MM.YY')}
                    </TableCell>
                    <TableCell>{salary.ote}</TableCell>
                    <TableCell>{salary.fte}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(PrSalary);
