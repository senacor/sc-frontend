import React from 'react';
import { shallow } from 'enzyme';
import { SchedulingView } from './SchedulingView';

describe('SchedulingView', () => {
  let pr = {
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

  const meeting = {
    start: '2018-09-11T15:18:00.000+0000',
    end: '2018-09-11T16:18:00.000+0000',
    location: null,
    requiredAttendees: {
      'test.pr.vorgesetzter': {
        name: 'PR Vorgesetzter',
        email: 'test.pr.vorgesetzter@senacor.com',
        status: 'UNKNOWN'
      },
      'test.pr.mitarbeiter1': {
        name: 'PR Mitarbeiter1',
        email: 'test.pr.mitarbeiter1@senacor.com',
        status: 'UNKNOWN'
      }
    },
    optionalAttendees: {},
    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/prs/1/meetings'
      }
    }
  };

  const fetchMeetingMock = jest.fn();

  beforeEach(() => {
    fetchMeetingMock.mockClear();
  });

  it('should match snapshot', () => {
    let component = shallow(<SchedulingView prDetail={pr} meeting={null} />);

    expect(component).toMatchSnapshot();
  });

  it('should display subcomponent MeetingCreator if meeting is null', () => {
    let component = shallow(<SchedulingView prDetail={pr} meeting={null} />);

    expect(component.find('Connect(MeetingCreator)')).toHaveLength(1);
  });

  it('should not display subcomponent MeetingCreator if prDetail is not available', () => {
    let component = shallow(<SchedulingView prDetail={null} meeting={null} />);

    expect(component.find('Connect(MeetingCreator)').exists()).toBeFalsy();
  });

  it('should display subcomponent MeetingViewDetails if meeting is not null', () => {
    let component = shallow(<SchedulingView prDetail={pr} meeting={meeting} />);

    expect(component.find('WithStyles(MeetingDetailsView)')).toHaveLength(1);
  });
});
