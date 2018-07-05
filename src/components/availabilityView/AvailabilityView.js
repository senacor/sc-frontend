import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 300,
    maxWidth: 400
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  tableCell: {
    backgroundColor: 'primary'
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
      <div class="float" className={classes.root}>
        <Table className={classes.table}>
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
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>
                <form className={classes.container} noValidate>
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
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell numeric>
                <Typography variant="subheading">9:00</Typography>
              </TableCell>
              <TableCell body={classes.tableCell}>
                <Typography variant="subheading" color="primary">9:00</Typography>
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell numeric>
                <Typography variant="subheading">9:30</Typography>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell numeric>
                <Typography variant="subheading">10:00</Typography>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(AvailabilityView);
