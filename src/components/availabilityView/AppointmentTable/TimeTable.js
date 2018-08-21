import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment-timezone';
import {
  timezoneInGermany,
  firstHourOfDayInGermany,
  lastHourOfDayInGermany,
  calculatePositionInTimetableFor,
  minuteGranularity,
  styles
} from './AppointmentUtilities';

class TimeTable extends React.Component {
  render() {
    const { classes } = this.props;

    const dividers = TimeTable.createDividers(classes);
    const hourLabels = TimeTable.createHourLabels(classes);

    return (
      <div className={classes.timeTableDiv}>
        {dividers}
        {hourLabels}
        {this.props.children}
      </div>
    );
  }

  static createDividers(classes) {
    const dividers = [];
    for (
      let hour = moment
        .tz(timezoneInGermany)
        .hour(firstHourOfDayInGermany)
        .utc()
        .minutes(0);
      hour <=
      moment
        .tz(timezoneInGermany)
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

  static createHourLabels(classes) {
    const hourLabels = [];
    for (
      let hour = moment
        .tz(timezoneInGermany)
        .hour(firstHourOfDayInGermany)
        .utc()
        .minutes(0);
      hour <=
      moment
        .tz(timezoneInGermany)
        .hour(lastHourOfDayInGermany)
        .utc()
        .minutes(0);
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
export default StyledComponent;
