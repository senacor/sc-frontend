import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment-timezone';
import {
  appointmentsFilter,
  transformAppointmentTimeToPercent,
  styles
} from './AppointmentUtilities';

export function createSingleAppointmentDiv(
  distanceFromLeft,
  startTime,
  endTime,
  date,
  className
) {
  let timeStart = moment(startTime, 'YYYY-MM-DDTHH:mmZ[UTC]')
    .tz('Europe/Berlin')
    .format('HH:mm');
  let timeEnd = moment(endTime, 'YYYY-MM-DDTHH:mmZ[UTC]')
    .tz('Europe/Berlin')
    .format('HH:mm');
  let topPosition = transformAppointmentTimeToPercent(startTime, date);
  let length = transformAppointmentTimeToPercent(endTime, date) - topPosition;
  return (
    <div
      id={`appointmentDiv${distanceFromLeft}_${timeStart}-${timeEnd}`}
      key={`appointmentDiv${distanceFromLeft}_${timeStart}-${timeEnd}`} //needs an unique key
      className={className}
      style={{
        left: distanceFromLeft.toString() + '%',
        top: topPosition.toString() + '%',
        height: length.toString() + '%'
      }}
    />
  );
}

class Attendee extends React.Component {
  createAppointmentDivs() {
    let appointmentDivs = [];
    let filteredAppointments = appointmentsFilter(
      this.props.appointments,
      this.props.selectedDate
    );
    for (let i = 0; i < filteredAppointments.length; i++) {
      const startTime = filteredAppointments[i][0];
      const endTime = filteredAppointments[i][1];
      appointmentDivs.push(
        createSingleAppointmentDiv(
          this.props.distanceFromLeft,
          startTime,
          endTime,
          this.props.selectedDate,
          this.props.classes.appointmentDiv
        )
      );
    }
    return appointmentDivs;
  }

  render() {
    return (
      <React.Fragment>
        {this.props.show ? this.createAppointmentDivs() : null}
      </React.Fragment>
    );
  }
}

Attendee.propTypes = {
  appointments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  distanceFromLeft: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired
};

Attendee.defaultProps = {
  show: true
};

export const StyledComponent = withStyles(styles)(Attendee);
export default StyledComponent;
