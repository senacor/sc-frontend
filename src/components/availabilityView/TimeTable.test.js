import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as TimeTable } from './TimeTable';
import moment from 'moment';

const props = {
  selectedDate: '2018-03-08'
};
const classes = {
  divider: {},
  appointmentDiv: {}
};

describe('createSingleAppointmentDiv', () => {
  it('should create an appointmentDiv with the correct height and position', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T09:45Z[UTC]';
    let endAppointment = '2018-03-08T15:15Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let singleAppointmentDiv = (
      <div
        key={'availabilityemployee1'} //if this test is run after the createAppointmentDivs test, which calls this function, the divId (1 here) has been already set to a higher value and this test will fail. If it is run separately, it never fails, since a new instance of the component is created and divIds are set to 0. A workaround to ignore the key would be for example to JSON.stringify the expected and the obtained div-result and then to compare.
        className={classes.appointmentDiv}
        style={{
          left: '15.5%',
          top: '25%',
          height: '50%'
        }}
      />
    );
    expect(
      component
        .instance()
        .createSingleAppointmentDiv('employee', appointment, classes)
    ).toEqual(singleAppointmentDiv);
  });
});

describe('createAppointmentDivs', () => {
  it('should create two appointmentDivs for two appointments', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T09:45Z[UTC]';
    let endAppointment = '2018-03-08T15:15Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointmentsEmployee = [];
    appointmentsEmployee.push(appointment);
    let appointmentsReviewer = [];
    appointmentsReviewer.push(appointment);
    let appointmentsSupervisor = [];
    expect(
      component
        .instance()
        .createAppointmentDivs(
          classes,
          appointmentsEmployee,
          appointmentsReviewer,
          appointmentsSupervisor
        )
    ).toHaveLength(2);
  });
});

describe('createHourLabels', () => {
  it('should create 23 hourLabels if the time window is from 8:00 to 19:00 and the minuteGranularity is 30', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    expect(component.instance().createHourLabels(classes)).toHaveLength(23);
  });
});

describe('createDividers', () => {
  it('should create 23 dividers if the time window is from 8:00 to 19:00 and the minuteGranularity is 30', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    expect(component.instance().createDividers(classes)).toHaveLength(23);
  });
});

describe('calculatePositionFor', () => {
  it('should return 100 if the appointment is at the beginning of the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = moment.utc('2018-03-08T09:00Z[UTC]', 'YYYY-MM-DDTHH:mmZ');
    expect(
      component.instance().calculatePositionFor(startAppointment)
    ).toEqual(100);
  });

  it('should return 75 if the appointment is at a quarter past the hour of the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = moment.utc('2018-03-08T09:15Z[UTC]', 'YYYY-MM-DDTHH:mmZ');
    expect(
      component.instance().calculatePositionFor(startAppointment)
    ).toEqual(75);
  });

  it('should return 50 if the appointment is at half past the hour of the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = moment.utc('2018-03-08T09:30Z[UTC]', 'YYYY-MM-DDTHH:mmZ');
    expect(
      component.instance().calculatePositionFor(startAppointment)
    ).toEqual(50);
  });

  it('should return 25 if the appointment is at a quarter to the hour of the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = moment.utc('2018-03-08T09:45Z[UTC]', 'YYYY-MM-DDTHH:mmZ');
    expect(
      component.instance().calculatePositionFor(startAppointment)
    ).toEqual(25);
  });
});

