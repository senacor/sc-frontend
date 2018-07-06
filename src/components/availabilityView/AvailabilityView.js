import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    width: '100%'
  },
  tableRolePick: {
    display: 'inline'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: 80,
    position: 'relative',
    top: 10
  },
  table: {
    maxWidth: 500
  },
  tableCell: {
    backgroundColor: '#4d8087',
    maxWidth: 50
  }
});

class AvailabilityView extends React.Component {
  state = {
    employee: true,
    reviewer: false,
    supervisor: true
  };

  handleToggle = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div id={'outer'}>
        <Typography variant="headline">Terminfindung</Typography>
        <div id={'tableRolePick'}>
          <Table className={classes.tableRolePick}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="subheading">Mitarbeiter</Typography>
                </TableCell>
                <TableCell numeric>
                  <Switch
                    checked={this.state.employee}
                    onChange={this.handleToggle('employee')}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subheading">Bewerter</Typography>
                </TableCell>
                <TableCell numeric>
                  <Switch
                    checked={this.state.reviewer}
                    onChange={this.handleToggle('reviewer')}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subheading">Vorgesetzter</Typography>
                </TableCell>
                <TableCell numeric>
                  <Switch
                    checked={this.state.supervisor}
                    onChange={this.handleToggle('supervisor')}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <form noValidate>
                  <TextField
                    id="datetime-local"
                    label="Terminvorschlag"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div id={'timeTable'}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell numeric>
                  <Typography variant="subheading">9:00</Typography>
                </TableCell>
                <TableCell className={classes.tableCell} />
                <TableCell />
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell numeric>
                  <Typography variant="subheading">9:30</Typography>
                </TableCell>
                <TableCell />
                <TableCell className={classes.tableCell} />
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell numeric>
                  <Typography variant="subheading">10:00</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell className={classes.tableCell} />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

AvailabilityView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AvailabilityView);
