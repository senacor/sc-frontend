import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appointmentEmployee: {
    width: 60,
    height: 60,
    borderRadius: 10,
    background: '#4d8087'
  },
  appointmentReviewer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    background: '#4d8087'
  },
  appointmentSupervisor: {
    width: 60,
    height: 60,
    borderRadius: 10,
    background: '#4d8087'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  table: {
    maxWidth: 500
  },
  tableCell: {
    backgroundColor: '#4d8087',
    maxWidth: 50
  },
  appointmentEmployeeDiv: {
    borderRadius: 10,
    background: '#4d8087',
    border: '0px solid #000000',
    width: 50,
    height: 50,
    position: 'relative'
  },
  appointmentReviewerDiv: {
    borderRadius: 10,
    background: '#4d8087',
    border: '0px solid #000000',
    width: 50,
    height: 50,
    position: 'relative'
  },
  appointmentSupervisorDiv: {
    borderRadius: 10,
    background: '#4d8087',
    border: '0px solid #000000',
    width: 50,
    height: 50,
    position: 'relative'
  },
  list: {
    height: '100%',
    minWidth: 400,
    display: 'inline'
  },
  listItem: {
    height: 30,
    width: 100
  },
  timeTable: {
    align: 'center',
    width: '100%',
    position: 'relative',
    top: 20,
    left: 10
  },
  hours: {
    height: 30,
    width: 50
  },
  divider: {
    maxWidth: 350,
    position: 'relative',
    bottom: 20
  }
});

class AvailabilityView extends React.Component {
  state = {
    employee: true,
    reviewer: false,
    supervisor: true,
    maxWidth: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      tableHeight: 0,
      tableWidth: 0
    };
  }

  componentDidMount() {
    const tableHeight = this.divElement.clientHeight;
    this.setState({ tableHeight });
    console.log('height :', tableHeight);
    const tableWidth = this.divElement.clientWidth;
    this.setState({ tableWidth });
    console.log('width :', tableWidth);
    const boundingRect = this.divElement.getBoundingClientRect;
    const tableTop = boundingRect.top;
    console.log('top :', tableTop);
  }

  handleToggle = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div id={'outer'} className={classes.root}>
        <Typography variant="headline">Terminfindung</Typography>
        <Grid id={'tableRolePick'} container spacing={24}>
          <Grid item xs={12} sm={3}>
            <Table>
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
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} sm={9}>
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
          </Grid>
        </Grid>
        <div ref={divElement => (this.divElement = divElement)}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <List className={classes.list} align="right">
                    <ListItem className={classes.listItem} align="right">
                      <Typography className={classes.hours}>8:00</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>8:30</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>9:00</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>9:30</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>10:00</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>10:30</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>11:00</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>11:30</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>12:00</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>12:30</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>13:00</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                    <ListItem className={classes.listItem}>
                      <Typography className={classes.hours}>13:30</Typography>
                    </ListItem>
                    <Divider
                      className={classes.divider}
                      style={{ maxWidth: this.state.tableWidth - 15 }}
                    />
                  </List>
                </TableCell>
                <TableCell style={{ verticalAlign: 'top' }}>
                  <div
                    id={'availabilityEmployee'}
                    className={classes.appointmentEmployeeDiv}
                    style={{ top: 0 }}
                  />
                </TableCell>
                <TableCell style={{ verticalAlign: 'top' }}>
                  <div
                    id={'availabilityReviewer'}
                    className={classes.appointmentReviewerDiv}
                    style={{ top: 1 * this.state.tableHeight / 14 }}
                  />
                </TableCell>
                <TableCell style={{ verticalAlign: 'top' }}>
                  <div
                    id={'availabilitySupervisor'}
                    className={classes.appointmentSupervisorDiv}
                    style={{ top: 2 * this.state.tableHeight / 14 }}
                  />
                </TableCell>
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
