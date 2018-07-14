import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment';

const timeTableListHeight = 25;
const firstHourOfDay = 8;
const lastHourOfDay = 19;
const minuteGranularity = 30;
const timeTableHours = lastHourOfDay - firstHourOfDay;
let divIds = 0;

const styles = theme => ({
  timeTableDiv: {
    position: 'relative',
    padding: 0,
    margin: 0,
    '@media (min-Width: 1000px)': { width: '75%' },
    '@media (min-Width: 1500px)': { width: '50%' },
    '@media (min-Width: 1800px)': { width: '40%' }
  },
  divider: {
    height: 1,
    margin: 0,
    marginLeft: '7%',
    marginBottom: timeTableListHeight - 1,
    padding: 0,
    border: 'none',
    flexShrink: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.12)'
  },
  hours: {
    position: 'absolute'
  },
  appointmentDiv: {
    width: '15.5%',
    borderRadius: 10,
    background: theme.palette.primary['300'],
    position: 'absolute'
  },
  hourLabel: {
    position: 'relative',
    top: -timeTableListHeight / 2
  },
  hourLabelText: {
    lineHeight: timeTableListHeight + 'px'
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

  render() {
    const {
      classes,
      appointmentsEmployee,
      appointmentsReviewer,
      appointmentsSupervisor
    } = this.props;

    const dividers = this.createDividers(classes);
    const hourLables = this.createHourLables(classes);
    const appointmentDivs = this.createAppointmentDivs(
      classes,
      appointmentsEmployee,
      appointmentsReviewer,
      appointmentsSupervisor
    );

    return (
      <div className={classes.timeTableDiv}>
        {dividers}
        {hourLables}
        {appointmentDivs}
      </div>
    );
  }

  createDividers(classes) {
    const dividers = [];
    for (
      let hour = moment()
        .hour(firstHourOfDay)
        .minutes(0);
      hour <=
      moment()
        .hour(lastHourOfDay)
        .minutes(0);
      hour.add(minuteGranularity, 'm')
    ) {
      dividers.push(
        <hr
          className={classes.divider}
          key={'divider' + hour.toString()} //needs an unique key
        />
      );
    }
    return dividers;
  }

  createHourLables(classes) {
    const hourLables = [];
    for (
      let hour = moment()
        .hour(firstHourOfDay)
        .minutes(0);
      hour <=
      moment()
        .hour(lastHourOfDay)
        .minutes(0);
      hour.add(minuteGranularity, 'm')
    ) {
      hourLables.push(
        <div
          className={classes.hours}
          style={{ top: this.calculatePositionFor(hour).toString() + '%' }}
          key={'hourLable' + hour.toString()} //needs an unique key
        >
          <div className={classes.hourLabel}>
            <Typography className={classes.hourLabelText}>
              {hour.format('HH:mm')}
            </Typography>
          </div>
        </div>
      );
    }
    return hourLables;
  }

  createAppointmentDivs(
    classes,
    appointmentsEmployee,
    appointmentsReviewer,
    appointmentsSupervisor
  ) {
    let appointmentDivs = [];
    let filteredAppointmentsEmployee = this.appointmentsFilter(
      appointmentsEmployee
    );
    let filteredAppointmentsReviewer = this.appointmentsFilter(
      appointmentsReviewer
    );
    let filteredAppointmentsSupervisor = this.appointmentsFilter(
      appointmentsSupervisor
    );
    for (let i = 0; i < filteredAppointmentsEmployee.length; i++) {
      appointmentDivs.push(
        this.createSingleAppointmentDiv(
          'employee',
          filteredAppointmentsEmployee[i],
          classes
        )
      );
    }
    for (let i = 0; i < filteredAppointmentsReviewer.length; i++) {
      appointmentDivs.push(
        this.createSingleAppointmentDiv(
          'reviewer',
          filteredAppointmentsReviewer[i],
          classes
        )
      );
    }
    for (let i = 0; i < filteredAppointmentsSupervisor.length; i++) {
      appointmentDivs.push(
        this.createSingleAppointmentDiv(
          'supervisor',
          filteredAppointmentsSupervisor[i],
          classes
        )
      );
    }
    return appointmentDivs;
  }

  appointmentsFilter(appointments) {
    let startSelectedDay = moment(this.props.selectedDay).hours(firstHourOfDay);
    let endSelectedDay = moment(this.props.selectedDay).hours(lastHourOfDay);
    return appointments.filter(appointment => {
      let startAppointment = moment(appointment[0]);
      let endAppointment = moment(appointment[1]);
      //exclude appointments that are completely before or after the time window to be displayed (in that case, an empty array will be returned)
      if (
        startAppointment.isBefore(endSelectedDay) &&
        endAppointment.isAfter(startSelectedDay)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  createSingleAppointmentDiv(person, appointment, classes) {
    const personPosition = new Map();
    personPosition.set('employee', '15.5%');
    personPosition.set('reviewer', '46.5%');
    personPosition.set('supervisor', '77.5%');
    if (divIds > 1000) {
      divIds = 0;
    } else {
      divIds++;
    }
    let topPosition = this.transformAppointmentTimeToPercent(appointment[0]);
    let length =
      this.transformAppointmentTimeToPercent(appointment[1]) - topPosition;
    if (appointment) {
      return (
        <div
          key={'availability' + person + divIds.toString()} //needs an unique key
          className={classes.appointmentDiv}
          style={{
            left: personPosition.get(person),
            top: topPosition.toString() + '%',
            height: length.toString() + '%'
          }}
        />
      );
    }
  }

  calculatePositionFor(time) {
    let startMinutesSinceFirstHour =
      time.hours() * 60 + time.minutes() - firstHourOfDay * 60;
    let relativePosition =
      (startMinutesSinceFirstHour / (timeTableHours * 60)) * 100;
    return relativePosition;
  }

  //Calculate here the relative position of a div or the relative time in percent to calculate the appointments length.
  //Takes a moment object as an argument - the start or the end moment of an appointment.
  transformAppointmentTimeToPercent(appointment) {
    let appointmentMoment = moment(appointment);
    let startOfSelectedDay = moment(this.props.selectedDay).hour(
      firstHourOfDay
    );
    let endOfSelectedDay = moment(this.props.selectedDay).hour(lastHourOfDay);
    //For Appointments inside the time window:
    if (
      appointmentMoment.isAfter(startOfSelectedDay) &&
      appointmentMoment.isBefore(endOfSelectedDay)
    ) {
      return this.calculatePositionFor(appointmentMoment);
    }
    //For appointments that end after the time window the size is 100%. The appointments that could start after the time
    // window were already filtered before by appointmentsFilter():
    if (appointmentMoment.isAfter(endOfSelectedDay)) {
      return 100;
    }
    //For appointments that start before the time window, the relative positioning is 0. The appointments that could end
    // before the time window were already filtered before by appointmentsFilter():
    else {
      return 0;
    }
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
