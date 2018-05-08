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

  addAllValues = pr => {
    return [
      {
        validFrom: pr.employee.employment.endOfProbationPeriod,
        ursache: 'Ende der Probezeit'
      }
    ]
      .concat(
        pr.employee.employment.leaves.maternityLeave.map(maternityLeave => {
          return {
            validFrom: maternityLeave.from,
            ursache: 'Mutterschtz',
            validTo: maternityLeave.to
          };
        })
      )
      .concat(
        pr.employee.salaries.map(salary => {
          return {
            validFrom: salary.validFrom,
            ote: salary.ote,
            fte: salary.fte
          };
        })
      )
      .concat(
        pr.employee.employment.leaves.parentalLeave.map(parentalLeave => {
          return {
            validFrom: parentalLeave.from,
            ursache: 'Elternzeit',
            validTo: parentalLeave.to
          };
        })
      )
      .concat(
        pr.employee.employment.leaves.sabbatical.map(sabbatical => {
          return {
            validFrom: sabbatical.from,
            ursache: 'Forschungsurlaub',
            validTo: sabbatical.to
          };
        })
      )
      .concat(
        pr.employee.employment.leaves.unpaidLeave.map(unpaidLeave => {
          return {
            validFrom: unpaidLeave.from,
            ursache: 'Unbezahlter Urlaub',
            validTo: unpaidLeave.to
          };
        })
      );
  };

  render() {
    const { prById, classes } = this.props;
    const allValues = this.addAllValues(prById);
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
            {allValues.sort((a, b) => a.validFrom < b.validFrom).map(value => {
              return (
                <TableRow
                  key={allValues.indexOf(value)}
                  className={
                    allValues.indexOf(value) === 0 ? classes.tableRow : ''
                  }
                >
                  {value.ote ? (
                    <TableCell>
                      {moment(value.validFrom).format('DD.MM.YY')}
                    </TableCell>
                  ) : (
                    <TableCell>
                      {`${moment(value.validFrom).format(
                        'DD.MM.YY'
                      )} - ${moment(value.validTo).format('DD.MM.YY')}`}{' '}
                    </TableCell>
                  )}
                  {value.ote ? (
                    <TableCell>{value.ote}</TableCell>
                  ) : (
                    <TableCell>{value.ursache}</TableCell>
                  )}
                  {value.fte ? <TableCell>{value.fte}</TableCell> : ''}
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
