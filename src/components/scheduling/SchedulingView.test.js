import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { SchedulingView } from './SchedulingView';
import MeetingView from './MeetingDetailsView';

describe('SchedulingView', () => {
  let testPr = {
    id: 1,
    employee: {
      id: 2,
      login: 'test.pr.mitarbeiter1',
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    },
    supervisor: {
      id: 1,
      login: 'test.pr.vorgesetzter',
      firstName: 'Volker',
      lastName: 'Vorgesetzter'
    }
  };

  const appointmentsSearchMock = jest.fn();
  const fetchMeetingMock = jest.fn();
  const appointmentsSearchResults = {};

  beforeEach(() => {
    appointmentsSearchMock.mockClear();
    fetchMeetingMock.mockClear();
  });

  it('should match snapshot', () => {
    let component = shallow(
      <SchedulingView
        prDetail={testPr}
        prById={testPr.id}
        meeting={null}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        fetchMeeting={fetchMeetingMock}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('takes the employee and supervisor from the PR and saves it to its state', () => {
    let component = shallow(
      <SchedulingView
        prDetail={testPr}
        prById={testPr.id}
        meeting={null}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        fetchMeeting={fetchMeetingMock}
      />
    );
    const expectedComponentState = {
      employee: {
        id: testPr.employee.login,
        name: `${testPr.employee.firstName} ${testPr.employee.lastName}`,
        role: 'Ich',
        show: false
      },
      supervisor: {
        id: testPr.supervisor.login,
        name: `${testPr.supervisor.firstName} ${testPr.supervisor.lastName}`,
        role: 'Vorgesetzter',
        show: false
      }
    };

    expect(component.instance().state).toEqual(expectedComponentState);
  });

  it('displays a MeetingView if the meeting is not null', () => {
    let component = shallow(
      <SchedulingView
        prDetail={testPr}
        prById={testPr.id}
        meeting={{
          start: undefined,
          end: undefined,
          location: undefined,
          requiredAttendees: [],
          optionalAttendees: []
        }}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        fetchMeeting={fetchMeetingMock}
      />
    );

    expect(component.contains(<MeetingView />)).toBeTruthy();
  });

  it("only shows the employee's toggle and appointments, if it is the only employee object in the PR.", () => {
    const newPr = { employee: testPr.employee };
    let component = shallow(
      <SchedulingView
        prDetail={newPr}
        prById={testPr.id}
        meeting={null}
        appointmentsSearchResults={{
          [newPr.employee.login]: { appointments: [] }
        }}
        appointmentsSearch={appointmentsSearchMock}
        fetchMeeting={fetchMeetingMock}
      />
    );

    expect(component.find('PersonToggle')).toHaveLength(1);
    expect(
      component
        .find('WithStyles(TimeTable)')
        .dive()
        .dive()
        .find('WithStyles(Attendee)')
    ).toHaveLength(1);
  });

  it('fetches the appointments and meeting on mount', () => {
    shallow(
      <SchedulingView
        prDetail={testPr}
        prById={testPr.id}
        meeting={null}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        fetchMeeting={fetchMeetingMock}
      />
    );

    expect(appointmentsSearchMock).toHaveBeenCalledTimes(1);
    expect(appointmentsSearchMock.mock.calls[0][0]).toBe(
      `${testPr.employee.login},${testPr.supervisor.login}`
    );
    expect(appointmentsSearchMock.mock.calls[0][1]).toBe(
      moment()
        .local()
        .format('YYYY-MM-DD')
    );
    expect(fetchMeetingMock).toHaveBeenCalledTimes(1);
    expect(fetchMeetingMock.mock.calls[0][0]).toBe(testPr.id);
  });

  it('changes the visibility/PersonToggle of the attendee if onVisibilityChange is called.', () => {
    let component = shallow(
      <SchedulingView
        prDetail={testPr}
        prById={testPr.id}
        meeting={null}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        fetchMeeting={fetchMeetingMock}
      />
    );

    component.instance().onVisibilityChange('supervisor')();

    expect(component.instance().state.supervisor.show).toBe(true);
  });
});
