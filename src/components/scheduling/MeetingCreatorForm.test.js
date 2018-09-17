import React from 'react';
import { StyledComponent } from './MeetingCreatorForm';
import { createShallow } from '@material-ui/core/test-utils';

const fetchAppointmentsMock = jest.fn();

const pr = {
  id: 1,
  employee: {
    id: 1,
    firstName: 'Max',
    lastName: 'Mustermann',
    login: 'mmustermann',
    dateOfLastPr: '2019-03-14'
  },
  supervisor: {
    id: 3,
    firstName: 'Michaela',
    lastName: 'Mitarbeiterin',
    login: 'test.pr.mitarbeiter1'
  },
  dateOfLastPr: '2019-08-30',
  occasion: 'ON_DEMAND',
  statuses: ['FILLED_SHEET_EMPLOYEE', 'FILLED_SHEET_REVIEWER'],
  deadline: '2019-03-14',
  _links: {
    self: {
      href: 'http://localhost:8010/api/v1/prs/1'
    }
  }
};

describe('MeetingCreatorForm', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let wrapper = shallow(
      <StyledComponent fetchAppointments={fetchAppointmentsMock} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should display the create appointment form when meeting does not exist', () => {
    let shallow = createShallow({ dive: true });
    let wrapper = shallow(
      <StyledComponent
        meeting={null}
        fetchAppointments={fetchAppointmentsMock}
      />
    );

    expect(wrapper.find('#createMeeting')).toHaveLength(1);
  });

  it('should create the meeting details with two required attendees', () => {
    let shallow = createShallow({ dive: true });
    let wrapper = shallow(
      <StyledComponent
        meeting={null}
        fetchAppointments={fetchAppointmentsMock}
      />
    );

    wrapper.setState({
      date: '2018-08-01',
      startTime: '14:00',
      endTime: '15:00'
    });

    let expected_result = {
      prById: pr,
      start: '2018-08-01T12:00+00:00',
      end: '2018-08-01T13:00+00:00',
      location: '',
      requiredAttendees: ['mmustermann', 'test.pr.mitarbeiter1'],
      optionalAttendees: []
    };
    expect(wrapper.instance().addMeeting(pr)).toEqual(expected_result);
  });

  it('should create the meeting details with two required attendees and one optional attendee', () => {
    let shallow = createShallow({ dive: true });
    let wrapper = shallow(
      <StyledComponent
        meeting={null}
        fetchAppointments={fetchAppointmentsMock}
      />
    );

    wrapper.setState({
      date: '2018-08-01',
      startTime: '14:00',
      endTime: '15:00'
    });

    let prWithReviewer = Object.assign({}, pr, {
      reviewer: {
        id: 4,
        firstName: 'John',
        lastName: 'Doe',
        login: 'john.doe'
      }
    });

    let expected_result = {
      prById: prWithReviewer,
      start: '2018-08-01T12:00+00:00',
      end: '2018-08-01T13:00+00:00',
      location: '',
      requiredAttendees: ['mmustermann', 'john.doe'],
      optionalAttendees: ['test.pr.mitarbeiter1']
    };
    expect(wrapper.instance().addMeeting(prWithReviewer)).toEqual(
      expected_result
    );
  });
});
