import React from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles/index';

const styles = theme => ({
  root: {
    width: '98%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto'
  },
  table: {
    width: '100%'
  },
  tableRow: {
    backgroundColor: theme.palette.primary['50']
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
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Gehalt seit: </TableCell>
                <TableCell>OTE:</TableCell>
                <TableCell>FTE:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prById.employee.salaries.map(salary => {
                return (
                  <TableRow
                    className={
                      prById.employee.salaries.indexOf(salary) === 0
                        ? classes.tableRow
                        : ''
                    }
                  >
                    <TableCell>{salary.validFrom}</TableCell>
                    <TableCell>{salary.ote}</TableCell>
                    <TableCell>{salary.fte}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(PrSalary);
