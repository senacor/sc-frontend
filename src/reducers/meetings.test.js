import { meeting } from './meetings';
import {
  ADD_MEETING_RESPONSE,
  FETCH_MEETING_RESPONSE
} from '../helper/dispatchTypes';

describe('meeting reducer', () => {
  it('should add a new Meeting for ADD_MEETING_RESPONSE', () => {
    let stateBefore = {};
    const testdata = {
      start: '2018-07-31T15:00:00.000+0000',
      end: '2018-07-31T16:00:00.000+0000',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendees: [
        {
          name: 'PR Mitarbeiter2',
          email: 'test.pr.mitarbeiter2@senacor.com',
          status: 'UNKNOWN'
        }
      ],
      optionalAttendees: [],
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/meetings?prId=1'
        }
      }
    };

    const action = {
      type: ADD_MEETING_RESPONSE,
      meeting: testdata
    };

    const stateAfter = meeting(stateBefore, action);

    expect(stateAfter).toEqual(testdata);
  });

  it('should override an existing meeting for FETCH_MEETING_RESPONSE', () => {
    const stateBefore = {
      start: '2018-07-31T15:00:00.000+0000',
      end: '2018-07-31T16:00:00.000+0000',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendees: [
        {
          name: 'PR Mitarbeiter2',
          email: 'test.pr.mitarbeiter2@senacor.com',
          status: 'UNKNOWN'
        }
      ],
      optionalAttendees: [],
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/meetings?prId=1'
        }
      }
    };

    const testdata = {
      start: '2018-07-31T15:00:00.000+0000',
      end: '2018-07-31T16:00:00.000+0000',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendees: [
        {
          name: 'PR Mitarbeiter2',
          email: 'test.pr.mitarbeiter2@senacor.com',
          status: 'DECLINE'
        }
      ],
      optionalAttendees: [],
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/meetings?prId=1'
        }
      }
    };

    const action = {
      type: FETCH_MEETING_RESPONSE,
      meeting: testdata
    };

    const stateAfter = meeting(stateBefore, action);

    expect(stateAfter).toEqual(testdata);
  });
});