describe('transformAppointmentTimeToPercent', () => {
  describe('should return 50 if the appointment is in the center of the time window if', () => {
    it('is in UTC', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T12:30Z[UTC]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is on Baker Island, USA', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T00:30-12:00[Etc/GMT+12]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Niue, New Zealand', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T01:30-11:00[Pacific/Niue]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Tahiti', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T02:30-10:00[Pacific/Tahiti]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is on the Marquesas Islands, French Polynesia', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T03:00-09:30[Pacific/Marquesas]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time in Alaska, USA', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T03:30-09:00[America/Anchorage]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in California, USA', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T04:30-08:00[America/Los_Angeles]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time in Arizona, USA', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T05:30-07:00[America/Phoenix]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Belize', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T06:30-06:00[America/Belize]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time on the Bahamas', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T07:30-05:00[America/Nassau]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time in Toronto, Canada', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T08:30-04:00[America/Toronto]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time in Newfoundland, Canada', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T09:00-03:30[America/St_Johns]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Argentina', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T09:30-03:00[America/Argentina/San_Juan]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is summer time in Newfoundland, Canada', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T10:00-02:30[America/St_Johns]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in South Georgia, UK', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T10:30-02:00[Atlantic/South_Georgia]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Cape Verde', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T11:30-01:00[Atlantic/Cape_Verde]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time in the UK', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T12:30+00:00[Europe/London]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time in Germany', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T13:30+01:00[Europe/Berlin]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time in Latvia', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T14:30+02:00[Europe/Riga]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Kenya', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T15:30+03:00[Africa/Nairobi]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time in Iran', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T16:00+03:30[Asia/Tehran]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Azerbaijan', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T16:30+04:00[Asia/Baku]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Afghanistan', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T17:00+04:30[Asia/Kabul]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Uzbekistan', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T17:30+05:00[Asia/Samarkand]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in India', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T18:00+05:30[Asia/Kolkata]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Nepal', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T18:15+05:45[Asia/Kathmandu]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Bhutan', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T18:30+06:00[Asia/Thimphu]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Myanmar', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T19:00+06:30[Asia/Yangon]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Laos', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T19:30+07:00[Asia/Vientiane]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in the Philippines', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T20:30+08:00[Asia/Manila]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Eucla, Western Australia', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T21:15+08:45[Australia/Eucla]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Japan', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T21:30+09:00[Asia/Tokyo]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in winter time South Australia', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T22:00+09:30[Australia/Adelaide]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is in Papua New Guinea', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T22:30+10:00[Pacific/Port_Moresby]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is on Lord Howe Island, Australia', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T23:00+10:30[Australia/Lord_Howe]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is on Macquarie Island, Australia', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-08T23:30+11:00[Antarctica/Macquarie]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time on Fiji', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-09T00:30+12:00[Pacific/Fiji]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is winter time on the Chatham Islands, New Zealand', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-09T01:15+12:45[Pacific/Chatham]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is on Enderbury Island, Republic of Kiribati', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-09T01:30+13:00[Pacific/Enderbury]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is summer time on the Chatham Islands, New Zealand', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-09T02:15+13:45[Pacific/Chatham]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });

    it('is on Christmas Island', () => {
      const component = shallow(<TimeTable />).dive();
      component.setProps(props);
      let startAppointment = '2018-03-09T02:30+14:00[Pacific/Kiritimati]';
      expect(
        component.instance().transformAppointmentTimeToPercent(startAppointment)
      ).toEqual(50);
    });
  });

  it('should return 100 if the appointment ends after the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let endAppointment = '2018-03-08T19:15+01:00[Europe/Berlin]';

    expect(
      component.instance().transformAppointmentTimeToPercent(endAppointment)
    ).toEqual(100);
  });

  it('should return 0 if the appointment starts before the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T07:45+01:00[Europe/Berlin]';

    expect(
      component.instance().transformAppointmentTimeToPercent(startAppointment)
    ).toEqual(0);
  });
});

describe('appointmentsFilter', () => {
  it('excludes appointments that are completely before or after the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T02:00Z[UTC]';
    let endAppointment = '2018-03-08T03:00Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointments = [];
    appointments.push(appointment);
    expect(component.instance().appointmentsFilter(appointments)).toEqual([]);
  });

  it('includes appointments that are inside the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T12:00Z[UTC]';
    let endAppointment = '2018-03-08T13:00Z[UTC]';
    let appointment = [ startAppointment, endAppointment ];
    let appointments = [ appointment ];
    expect(component.instance().appointmentsFilter(appointments)).toEqual(
      appointments
    );
  });

  it('includes appointments that are inside and outside the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T00:00Z[UTC]';
    let endAppointment = '2018-03-08T13:00Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointments = [];
    appointments.push(appointment);
    expect(component.instance().appointmentsFilter(appointments)).toEqual(
      appointments
    );
  });
});

describe('TimeTable', () => {
  it('should match snapshot', () => {
    let component = shallow(<TimeTable />);

    expect(component).toMatchSnapshot();
  });
});
