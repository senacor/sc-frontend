import { addMeeting, fetchMeeting } from './meetings';
import * as dispatchTypes from '../helper/dispatchTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addMeeting', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('adds a new meeting and triggers the actions', async () => {
    let meeting_details = {
      prId: 1,
      start: '2018-07-31T17:00+02:00',
      end: '2018-07-31T18:00+02:00',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendeeIds: [4],
      optionalAttendeeIds: []
    };

    fetchMock.postOnce('/api/v1/meetings', {
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
    });
    const store = mockStore();

    await store.dispatch(addMeeting(meeting_details));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.ADD_MEETING_REQUEST
      },
      {
        type: dispatchTypes.ADD_MEETING_RESPONSE,
        meeting: {
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
        }
      }
    ]);
  });
});

describe('fetchMeeting', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('fetches an existing meeting and triggers the actions', async () => {
    fetchMock.getOnce('/api/v1/meetings?prId=1', {
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
    });
    const store = mockStore();

    await store.dispatch(fetchMeeting(1));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.FETCH_MEETING_REQUEST
      },
      {
        type: dispatchTypes.FETCH_MEETING_RESPONSE,
        meeting: {
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
        }
      }
    ]);
  });
});
