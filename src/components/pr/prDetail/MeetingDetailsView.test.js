import React from 'react';
import { StyledComponent } from './MeetingDetailsView';
import { createShallow } from '@material-ui/core/test-utils';
import moment from 'moment';
import timezone_mock from 'timezone-mock';

describe('MeetingDetailsView', () => {
  beforeEach(() => {
    // Only works for US/Pacific, US/Eastern, Brazil/East and UTC according to https://www.npmjs.com/package/timezone-mock
    timezone_mock.register('UTC');
  });

  afterEach(() => {
    timezone_mock.unregister();
  });

  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let start = moment.utc('2018-08-06T09:51:00.000+0000');
    let end = moment.utc('2018-08-06T10:51:00.000+0000');

    const meeting = {
      start: start.tz('Europe/Berlin').format('YYYY-MM-DDTHH:mmZ'),
      end: end.tz('Europe/Berlin').format('YYYY-MM-DDTHH:mmZ'),
      location: 'Test',
      requiredAttendees: {
        'test.pr.mitarbeiter2': {
          name: 'PR Mitarbeiter2',
          email: 'test.pr.mitarbeiter2@senacor.com',
          status: 'DECLINE'
        }
      },
      optionalAttendees: {},
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1/meetings'
        }
      }
    };

    const pr = {
      reviewer: {
        login: 'test.pr.mitarbeiter1',
        firstName: 'Michaela',
        lastName: 'Mitarbeiterin'
      },
      employee: {
        login: 'test.pr.mitarbeiter2',
        firstName: 'Martin',
        lastName: 'Mitarbeiter'
      },
      supervisor: {
        login: 'test.pr.vorgesetzter',
        firstName: 'Volker',
        lastName: 'Vorgesetzter'
      }
    };

    let wrapper = shallow(<StyledComponent meeting={meeting} pr={pr} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should display meeting details when a meeting exists', () => {
    const meeting = {
      start: '2018-08-06T09:51:00.000+0000',
      end: '2018-08-06T10:51:00.000+0000',
      location: 'Test',
      requiredAttendees: {
        'test.pr.mitarbeiter2': {
          name: 'PR Mitarbeiter2',
          email: 'test.pr.mitarbeiter2@senacor.com',
          status: 'DECLINE'
        }
      },
      optionalAttendees: {},
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/meetings?prId=1'
        }
      }
    };

    const pr = {
      reviewer: {
        login: 'test.pr.mitarbeiter1',
        firstName: 'Michaela',
        lastName: 'Mitarbeiterin'
      },
      employee: {
        login: 'test.pr.mitarbeiter2',
        firstName: 'Martin',
        lastName: 'Mitarbeiter'
      },
      supervisor: {
        login: 'test.pr.vorgesetzter',
        firstName: 'Volker',
        lastName: 'Vorgesetzter'
      }
    };

    let startDateAsLocal = moment(meeting.start)
      .local()
      .format('DD.MM.YYYY');

    let startTimeAsLocal = moment(meeting.start)
      .local()
      .format('HH:mm');

    let endTimeAsLocal = moment(meeting.end)
      .local()
      .format('HH:mm');

    let wrapper = shallow(<StyledComponent meeting={meeting} pr={pr} />);

    expect(wrapper.find({ primary: startDateAsLocal })).toHaveLength(1);

    expect(
      wrapper.find({ primary: startTimeAsLocal + ' - ' + endTimeAsLocal })
    ).toHaveLength(1);

    expect(wrapper.find('#requiredAttendees').children()).toHaveLength(
      Object.keys(meeting.requiredAttendees).length
    );

    expect(wrapper.find('#optionalAttendees').children()).toHaveLength(
      Object.keys(meeting.optionalAttendees).length
    );
  });
});
