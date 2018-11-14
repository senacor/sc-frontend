import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment-timezone';
import {
  appointmentsFilter,
  transformAppointmentTimeToPercent
} from './AppointmentUtilities';

export const styles = () => ({
  appointmentDivBusy: {
    width: '21.5%',
    borderRadius: 10,
    background: '#FA5858',
    position: 'absolute'
  },
  appointmentDivTentative: {
    width: '21.5%',
    borderRadius: 10,
    background: '#BFFF00',
    position: 'absolute'
  },
  appointmentDiv: {
    width: '21.5%',
    borderRadius: 10,
    background: '#4d8087',
    position: 'absolute'
  }
});

export function createSingleAppointmentDiv(
  distanceFromLeft,
  startTime,
  endTime,
  date,
  className,
  i
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
      key={`appointmentDiv${distanceFromLeft}_${timeStart}-${timeEnd}-${i}`} //needs an unique key
      className={className}
      style={{
        left: distanceFromLeft.toString() + '%',
        top: topPosition.toString() + '%',
        height: length.toString() + '%'
      }}
    />
  );
}

function appointmentClass(state, classes) {
  if (state === 'Busy') {
    return classes.appointmentDivBusy;
  } else if (state === 'Tentative') {
    return classes.appointmentDivTentative;
  } else {
    return classes.appointmentDiv;
  }
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
      const appointmentState = filteredAppointments[i][2];
      const className = appointmentClass(appointmentState, this.props.classes);
      appointmentDivs.push(
        createSingleAppointmentDiv(
          this.props.distanceFromLeft,
          startTime,
          endTime,
          this.props.selectedDate,
          className,
          i
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
