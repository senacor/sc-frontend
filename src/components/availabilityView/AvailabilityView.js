import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
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
    maxWidth: 500
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
                <Typography variant="subheading">
                  Mitarbeiter
                </Typography>
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
                <Typography variant="subheading">
                  Bewerter
                </Typography>
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
                <Typography variant="subheading">
                  Vorgesetzter
                </Typography>
              </TableCell>
              <TableCell numeric>
                <Switch
                  checked={this.state.supervisor}
                  onChange={this.handleToggle('supervisor')}
                  color="primary"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(AvailabilityView);
