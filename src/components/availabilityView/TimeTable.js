import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';

const timeTableListHeight = 40;
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
      appointmentsSupervisor: props.appointmentsSupervisor
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
    if (appointment) {
      return (
        <div
          key={'availability' + person + divIds.toString()} //needs an unique key
          className={classes.appointmentDiv}
          style={{
            left: personPosition.get(person),
            top: (appointment[0] / 60 / (timeTableHours + 0.5)) * 100 + '%',
            width: '15.5%',
            height: (timeTableListHeight * appointment[1]) / 30
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
    if (appointments === undefined) {
      return;
    }
    let startDate = new Date(appointments[0]);
    let endDate = new Date(appointments[1]);
    console.log(appointments);
    let startHourAppointment = startDate.getHours();
    let endHourAppointment = endDate.getHours();
    let startMinutes = startDate.getMinutes();
    let endMinutes = endDate.getMinutes();
    let startMinutesSinceFirstHour = 0;
    let endMinutesSinceFirstHour = 0;
    if (
      startHourAppointment < lastHourOfDay &&
      endHourAppointment > firstHourOfDay
    ) {
      if (startHourAppointment <= firstHourOfDay) {
        startMinutesSinceFirstHour = 0;
      } else {
        startMinutesSinceFirstHour =
          (startHourAppointment - firstHourOfDay) * 60 + startMinutes;
      }
      if (endHourAppointment <= lastHourOfDay) {
        endMinutesSinceFirstHour =
          (endHourAppointment - firstHourOfDay) * 60 + endMinutes;
      } else {
        endMinutesSinceFirstHour = timeTableHours * 60;
      }
      let appointmentStartAndDuration = [
        startMinutesSinceFirstHour,
        endMinutesSinceFirstHour - startMinutesSinceFirstHour
      ];
      console.log(appointmentStartAndDuration);
      return appointmentStartAndDuration;
    }
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
  appointmentsSupervisor: PropTypes.array.isRequired
};
TimeTable.defaultProps = {
  appointmentsEmployee: [],
  appointmentsReviewer: [],
  appointmentsSupervisor: []
};
export default withStyles(styles)(TimeTable);
