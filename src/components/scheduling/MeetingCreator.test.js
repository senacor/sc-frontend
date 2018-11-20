import React from 'react';
import { MeetingCreator } from './MeetingCreator';
import { shallow } from 'enzyme';
import moment from 'moment';

describe('MeetingCreatorForm', () => {
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

  const userinfo = { userPrincipalName: 'mmustermann' };

  const appointmentsSearchMock = jest.fn();
  const appointmentsSearchResults = {};

  beforeEach(() => {
    appointmentsSearchMock.mockClear();
  });

  it('should match snapshot', () => {
    let component = shallow(
      <MeetingCreator
        prDetail={pr}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        userinfo={userinfo}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should display the subcomponent MeetingCreatorForm ', () => {
    let component = shallow(
      <MeetingCreator
        prDetail={pr}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        userinfo={userinfo}
      />
    );

    expect(
      component.find('Connect(WithStyles(MeetingCreatorForm))').exists()
    ).toBeTruthy();
  });

  it('changes the visibility/PersonToggle of the attendee if onVisibilityChange is called.', () => {
    let component = shallow(
      <MeetingCreator
        prDetail={pr}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        userinfo={userinfo}
      />
    );

    component.instance().onVisibilityChange('supervisor')();

    expect(component.instance().state.supervisor.show).toBe(false);
  });

  it('fetches the appointments on mount', () => {
    let selectedDate = moment()
      .local()
      .format('YYYY-MM-DD');

    shallow(
      <MeetingCreator
        prDetail={pr}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        selectedDate={selectedDate}
        userinfo={userinfo}
      />
    );

    expect(appointmentsSearchMock).toHaveBeenCalledTimes(1);
    expect(appointmentsSearchMock.mock.calls[0][0]).toBe(
      `${pr.employee.login},${pr.supervisor.login}`
    );
    expect(appointmentsSearchMock.mock.calls[0][1]).toBe(
      moment()
        .local()
        .format('YYYY-MM-DD')
    );
  });

  it('takes the employee and supervisor from the PR and saves it to its state', () => {
    let component = shallow(
      <MeetingCreator
        prDetail={pr}
        appointmentsSearchResults={appointmentsSearchResults}
        appointmentsSearch={appointmentsSearchMock}
        userinfo={userinfo}
      />
    );
    const expectedComponentState = {
      employee: {
        id: pr.employee.login,
        name: `${pr.employee.firstName} ${pr.employee.lastName}`,
        role: 'Ich',
        show: true
      },
      supervisor: {
        id: pr.supervisor.login,
        name: `${pr.supervisor.firstName} ${pr.supervisor.lastName}`,
        role: 'Vorgesetzte/r',
        show: true
      }
    };

    expect(component.instance().state).toEqual(expectedComponentState);
  });
});
