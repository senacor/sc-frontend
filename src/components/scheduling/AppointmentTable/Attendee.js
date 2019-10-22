import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import {
  appointmentsFilter,
  transformAppointmentTimeToPercent
} from './AppointmentUtilities';

const styles = theme => ({
  appointmentDiv: {
    width: '18%',
    borderRadius: 3,
    background: theme.palette.primary['300'],
    position: 'absolute'
  },
  appointmentDivEmployee: {
    width: '18%',
    borderRadius: 3,
    background: theme.palette.primary['400'],
    position: 'absolute'
  },
  appointmentDivReviewer: {
    width: '18%',
    borderRadius: 3,
    background: theme.palette.primary['500'],
    position: 'absolute'
  },
  appointmentDivSupervisor: {
    width: '18%',
    borderRadius: 3,
    background: theme.palette.secondary.green,
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

const Attendee = ({
  appointments,
  selectedDate,
  attendee,
  classes,
  distanceFromLeft,
  name,
  intl
}) => {
  const createAppointmentDivs = () => {
    let appointmentDivs = [];
    let filteredAppointments = appointmentsFilter(appointments, selectedDate);
    for (
      let appointmentCounter = 0;
      appointmentCounter < filteredAppointments.length;
      appointmentCounter++
    ) {
      const startTime = filteredAppointments[appointmentCounter][0];
      const endTime = filteredAppointments[appointmentCounter][1];
      const appointmentState = filteredAppointments[appointmentCounter][2];
      const className = attendeeAppointmentClass(attendee, classes);
      appointmentDivs.push(
        createSingleAppointmentDiv(
          distanceFromLeft,
          startTime,
          endTime,
          selectedDate,
          className,
          appointmentCounter,
          name,
          appointmentState,
          intl
        )
      );
    }
    return appointmentDivs;
  };

  return <React.Fragment>{createAppointmentDivs()}</React.Fragment>;
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

export default injectIntl(withStyles(styles)(Attendee));
