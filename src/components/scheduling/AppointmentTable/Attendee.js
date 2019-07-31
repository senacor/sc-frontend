import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment-timezone';
import {
  appointmentsFilter,
  transformAppointmentTimeToPercent
} from './AppointmentUtilities';
import Tooltip from '@material-ui/core/Tooltip';
import { injectIntl } from 'react-intl';

export const styles = () => ({
  appointmentDiv: {
    width: '21.5%',
    borderRadius: 10,
    background: '#4d8087',
    position: 'absolute'
  },
  appointmentDivEmployee: {
    width: '21.5%',
    borderRadius: 10,
    background: '#3D8E99',
    position: 'absolute'
  },
  appointmentDivReviewer: {
    width: '21.5%',
    borderRadius: 10,
    background: '#004953',
    position: 'absolute'
  },
  appointmentDivSupervisor: {
    width: '21.5%',
    borderRadius: 10,
    background: '#00FF90',
    position: 'absolute'
  }
});

export const createSingleAppointmentDiv = (
  distanceFromLeft,
  startTime,
  endTime,
  date,
  className,
  keySuffix,
  name,
  appointmentState,
  intl
) => {
  let timeStart = moment(startTime, 'YYYY-MM-DDTHH:mmZ[UTC]')
    .tz('Europe/Berlin')
    .format('HH:mm');
  let timeEnd = moment(endTime, 'YYYY-MM-DDTHH:mmZ[UTC]')
    .tz('Europe/Berlin')
    .format('HH:mm');
  let topPosition = transformAppointmentTimeToPercent(startTime, date);
  let length = transformAppointmentTimeToPercent(endTime, date) - topPosition;
  let infoOnMouseOver = name;
  switch (appointmentState) {
    case 'Busy':
      infoOnMouseOver = `${name}: ${intl.formatMessage({
        id: 'attendee.busy'
      })}`;
      break;
    case 'Tentative':
      infoOnMouseOver = `${name}: ${intl.formatMessage({
        id: 'attendee.tentative'
      })}`;
      break;
    case 'OOF':
      infoOnMouseOver = `${name}: ${intl.formatMessage({
        id: 'attendee.absent'
      })}`;
      break;
    case 'Free':
      infoOnMouseOver = `${name}: ${intl.formatMessage({
        id: 'attendee.free'
      })}`;
      break;
    default:
  }

  return (
    <Tooltip
      title={infoOnMouseOver}
      key={`appointmentDiv${distanceFromLeft}_${timeStart}-${timeEnd}-${keySuffix}`}
    >
      <div
        id={`appointmentDiv${distanceFromLeft}_${timeStart}-${timeEnd}`}
        key={`appointmentDiv${distanceFromLeft}_${timeStart}-${timeEnd}-${keySuffix}`} //needs an unique key
        className={className}
        style={{
          left: distanceFromLeft.toString() + '%',
          top: topPosition.toString() + '%',
          height: length.toString() + '%'
        }}
      />
    </Tooltip>
  );
};

const attendeeAppointmentClass = (attendee, classes) => {
  switch (attendee) {
    case 'employee':
      return classes.appointmentDivEmployee;
    case 'reviewer':
      return classes.appointmentDivReviewer;
    case 'supervisor':
      return classes.appointmentDivSupervisor;
    default:
      return classes.appointmentDiv;
  }
};

const Attendee = props => {
  const createAppointmentDivs = () => {
    let appointmentDivs = [];
    let filteredAppointments = appointmentsFilter(
      props.appointments,
      props.selectedDate
    );
    for (
      let appointmentCounter = 0;
      appointmentCounter < filteredAppointments.length;
      appointmentCounter++
    ) {
      const startTime = filteredAppointments[appointmentCounter][0];
      const endTime = filteredAppointments[appointmentCounter][1];
      const appointmentState = filteredAppointments[appointmentCounter][2];
      const className = attendeeAppointmentClass(props.attendee, props.classes);
      appointmentDivs.push(
        createSingleAppointmentDiv(
          props.distanceFromLeft,
          startTime,
          endTime,
          props.selectedDate,
          className,
          appointmentCounter,
          props.name,
          appointmentState,
          props.intl
        )
      );
    }
    return appointmentDivs;
  };

  return (
    <React.Fragment>
      {props.show ? createAppointmentDivs() : null}
    </React.Fragment>
  );
};

Attendee.propTypes = {
  appointments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  distanceFromLeft: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  attendee: PropTypes.string
};

Attendee.defaultProps = {
  show: true
};

export const StyledComponent = withStyles(styles)(Attendee);
export default injectIntl(StyledComponent);
