import moment from 'moment-timezone';
import * as utils from './AppointmentUtilities';

const selectedDate = '2018-03-08';

describe('calculatePositionInTimetableFor', () => {
  it('should return 0 if the appointment is at the beginning of the time window.', () => {
    let startAppointment = moment.utc(
      '2018-03-08T08:00+01:00[Europe/Berlin]',
      'YYYY-MM-DDTHH:mmZ'
    );
    expect(utils.calculatePositionInTimetableFor(startAppointment)).toEqual(0);
  });

  it('should return 25 if the appointment is at a quarter way through the time window.', () => {
    let startAppointment = moment.utc(
      '2018-03-08T10:45+01:00[Europe/Berlin]',
      'YYYY-MM-DDTHH:mmZ'
    );
    expect(utils.calculatePositionInTimetableFor(startAppointment)).toEqual(25);
  });

  it('should return 50 if the appointment is half way through the time window.', () => {
    let startAppointment = moment.utc(
      '2018-03-08T13:30+01:00[Europe/Berlin]',
      'YYYY-MM-DDTHH:mmZ'
    );
    expect(utils.calculatePositionInTimetableFor(startAppointment)).toEqual(50);
  });

  it('should return 75 if the appointment is three quarters through the time window.', () => {
    let startAppointment = moment.utc(
      '2018-03-08T16:15+01:00[Europe/Berlin]',
      'YYYY-MM-DDTHH:mmZ'
    );
    expect(utils.calculatePositionInTimetableFor(startAppointment)).toEqual(75);
  });
});

