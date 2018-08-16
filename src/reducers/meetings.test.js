import { meeting } from './meetings';
import {
  ADD_MEETING_RESPONSE,
  FETCH_MEETING_RESPONSE,
  ADD_PR_RESPONSE
} from '../helper/dispatchTypes';

const meetingPrototype = {
  start: '2018-07-31T15:00:00.000+0000',
  end: '2018-07-31T16:00:00.000+0000',
  location: '01 NUE Projekt Office 3 2.41 (6)',
  requiredAttendees: [
    {
      test_pr_mitarbeiter2: {
        name: 'PR Mitarbeiter2',
        email: 'test.pr.mitarbeiter2@senacor.com',
        status: 'UNKNOWN'
      }
    }
  ],
  optionalAttendees: [],
  _links: {
    self: {
      href: 'http://localhost:8010/api/v1/prs/1/meetings'
    }
  }
};

describe('meeting reducer', () => {
  it('should add a new Meeting for ADD_MEETING_RESPONSE', () => {
    let stateBefore = {};

    const action = {
      type: ADD_MEETING_RESPONSE,
      meeting: meetingPrototype
    };

    const stateAfter = meeting(stateBefore, action);

    expect(stateAfter).toEqual(meetingPrototype);
  });

  it('should override an existing meeting for successful FETCH_MEETING_RESPONSE', () => {
    const stateBefore = meetingPrototype;

    const meeting1 = {
      start: '2018-07-31T15:00:00.000+0000',
      end: '2018-07-31T16:00:00.000+0000',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendees: [
        {
          test_pr_mitarbeiter2: {
            name: 'PR Mitarbeiter2',
            email: 'test.pr.mitarbeiter2@senacor.com',
            status: 'DECLINE'
          }
        }
      ],
      optionalAttendees: [],
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1/meetings'
        }
      }
    };

    const action = {
      type: FETCH_MEETING_RESPONSE,
      meeting: meeting1
    };

    const stateAfter = meeting(stateBefore, action);

    expect(stateAfter).toEqual(meeting1);
  });

  it('should override an existing meeting for null response from FETCH_MEETING_RESPONSE', () => {
    const stateBefore = meetingPrototype;

    const action = {
      type: FETCH_MEETING_RESPONSE,
      meeting: null
    };

    const stateAfter = meeting(stateBefore, action);

    expect(stateAfter).toEqual(null);
  });

  it('should return state as it was before when non-matching action is dispatched', () => {
    let stateBefore = meetingPrototype;

    const action = {
      type: ADD_PR_RESPONSE,
      pr: {}
    };

    const stateAfter = meeting(stateBefore, action);

    expect(stateAfter).toEqual(meetingPrototype);
  });
});
