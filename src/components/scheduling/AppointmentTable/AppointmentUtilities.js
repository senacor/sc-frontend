import moment from 'moment-timezone';

export const minutesPerHour = 60;
export const firstHourOfDayInGermany = 8;
export const lastHourOfDayInGermany = 19;
export const timezoneInGermany = 'Europe/Berlin';
export const timeTableHoursInGermany =
  lastHourOfDayInGermany - firstHourOfDayInGermany;
export const timeTableMinutesInGermany =
  timeTableHoursInGermany * minutesPerHour;
export const timeTableListHeight = 25;
export const minuteGranularity = 30;

export function calculatePositionInTimetableFor(time) {
  const timeInGermany = time.tz(timezoneInGermany);
  const hoursPassedSinceStartOfDay =
    timeInGermany.hours() - firstHourOfDayInGermany;
  const minutesPassedSinceStartOfDay =
    timeInGermany.minutes() + hoursPassedSinceStartOfDay * minutesPerHour;

  return (minutesPassedSinceStartOfDay / timeTableMinutesInGermany) * 100;
}

export function transformAppointmentTimeToPercent(appointment, selectedDate) {
  let splitAppointment = appointment.split(/[[\]]/);
  let appointmentWithoutTimezoneHint = splitAppointment[0];
  let appointmentInGivenTimezone = moment.parseZone(
    appointmentWithoutTimezoneHint,
    'YYYY-MM-DDTHH:mmZ',
    true
  );
  let appointmentInUtc = appointmentInGivenTimezone.utc();

  let startOfSelectedDay = moment
    .tz(selectedDate, timezoneInGermany)
    .hour(firstHourOfDayInGermany)
    .utc();
  let endOfSelectedDay = moment
    .tz(selectedDate, timezoneInGermany)
    .hour(lastHourOfDayInGermany)
    .utc();
  if (
    appointmentInUtc.isAfter(startOfSelectedDay) &&
    appointmentInUtc.isBefore(endOfSelectedDay)
  ) {
    return calculatePositionInTimetableFor(appointmentInUtc);
  }
  if (appointmentInUtc.isAfter(endOfSelectedDay)) {
    return 100;
  } else {
    return 0;
  }
}

export function appointmentsFilter(appointments, selectedDate) {
  let startSelectedDay = moment
    .tz(selectedDate, timezoneInGermany)
    .hours(firstHourOfDayInGermany)
    .utc();
  let endSelectedDay = moment
    .tz(selectedDate, timezoneInGermany)
    .hours(lastHourOfDayInGermany);
  return appointments.filter(appointment => {
    let startAppointmentUtc = moment.utc(appointment[0], 'YYYY-MM-DDTHH:mmZ');
    let endAppointmentUtc = moment.utc(appointment[1], 'YYYY-MM-DDTHH:mmZ');

    return (
      startAppointmentUtc.isBefore(endSelectedDay) &&
      endAppointmentUtc.isAfter(startSelectedDay) &&
      appointment[2]
    );
  });
}

export function extractAppointments(personAppointmentResults) {
  let appointments = [];
  if (personAppointmentResults === undefined) {
    return appointments;
  } else {
    for (let j = 0; j < personAppointmentResults.length; j++) {
      appointments[j] = [
        personAppointmentResults[j].appointmentStartTime,
        personAppointmentResults[j].appointmentEndTime,
        personAppointmentResults[j].appointmentStatus
      ];
    }
  }
  return appointments;
}

export const styles = () => ({
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
    top: -timeTableListHeight / 2
  },
  hourLabelText: {
    lineHeight: timeTableListHeight + 'px'
  }
});