describe('transformAppointmentTimeToPercent', () => {
  describe('should return 50 if the appointment is in the center of the time window if', () => {
    it('is in UTC.', () => {
      let startAppointment = '2018-03-08T12:30Z[UTC]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is on Baker Island, USA..', () => {
      let startAppointment = '2018-03-08T00:30-12:00[Etc/GMT+12]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Niue, New Zealand.', () => {
      let startAppointment = '2018-03-08T01:30-11:00[Pacific/Niue]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Tahiti.', () => {
      let startAppointment = '2018-03-08T02:30-10:00[Pacific/Tahiti]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is on the Marquesas Islands, French Polynesia..', () => {
      let startAppointment = '2018-03-08T03:00-09:30[Pacific/Marquesas]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time in Alaska, USA.', () => {
      let startAppointment = '2018-03-08T03:30-09:00[America/Anchorage]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in California, USA.', () => {
      let startAppointment = '2018-03-08T04:30-08:00[America/Los_Angeles]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time in Arizona, USA..', () => {
      let startAppointment = '2018-03-08T05:30-07:00[America/Phoenix]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Belize.', () => {
      let startAppointment = '2018-03-08T06:30-06:00[America/Belize]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time on the Bahamas..', () => {
      let startAppointment = '2018-03-08T07:30-05:00[America/Nassau]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time in Toronto, Canada..', () => {
      let startAppointment = '2018-03-08T08:30-04:00[America/Toronto]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time in Newfoundland, Canada.', () => {
      let startAppointment = '2018-03-08T09:00-03:30[America/St_Johns]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Argentina.', () => {
      let startAppointment =
        '2018-03-08T09:30-03:00[America/Argentina/San_Juan]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is summer time in Newfoundland, Canada.', () => {
      let startAppointment = '2018-03-08T10:00-02:30[America/St_Johns]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in South Georgia, UK.', () => {
      let startAppointment = '2018-03-08T10:30-02:00[Atlantic/South_Georgia]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Cape Verde.', () => {
      let startAppointment = '2018-03-08T11:30-01:00[Atlantic/Cape_Verde]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time in the UK.', () => {
      let startAppointment = '2018-03-08T12:30+00:00[Europe/London]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time in Germany.', () => {
      let startAppointment = '2018-03-08T13:30+01:00[Europe/Berlin]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time in Latvia.', () => {
      let startAppointment = '2018-03-08T14:30+02:00[Europe/Riga]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Kenya', () => {
      let startAppointment = '2018-03-08T15:30+03:00[Africa/Nairobi]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time in Iran', () => {
      let startAppointment = '2018-03-08T16:00+03:30[Asia/Tehran]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Azerbaijan', () => {
      let startAppointment = '2018-03-08T16:30+04:00[Asia/Baku]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Afghanistan', () => {
      let startAppointment = '2018-03-08T17:00+04:30[Asia/Kabul]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Uzbekistan', () => {
      let startAppointment = '2018-03-08T17:30+05:00[Asia/Samarkand]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in India', () => {
      let startAppointment = '2018-03-08T18:00+05:30[Asia/Kolkata]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Nepal', () => {
      let startAppointment = '2018-03-08T18:15+05:45[Asia/Kathmandu]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Bhutan', () => {
      let startAppointment = '2018-03-08T18:30+06:00[Asia/Thimphu]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Myanmar', () => {
      let startAppointment = '2018-03-08T19:00+06:30[Asia/Yangon]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Laos', () => {
      let startAppointment = '2018-03-08T19:30+07:00[Asia/Vientiane]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in the Philippines', () => {
      let startAppointment = '2018-03-08T20:30+08:00[Asia/Manila]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Eucla, Western Australia', () => {
      let startAppointment = '2018-03-08T21:15+08:45[Australia/Eucla]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Japan', () => {
      let startAppointment = '2018-03-08T21:30+09:00[Asia/Tokyo]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in winter time South Australia', () => {
      let startAppointment = '2018-03-08T22:00+09:30[Australia/Adelaide]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is in Papua New Guinea', () => {
      let startAppointment = '2018-03-08T22:30+10:00[Pacific/Port_Moresby]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is on Lord Howe Island, Australia.', () => {
      let startAppointment = '2018-03-08T23:00+10:30[Australia/Lord_Howe]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is on Macquarie Island, Australia.', () => {
      let startAppointment = '2018-03-08T23:30+11:00[Antarctica/Macquarie]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time on Fiji.', () => {
      let startAppointment = '2018-03-09T00:30+12:00[Pacific/Fiji]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is winter time on the Chatham Islands, New Zealand.', () => {
      let startAppointment = '2018-03-09T01:15+12:45[Pacific/Chatham]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is on Enderbury Island, Republic of Kiribati.', () => {
      let startAppointment = '2018-03-09T01:30+13:00[Pacific/Enderbury]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is summer time on the Chatham Islands, New Zealand.', () => {
      let startAppointment = '2018-03-09T02:15+13:45[Pacific/Chatham]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });

    it('is on Christmas Island.', () => {
      let startAppointment = '2018-03-09T02:30+14:00[Pacific/Kiritimati]';
      expect(
        utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
      ).toEqual(50);
    });
  });

  it('should return 100 if the appointment ends after the time window.', () => {
    let endAppointment = '2018-03-08T19:15+01:00[Europe/Berlin]';

    expect(
      utils.transformAppointmentTimeToPercent(endAppointment, selectedDate)
    ).toEqual(100);
  });

  it('should return 0 if the appointment starts before the time window.', () => {
    let startAppointment = '2018-03-08T07:45+01:00[Europe/Berlin]';

    expect(
      utils.transformAppointmentTimeToPercent(startAppointment, selectedDate)
    ).toEqual(0);
  });
});

describe('appointmentsFilter', () => {
  it('excludes appointments that are completely before or after the time window.', () => {
    let startAppointment = '2018-03-08T02:00Z[UTC]';
    let endAppointment = '2018-03-08T03:00Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointments = [];
    appointments.push(appointment);
    expect(utils.appointmentsFilter(appointments, selectedDate)).toEqual([]);
  });

  it('includes appointments that are inside the time window.', () => {
    let startAppointment = '2018-03-08T12:00Z[UTC]';
    let endAppointment = '2018-03-08T13:00Z[UTC]';
    let appointment = [startAppointment, endAppointment];
    let appointments = [appointment];
    expect(utils.appointmentsFilter(appointments, selectedDate)).toEqual(
      appointments
    );
  });

  it('includes appointments that are inside and outside the time window.', () => {
    let startAppointment = '2018-03-08T00:00Z[UTC]';
    let endAppointment = '2018-03-08T13:00Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointments = [];
    appointments.push(appointment);
    expect(utils.appointmentsFilter(appointments, selectedDate)).toEqual(
      appointments
    );
  });
});

describe('extractAppointments', () => {
  const testAppointments = [
    {
      name: 'Michaela Mitarbeiterin',
      type: 'Party!',
      appointmentStartTime: '2018-03-08T00:00Z[UTC]',
      appointmentEndTime: '2018-03-08T02:00Z[UTC]'
    },
    {
      name: 'Michaela Mitarbeiterin',
      type: 'Schlafen...',
      appointmentStartTime: '2018-03-09T05:00Z[UTC]',
      appointmentEndTime: '2018-03-09T10:00Z[UTC]'
    },
    {
      name: 'Michaela Mitarbeiterin',
      type: 'Treffen mit dem Chef',
      appointmentStartTime: '2018-03-09T14:30Z[UTC]',
      appointmentEndTime: '2018-03-09T15:00Z[UTC]'
    }
  ];

  it('returns an empty list if the parameter is undefined.', () => {
    expect(utils.extractAppointments()).toHaveLength(0);
  });

  it('extracts start and end times of all appointments.', () => {
    const expectedResult = [
      ['2018-03-08T00:00Z[UTC]', '2018-03-08T02:00Z[UTC]'],
      ['2018-03-09T05:00Z[UTC]', '2018-03-09T10:00Z[UTC]'],
      ['2018-03-09T14:30Z[UTC]', '2018-03-09T15:00Z[UTC]']
    ];

    expect(utils.extractAppointments(testAppointments)).toEqual(expectedResult);
  });
});
