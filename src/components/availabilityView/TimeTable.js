import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment';

const timeTableListHeight = 25;
const firstHourOfDay = 8;
const lastHourOfDay = 19;
const timeTableTimeSteps = [':00', ':30'];
const timeTableHours = 11.5;
let divIds = 0;

const styles = theme => ({
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
  },
  appointmentDiv: {
    borderRadius: 10,
    background: '#4d8087',
    height: timeTableListHeight,
    position: 'absolute'
  }
});

class TimeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointmentsEmployee: props.appointmentsEmployee,
      appointmentsReviewer: props.appointmentsReviewer,
      appointmentsSupervisor: props.appointmentsSupervisor,
      selectedDay: props.selectedDay
    };
  }

  createTimeTable(classes) {
    const timeTable = [];
    for (let hour = firstHourOfDay; hour <= lastHourOfDay; hour++) {
      timeTableTimeSteps.forEach(minutes => {
        timeTable.push(
          <div
            className={classes.timeTable}
            key={'time' + hour.toString() + minutes} //needs an unique key
          >
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

  createSingleAppointmentDiv(person, appointment, classes) {
    console.log(appointment);
    const personPosition = new Map();
    personPosition.set('employee', '15.5%');
    personPosition.set('reviewer', '46.5%');
    personPosition.set('supervisor', '77.5%');
    if (divIds > 1000) {
      divIds = 0;
    } else {
      divIds++;
    }
    let height = 0;
    if (appointment[1] > 0) {
      height = (timeTableListHeight * appointment[1]) / 30;
    }
    if (appointment) {
      return (
        <div
          key={'availability' + person + divIds.toString()} //needs an unique key
          className={classes.appointmentDiv}
          style={{
            left: personPosition.get(person),
            top: (appointment[0] / 60 / (timeTableHours + 0.5)) * 100 + '%',
            width: '15.5%',
            height: height
          }}
        />
      );
    }
  }

  createAppointmentDivs(
    classes,
    appointmentsEmployee,
    appointmentsReviewer,
    appointmentsSupervisor
  ) {
    let appointmentDivs = [];
    for (let i = 0; i < appointmentsEmployee.length; i++) {
      appointmentDivs.push(
        this.createSingleAppointmentDiv(
          'employee',
          this.calculateAppointmentStartAndDuration(appointmentsEmployee[i]),
          classes
        ) //contains already the start and end
      );
    }
    for (let i = 0; i < appointmentsReviewer.length; i++) {
      appointmentDivs.push(
        this.createSingleAppointmentDiv(
          'reviewer',
          this.calculateAppointmentStartAndDuration(appointmentsReviewer[i]),
          classes
        )
      );
    }
    for (let i = 0; i < appointmentsSupervisor.length; i++) {
      appointmentDivs.push(
        this.createSingleAppointmentDiv(
          'supervisor',
          this.calculateAppointmentStartAndDuration(appointmentsSupervisor[i]),
          classes
        )
      );
    }
    return appointmentDivs;
  }

  calculateAppointmentStartAndDuration(appointments) {
    let appointmentStartAndDuration = [];
    let startAppointment = moment(appointments[0]);
    let endAppointment = moment(appointments[1]);
    let startSelectedDay = moment(this.props.selectedDay).hours(firstHourOfDay);
    let endSelectedDay = moment(this.props.selectedDay)
      .hours(lastHourOfDay)
      .minutes(30);
    let startMinutesSinceFirstHour = 0;
    let endMinutesSinceFirstHour = timeTableHours * 60;

    //exclude appointments that are completely before or after the time window to be displayed
    if (
      startAppointment.isBefore(endSelectedDay) &&
      endAppointment.isAfter(startSelectedDay)
    ) {
      //appointments starting before the time window start at the beginning of the time window (startMinutesSinceFirstHour = 0), all other start after that
      if (startAppointment.isAfter(startSelectedDay)) {
        startMinutesSinceFirstHour =
          (startAppointment.hours() - firstHourOfDay) * 60 +
          startAppointment.minutes();
      }
      //appointments ending after the time window end at the end of the time window (endMinutesSinceFirstHour = timeTableHours * 60), all other end before that
      if (endAppointment.isBefore(endSelectedDay)) {
        endMinutesSinceFirstHour =
          (endAppointment.hours() - firstHourOfDay) * 60 +
          endAppointment.minutes();
      }
    }
    return appointmentStartAndDuration.push(
      startMinutesSinceFirstHour,
      endMinutesSinceFirstHour - startMinutesSinceFirstHour
    );
  }

  render() {
    const {
      classes,
      appointmentsEmployee,
      appointmentsReviewer,
      appointmentsSupervisor
    } = this.props;

    const timeTable = this.createTimeTable(classes);
    const appointmentDivs = this.createAppointmentDivs(
      classes,
      appointmentsEmployee,
      appointmentsReviewer,
      appointmentsSupervisor
    );

    return (
      <div
        className={classes.timeTableDiv}
        style={{ position: 'relative', top: 50 }}
      >
        <div>{timeTable}</div>
        {appointmentDivs}
      </div>
    );
  }
}

TimeTable.propTypes = {
  appointmentsEmployee: PropTypes.array.isRequired,
  appointmentsReviewer: PropTypes.array.isRequired,
  appointmentsSupervisor: PropTypes.array.isRequired,
  selectedDay: PropTypes.string.isRequired
};
TimeTable.defaultProps = {
  appointmentsEmployee: [],
  appointmentsReviewer: [],
  appointmentsSupervisor: [],
  selectedDay: '2018-06-14'
};
export default withStyles(styles)(TimeTable);
