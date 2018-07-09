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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  appointmentEmployeeDiv: {
    borderRadius: 10,
    background: '#4d8087',
    width: 70,
    height: 40,
    position: 'absolute',
    left: 100
  },
  appointmentReviewerDiv: {
    borderRadius: 10,
    background: '#4d8087',
    width: 70,
    height: 40,
    position: 'absolute',
    left: 175
  },
  appointmentSupervisorDiv: {
    borderRadius: 10,
    background: '#4d8087',
    width: 70,
    height: 40,
    position: 'absolute',
    left: 250
  },
  list: {
    textAlign: 'left'
  },
  listItem: {
    height: 40
  },
  divider: {
    position: 'relative',
    top: -20,
    left: 50,
    height: 1,
    margin: 0,
    border: 'none',
    flexShrink: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  hours: {
    position: 'relative',
    top: -10
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
          <Grid item xs={12} lg={3} sm={6}>
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
          <Grid item xs={12} lg={9} sm={6}>
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
        <div
          ref={divElement => (this.divElement = divElement)}
          style={{ position: 'relative', top: 50 }}
        >
          <div className={classes.list}>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>8:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>8:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>9:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>9:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>10:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 70 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>10:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>11:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>11:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>12:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>12:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>13:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
            <div className={classes.listItem}>
              <Typography className={classes.hours}>13:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - 50 }}
              />
            </div>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <div
              id={'availabilityEmployee'}
              className={classes.appointmentEmployeeDiv}
              style={{ top: 0 }}
            />
            <div
              id={'availabilityReviewer'}
              className={classes.appointmentReviewerDiv}
              style={{ top: 6 * this.state.tableHeight / 12 }}
            />
            <div
              id={'availabilitySupervisor'}
              className={classes.appointmentSupervisorDiv}
              style={{ top: 2 * this.state.tableHeight / 12 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

AvailabilityView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AvailabilityView);
