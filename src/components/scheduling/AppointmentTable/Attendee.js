import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import {
  appointmentsFilter,
  transformAppointmentTimeToPercent
} from './AppointmentUtilities';

const styles = theme => ({
  appointmentDiv: {
    width: '21.5%',
    borderRadius: 3,
    position: 'absolute'
  }
});

export const createSingleAppointmentDiv = (
  order,
  startTime,
  endTime,
  date,
  className,
  keySuffix,
  name,
  appointmentState,
  intl
) => {
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
    <Tooltip title={infoOnMouseOver}>
      <div
        id={order}
        className={className}
        style={{
          left: order * 100 + 20,
          top: topPosition.toString() + '%',
          height: length.toString() + '%'
        }}
      />
    </Tooltip>
  );
};

const Attendee = ({
  appointments,
  selectedDate,
  classes,
  order,
  name,
  intl
}) => {
  const createAppointmentDivs = () => {
    let appointmentDivs = [];
    let filteredAppointments = appointmentsFilter(appointments, selectedDate);
    for (let i = 0; i < filteredAppointments.length; i++) {
      const startTime = filteredAppointments[i][0];
      const endTime = filteredAppointments[i][1];
      const appointmentState = filteredAppointments[i][2];
      appointmentDivs.push(
        createSingleAppointmentDiv(
          order,
          startTime,
          endTime,
          selectedDate,
          classes.appointmentDiv,
          i,
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
