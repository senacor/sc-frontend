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

  translateReason = reason => {
    switch (reason) {
      case 'maternityLeave':
        return 'Mutterschutz';
      case 'parentalLeave':
        return 'Elternzeit';
      case 'sabbatical':
        return 'Forschungsurlaub';
      case 'unpaidLeave':
        return 'Unbezahlter Urlaub';
      default:
        return 'Unbezahlter Urlaub';
    }
  };

  flatmap = (f, xs) => {
    return xs.reduce((acc, x) => acc.concat(f(x)), []);
  };

  addAllValues = pr => {
    const keys = Object.keys(pr.employee.employment.leaves);
    const values = Object.values(pr.employee.employment.leaves);
    return [
      {
        validFrom: pr.employee.employment.endOfProbationPeriod,
        reason: 'Ende der Probezeit'
      }
    ]
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
        this.flatmap(
          value =>
            value.map(entry => {
              return {
                validFrom: entry.from,
                validTo: entry.to,
                reason: this.translateReason(keys[values.indexOf(value)])
              };
            }),
          values
        )
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
              <TableCell colSpan={2}>Gehalt seit:</TableCell>
              <TableCell colSpan={2}>OTE:</TableCell>
              <TableCell numeric>FTE:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allValues
              .sort(
                (a, b) =>
                  (a.validTo ? a.validTo : a.validFrom) <
                  (b.validTo ? b.validTo : b.validFrom)
              )
              .map(value => {
                return (
                  <TableRow
                    key={allValues.indexOf(value)}
                    className={
                      allValues.indexOf(value) % 2 === 0 ? classes.tableRow : ''
                    }
                  >
                    {value.validTo ? (
                      <TableCell colSpan={2}>
                        {`${moment(value.validFrom).format(
                          'DD.MM.YY'
                        )} - ${moment(value.validTo).format('DD.MM.YY')}`}{' '}
                      </TableCell>
                    ) : (
                      <TableCell colSpan={2}>
                        {moment(value.validFrom).format('DD.MM.YY')}
                      </TableCell>
                    )}
                    {value.ote ? (
                      <TableCell colSpan={2}>{value.ote}</TableCell>
                    ) : (
                      <TableCell colSpan={2}>{value.reason}</TableCell>
                    )}
                    {value.fte ? (
                      <TableCell numeric>{value.fte}</TableCell>
                    ) : (
                      <TableCell />
                    )}
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
