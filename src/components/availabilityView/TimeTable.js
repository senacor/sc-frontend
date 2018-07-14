import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment';

const timeTableListHeight = 25;
const firstHourOfDay = 8;
const lastHourOfDay = 19;
const minuteGranularity = 60;
const timeTableHours = lastHourOfDay - firstHourOfDay;
let divIds = 0;

const styles = theme => ({
  timeTable: {
    //height: timeTableListHeight
  },
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
    background: '#4d8087',
    position: 'absolute'
  },
  hourLabel: {
    position: 'relative',
    top: -timeTableListHeight / 2,
    display: 'block'
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

  createTimeTable(classes) {
    const timeTable = [];
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
      timeTable.push(
        <hr className={classes.divider} />
        /*<div
          className={classes.timeTable}
          key={'time' + hour.toString()} //needs an unique key
        >
          <Typography className={classes.hours}>{hour.format('HH:mm')}</Typography>
        </div>*/
      );
    }

    return timeTable;
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
      dividers.push(<hr className={classes.divider} />);
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

  calculatePositionFor(time) {
    let startMinutesSinceFirstHour =
      time.hours() * 60 + time.minutes() - firstHourOfDay * 60;
    let relativePosition =
      (startMinutesSinceFirstHour / (timeTableHours * 60)) * 100;
    return relativePosition;
  }

  calculateAppointmentStartTimeToPercent(appointment) {
    console.log(appointment);
    let startOfAppointment = moment(appointment);
    let startOfSelectedDay = moment(this.props.selectedDay).hour(
      firstHourOfDay
    );
    console.log(startOfAppointment);
    console.log(startOfSelectedDay);
    if (startOfAppointment.isAfter(startOfSelectedDay)) {
      return this.calculatePositionFor(startOfAppointment);
    } else {
      return 0;
    }
  }

  createSingleAppointmentDiv(person, appointment, classes) {
    console.log(appointment[0]);
    console.log(this.calculateAppointmentStartTimeToPercent(appointment[0]));
    const personPosition = new Map();
    personPosition.set('employee', '15.5%');
    personPosition.set('reviewer', '46.5%');
    personPosition.set('supervisor', '77.5%');
    if (divIds > 1000) {
      divIds = 0;
    } else {
      divIds++;
    }
    let topPosition = this.calculateAppointmentStartTimeToPercent(
      appointment[0]
    );
    let length =
      this.calculateAppointmentStartTimeToPercent(appointment[1]) - topPosition;
    /*if (appointment[1] > 0) {
      height = (timeTableListHeight * appointment[1]) / minuteGranularity;
    }*/
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
        ) //contains already the start and end
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
    console.log(appointments);
    let startSelectedDay = moment(this.props.selectedDay).hours(firstHourOfDay);
    let endSelectedDay = moment(this.props.selectedDay).hours(lastHourOfDay);
    return appointments.filter(appointment => {
      let startAppointment = moment(appointment[0]);
      let endAppointment = moment(appointment[1]);
      console.log(startAppointment);
      //exclude appointments that are completely before or after the time window to be displayed (in that case, an empty array will be returned)
      if (
        startAppointment.isBefore(endSelectedDay) &&
        endAppointment.isAfter(startSelectedDay)
      ) {
        console.log(appointment);
        return true;
      } else {
        return false;
      }
    });
  }

  render() {
    const {
      classes,
      appointmentsEmployee,
      appointmentsReviewer,
      appointmentsSupervisor
    } = this.props;

    //const timeTable = this.createTimeTable(classes);
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
