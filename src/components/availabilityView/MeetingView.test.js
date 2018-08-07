import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent } from './MeetingView';
import { createShallow } from '@material-ui/core/test-utils';

describe('MeetingView', () => {
  let shallow = createShallow({ dive: true });
  const mockFetchMeeting = jest.fn();

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
    let wrapper = shallow(
      <StyledComponent
        selectedDateTime={'2018-0s8-07T11:27+02:00'}
        fetchMeeting={mockFetchMeeting}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should display the create appointment form when meeting not exists', () => {
    let shallow = createShallow({ dive: true });
    let wrapper = shallow(
      <StyledComponent
        meeting={null}
        selectedDateTime={'2018-08-07T11:27+02:00'}
        fetchMeeting={mockFetchMeeting}
      />
    );

    expect(wrapper.find('#createMeeting')).toHaveLength(1);
  });

  it('should display meeting details when a meeting exists', () => {
    let wrapper = shallow(
      <StyledComponent
        meeting={meeting}
        selectedDateTime={'2018-08-07T11:27+02:00'}
        fetchMeeting={mockFetchMeeting}
      />
    );

    expect(wrapper.find('#requiredAttendees').children()).toHaveLength(
      meeting.requiredAttendees.length
    );

    expect(wrapper.find('#optionalAttendees').children()).toHaveLength(
      meeting.optionalAttendees.length
    );
  });
});
