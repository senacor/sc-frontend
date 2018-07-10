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
  divider: {
    position: 'relative',
    top: -20,
    left: marginLeft,
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
        show: false,
        appointmentStart: 0,
        appointmentDuration: 0
      },
      supervisor: {
        show: false,
        appointmentStart: 0,
        appointmentDuration: 0
      },
      employee: {
        show: false,
        appointmentStart: 0,
        appointmentDuration: 0
      }
    };
  }

  componentDidMount() {
    const tableHeight = this.divElement.clientHeight;
    this.setState({ tableHeight });
    console.log('height :', tableHeight);
    const tableWidth = this.divElement.clientWidth;
    this.setState({ tableWidth });
    console.log('width :', tableWidth);
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
    let appointments = this.getAppointments(jsonFile, 1);
    let startDate = new Date(appointments[0][0]);
    let endDate = new Date(appointments[0][1]);
    let startHours = startDate.getHours();
    let endHours = endDate.getHours();
    let startMinutes = startDate.getMinutes();
    let endMinutes = endDate.getMinutes();
    let startMinutesSinceEight = (startHours - 8) * 60 + startMinutes;
    let endMinutesSinceEight = (endHours - 8) * 60 + endMinutes;
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
                defaultValue="2017-05-24T10:30"
                className={classes.datePicker}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </Grid>
        </Grid>
        <div
          ref={divElement => (this.divElement = divElement)}
          style={{ position: 'relative', top: 50, maxWidth: 650 }}
        >
          <div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>8:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>8:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>9:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>9:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>10:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>10:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>11:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>11:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>12:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>12:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>13:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>13:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <div
              id={'availabilityEmployee'}
              className={classes.appointmentDiv}
              style={{
                left: (this.state.tableWidth / 6) * 0.5 + marginLeft,
                top:
                  ((this.state.employee.appointmentStart / 60) *
                    this.state.tableHeight) /
                  6,
                width: (this.state.tableWidth - marginLeft) / 6,
                height:
                  (timeTableListHeight *
                    this.state.employee.appointmentDuration) /
                  30
              }}
            />
            <div
              id={'availabilityReviewer'}
              className={classes.appointmentDiv}
              style={{
                left:
                  ((this.state.tableWidth - marginLeft) / 6) * 2.5 + marginLeft,
                top:
                  ((this.state.reviewer.appointmentStart / 60) *
                    this.state.tableHeight) /
                  6,
                width: (this.state.tableWidth - marginLeft) / 6,
                height:
                  (timeTableListHeight *
                    this.state.reviewer.appointmentDuration) /
                  30
              }}
            />
            <div
              id={'availabilitySupervisor'}
              className={classes.appointmentDiv}
              style={{
                left:
                  ((this.state.tableWidth - marginLeft) / 6) * 4.5 + marginLeft,
                top:
                  ((this.state.supervisor.appointmentStart / 60) *
                    this.state.tableHeight) /
                  6,
                width: (this.state.tableWidth - marginLeft) / 6,
                height:
                  (timeTableListHeight *
                    this.state.supervisor.appointmentDuration) /
                  30
              }}
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
