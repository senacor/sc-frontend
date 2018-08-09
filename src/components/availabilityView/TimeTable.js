import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles/index';
import moment from 'moment-timezone';
import {connect} from 'react-redux';
import {getSelectedDate} from '../../reducers/selector';

const timeTableListHeight = 25;
const minutesPerHour = 60;
const firstHourOfDayInGermany = 8;
const lastHourOfDayInGermany = 19;
const timeTableHoursInGermany = lastHourOfDayInGermany - firstHourOfDayInGermany;
const timeTableMinutesInGermany = timeTableHoursInGermany * minutesPerHour;
const timezoneInGermany = 'Europe/Berlin';
const minuteGranularity = 30;
let divIds = 0;

const styles = () => ({
  timeTableDiv: {
    position: 'relative',
    padding: 0,
    margin: 0,
    '@media (min-Width: 1000px)': {width: '75%'},
    '@media (min-Width: 1500px)': {width: '50%'},
    '@media (min-Width: 1800px)': {width: '40%'}
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
    background: '#4d8087',
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
  render() {
    const {
      classes,
      appointmentsEmployee,
      appointmentsReviewer,
      appointmentsSupervisor
    } = this.props;

    const dividers = this.createDividers(classes);
    const hourLabels = this.createHourLabels(classes);
    const appointmentDivs = this.createAppointmentDivs(
      classes,
      appointmentsEmployee,
      appointmentsReviewer,
      appointmentsSupervisor
    );

    return (
      <div className={classes.timeTableDiv}>
        {dividers}
        {hourLabels}
        {appointmentDivs}
      </div>
    );
  }

  createDividers(classes) {
    const dividers = [];
    for (
      let hour = moment.tz(timezoneInGermany)
        .hour(firstHourOfDayInGermany)
        .utc()
        .minutes(0);
      hour <=
      moment.tz(timezoneInGermany)
        .hour(lastHourOfDayInGermany)
        .utc()
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

  createHourLabels(classes) {
    const hourLabels = [];
    for (
      let hour = moment.tz(timezoneInGermany)
        .hour(firstHourOfDayInGermany)
        .utc()
        .minutes(0);
      hour <=
      moment.tz(timezoneInGermany)
        .hour(lastHourOfDayInGermany)
        .utc()
        .minutes(0);
      hour.add(minuteGranularity, 'm')
    ) {
      hourLabels.push(
        <div
          className={classes.hours}
          style={{top: this.calculatePositionInTimetableFor(hour).toString() + '%'}}
          key={'hourLabel' + hour.toString()} //needs an unique key
        >
          <div className={classes.hourLabel}>
            <Typography className={classes.hourLabelText}>
              {hour.format('HH:mm')}
            </Typography>
          </div>
        </div>
      );
    }
    return hourLabels;
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
    let startSelectedDay = moment.tz(this.props.selectedDate, timezoneInGermany)
      .hours(firstHourOfDayInGermany)
      .utc();
    let endSelectedDay = moment.tz(this.props.selectedDate, timezoneInGermany)
      .hours(lastHourOfDayInGermany);
    return appointments.filter(appointment => {
      let startAppointmentUtc = moment.utc(appointment[0], 'YYYY-MM-DDTHH:mmZ');
      let endAppointmentUtc = moment.utc(appointment[1], 'YYYY-MM-DDTHH:mmZ');
      //exclude appointments that are completely before or after the time window to be displayed (in that case, an empty array will be returned)
      return (
        startAppointmentUtc.isBefore(endSelectedDay) &&
        endAppointmentUtc.isAfter(startSelectedDay)
      );
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
    let timeStart = moment(appointment[0], 'YYYY-MM-DDTHH:mmZ[UTC]')
      .tz('Europe/Berlin')
      .format('HH:mm');
    let timeEnd = moment(appointment[1], 'YYYY-MM-DDTHH:mmZ[UTC]')
      .tz('Europe/Berlin')
      .format('HH:mm');
    let topPosition = this.transformAppointmentTimeToPercent(appointment[0]);
    let length =
      this.transformAppointmentTimeToPercent(appointment[1]) - topPosition;
    if (appointment) {
      return (
        <div
          id={`${person}_${timeStart}-${timeEnd}`}
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

  calculatePositionInTimetableFor(time) {
    const timeInGermany = time.tz(timezoneInGermany);
    const hoursPassedSinceStartOfDay = timeInGermany.hours() - firstHourOfDayInGermany;
    const minutesPassedSinceStartOfDay = timeInGermany.minutes() + hoursPassedSinceStartOfDay * minutesPerHour;

    return minutesPassedSinceStartOfDay / timeTableMinutesInGermany * 100;
  }

  //Calculate here the relative position of a div or the relative time in percent to calculate the appointments length.
  //Takes a moment object as an argument - the start or the end moment of an appointment.
  transformAppointmentTimeToPercent(appointment) {
    let splitAppointment = appointment.split(/[\[\]]/);
    let appointmentWithoutTimezoneHint = splitAppointment[0];
    let appointmentInGivenTimezone = moment.parseZone(appointmentWithoutTimezoneHint, 'YYYY-MM-DDTHH:mmZ', true);
    let appointmentInUtc = appointmentInGivenTimezone.utc();

    let startOfSelectedDay = moment.tz(this.props.selectedDate, timezoneInGermany)
      .hour(firstHourOfDayInGermany)
      .utc();
    let endOfSelectedDay = moment.tz(this.props.selectedDate, timezoneInGermany)
      .hour(lastHourOfDayInGermany)
      .utc();
    //For Appointments inside the time window:
    if (
      appointmentInUtc.isAfter(startOfSelectedDay) &&
      appointmentInUtc.isBefore(endOfSelectedDay)
    ) {
      return this.calculatePositionInTimetableFor(appointmentInUtc);
    }
    //For appointments that end after the time window the size is 100%. The appointments that could start after the time
    // window were already filtered before by appointmentsFilter():
    if (appointmentInUtc.isAfter(endOfSelectedDay)) {
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
  appointmentsSupervisor: PropTypes.array.isRequired
};
TimeTable.defaultProps = {
  appointmentsEmployee: [],
  appointmentsReviewer: [],
  appointmentsSupervisor: []
};

export const StyledComponent = withStyles(styles)(TimeTable);
export default connect(
  state => ({selectedDate: getSelectedDate(state)}),
  {}
)(StyledComponent);
