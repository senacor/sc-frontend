import React from 'react';
import { StyledComponent } from './MeetingView';
import { createShallow } from '@material-ui/core/test-utils';
import moment from 'moment';

describe('MeetingView', () => {
  let shallow = createShallow({ dive: true });

  const meeting = {
    start: '2018-08-06T09:51:00.000+0000',
    end: '2018-08-06T10:51:00.000+0000',
    location: 'Test',
    requiredAttendees: [
      {
        name: 'PR Mitarbeiter2',
        email: 'test.pr.mitarbeiter2@senacor.com',
        status: 'DECLINE'
      },
      {
        name: 'PR Mitarbeiter3',
        email: 'test.pr.mitarbeiter3@senacor.com',
        status: 'ACCEPT'
      }
    ],
    optionalAttendees: [],
    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/meetings?prId=1'
      }
    }
  };

  it('should match snapshot', () => {
    let wrapper = shallow(<StyledComponent meeting={meeting} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should display meeting details when a meeting exists', () => {
    let startDateAsLocal = moment(meeting.start)
      .local()
      .format('DD.MM.YYYY');

    let startTimeAsLocal = moment(meeting.start)
      .local()
      .format('HH:mm');

    let endTimeAsLocal = moment(meeting.end)
      .local()
      .format('HH:mm');

    let wrapper = shallow(<StyledComponent meeting={meeting} />);

    expect(wrapper.find({ primary: startDateAsLocal })).toHaveLength(1);

    expect(
      wrapper.find({ primary: startTimeAsLocal + ' - ' + endTimeAsLocal })
    ).toHaveLength(1);

    expect(wrapper.find('#requiredAttendees').children()).toHaveLength(
      meeting.requiredAttendees.length
    );

    expect(wrapper.find('#optionalAttendees').children()).toHaveLength(
      meeting.optionalAttendees.length
    );
  });
});
