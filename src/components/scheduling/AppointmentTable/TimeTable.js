import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {
  timezoneInGermany,
  firstHourOfDayInGermany,
  lastHourOfDayInGermany,
  calculatePositionInTimetableFor,
  minuteGranularity,
  styles
} from './AppointmentUtilities';

const endHour = moment
  .tz(timezoneInGermany)
  .hour(lastHourOfDayInGermany)
  .utc()
  .minutes(1);

const startHour = moment
  .tz(timezoneInGermany)
  .hour(firstHourOfDayInGermany)
  .utc()
  .minutes(0);

const TimeTable = ({ classes, children }) => {
  const createDividers = classes => {
    const dividers = [];

    for (
      let hour = moment(startHour);
      hour.isSameOrBefore(endHour);
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
  };

  const createHourLabels = classes => {
    const hourLabels = [];
    for (
      let hour = moment(startHour);
      hour <= endHour;
      hour.add(minuteGranularity, 'm')
    ) {
      hourLabels.push(
        <div
          className={classes.hours}
          style={{
            top: calculatePositionInTimetableFor(hour).toString() + '%'
          }}
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
  };

  const dividers = createDividers(classes);
  const hourLabels = createHourLabels(classes);

  return (
    <div className={classes.timeTableDiv}>
      {dividers}
      {hourLabels}
      {children}
    </div>
  );
};

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
