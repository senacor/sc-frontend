import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';

const marginLeft = 50;
const timeTableListHeight = 40;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  datePicker: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  appointmentDiv: {
    borderRadius: 10,
    background: '#4d8087',
    height: timeTableListHeight,
    position: 'absolute'
  },
  timeTable: {
    height: timeTableListHeight
  },
  timeTableDiv: {
    '@media (min-Width: 1000px)': { width: '75%' },
    '@media (min-Width: 1500px)': { width: '50%' },
    '@media (min-Width: 1800px)': { width: '40%' }
  },
  divider: {
    position: 'relative',
    top: -20,
    left: '7%',
    height: 1,
    margin: 0,
    border: 'none',
    flexShrink: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.12)'
  },
  hours: {
    position: 'relative',
    top: -10
  }
});

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHeight: 0,
      tableWidth: 0,
      reviewer: {
        id: 2,
        show: false,
        appointmentStart: 0,
        appointmentDuration: 0
      },
      supervisor: {
        id: 3,
        show: false,
        appointmentStart: 0,
        appointmentDuration: 0
      },
      employee: {
        id: 1,
        show: false,
        appointmentStart: 0,
        appointmentDuration: 0
      }
    };
  }

  getAppointments(json, employeeId) {
    let i;
    let appointments = [];
    for (i = 0; i < 3; i++) {
      if (
        json._embedded.exchangeOutlookResponseList[i].employeeId ===
        employeeId.toString()
      ) {
        let responseList =
          json._embedded.exchangeOutlookResponseList[i]
            .exchangeOutlookAppointmentResponse;
        for (let j in responseList) {
          let appointment = [
            responseList[j].appointmentStartTime,
            responseList[j].appointmentEndTime
          ];
          appointments[j] = appointment;
          console.log(appointment);
        }
        return appointments;
      }
    }
  }

  getAppointmentStartAndDuration(name) {
    let jsonFile = require('./test.json');
    let id = this.state[name].id;
    let appointments = this.getAppointments(jsonFile, id);
    console.log(appointments);
    let defaultDate = new Date('2018-06-14T08:00');
    if (appointments[0] === undefined) {
      let newState = this.state[name];
      newState.show = true;
      this.setState({ [name]: newState });
      return;
    }
    let startDate = new Date(appointments[0][0]);
    let endDate = new Date(appointments[0][1]);
    let startHours = startDate.getHours();
    let endHours = endDate.getHours();
    let startMinutes = startDate.getMinutes();
    let endMinutes = endDate.getMinutes();
    let startMinutesSinceEight = 0;
    let endMinutesSinceEight = 0;
    if (startDate >= defaultDate) {
      startMinutesSinceEight = (startHours - 8) * 60 + startMinutes;
    }
    if (endDate <= defaultDate.setHours(defaultDate.getHours() + 11.5)) {
      endMinutesSinceEight = (endHours - 8) * 60 + endMinutes;
    } else if (endDate > defaultDate.setHours(defaultDate.getHours() + 11.5)) {
      endMinutesSinceEight = 11.5 * 60;
    }
    console.log(startHours, startMinutes, endHours, endMinutes);
    let newState = this.state[name];
    newState.show = true;
    newState.appointmentStart = startMinutesSinceEight;
    newState.appointmentDuration =
      endMinutesSinceEight - startMinutesSinceEight;
    this.setState({ [name]: newState });
    console.log('logging');
  }

  handleToggle = name => {
    return event => {
      this.setState({ [name]: event.target.checked });
      let newState = this.state[name];
      if (this.state[name].show === false) {
        this.getAppointmentStartAndDuration(name);
      } else {
        newState.show = false;
        newState.appointmentStart = 0;
        newState.appointmentDuration = 0;
        this.setState({ [name]: newState });
      }
    };
  };

  createTimeTable(classes) {
    const timeTable = [];
    for (let hour = 8; hour <= 19; hour++) {
      [':00', ':30'].forEach(minutes => {
        timeTable.push(
          <div className={classes.timeTable}>
            <Typography className={classes.hours}>
              {hour.toString() + minutes}
            </Typography>
            <hr className={classes.divider} style={{ maxWidth: '93%' }} />
          </div>
        );
      });
    }
    return timeTable;
  }

  createAppointmentDiv(classes, person) {
    const appointmentDiv = [];
    const personPosition = new Map();
    personPosition.set('employee', '15.5%');
    personPosition.set('reviewer', '46.5%');
    personPosition.set('supervisor', '77.5%');
    appointmentDiv.push(
      <div
        id={'availabilitySupervisor'}
        className={classes.appointmentDiv}
        style={{
          left: personPosition.get(person),
          top: (this.state[person].appointmentStart / 60 / 12) * 100 + '%',
          width: '15.5%',
          height:
            (timeTableListHeight * this.state[person].appointmentDuration) / 30
        }}
      />
    );
    return appointmentDiv;
  }

  render() {
    const { classes } = this.props;

    let timeTable = this.createTimeTable(classes);

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
                      checked={this.state.employee.show}
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
                      checked={this.state.reviewer.show}
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
                      checked={this.state.supervisor.show}
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
                defaultValue="2018-06-14T10:30"
                className={classes.datePicker}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </Grid>
        </Grid>
        <div
          className={classes.timeTableDiv}
          style={{ position: 'relative', top: 50 }}
        >
          <div>{timeTable}</div>
          {this.createAppointmentDiv(classes, 'employee')}
          {this.createAppointmentDiv(classes, 'reviewer')}
          {this.createAppointmentDiv(classes, 'supervisor')}
        </div>
      </div>
    );
  }
}

AvailabilityView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AvailabilityView);
