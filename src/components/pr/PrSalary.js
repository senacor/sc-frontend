import React from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles/index';

const styles = theme => ({
  tableRow: {
    backgroundColor: theme.palette.primary['50'],
    width: '100%'
  },
  table: {
    tableLayout: 'fixed',
    width: '100%'
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
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Gehalt seit:</TableCell>
                <TableCell>OTE:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prById.employee.salaries
                .sort((a, b) => a.validFrom < b.validFrom)
                .map(salary => {
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
                      <TableCell>
                        {salary.fte === 1 ? (
                          ''
                        ) : (
                          <Typography>
                            <Icon>priority_high</Icon>
                            {`fte = ${salary.fte}`}
                          </Typography>
                        )}
                      </TableCell>
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
