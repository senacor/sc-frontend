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
    const meeting_details = {
      start: '2018-07-31T17:00+02:00',
      end: '2018-07-31T18:00+02:00',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendees: ['test.pr.mitarbeiter2'],
      optionalAttendees: []
    };

    fetchMock.postOnce('/api/v1/prs/1/meetings', {
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
        }
      }
    ]);
  });

  it('tries to add a new meeting with invalid date', async () => {
    const meeting_details = {
      start: '2018-07-31T17:00+02:00',
      end: '2018-07-32T18:00+02:00',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendees: ['test.pr.mitarbeiter2'],
      optionalAttendees: []
    };

    const store = mockStore({ meeting: null });

    store.dispatch(addMeeting(meeting_details));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.ERROR_RESPONSE,
        httpCode: 400
      }
    ]);
  });

  it('tries to add a new meeting where provided end date is before start date', async () => {
    const meeting_details = {
      prId: 1,
      start: '2018-07-02T17:00+02:00',
      end: '2018-07-01T18:00+02:00',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendees: ['test.pr.mitarbeiter2'],
      optionalAttendees: []
    };

    const store = mockStore({ meeting: null });

    store.dispatch(addMeeting(meeting_details));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.ERROR_RESPONSE,
        httpCode: 400
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
    fetchMock.getOnce('/api/v1/prs/1/meetings', {
      start: '2018-07-31T15:00:00.000+0000',
      end: '2018-07-31T16:00:00.000+0000',
      location: '01 NUE Projekt Office 3 2.41 (6)',
      requiredAttendees: [
        {
          'test.pr.mitarbeiter2': {
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
              'test.pr.mitarbeiter2': {
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
        }
      }
    ]);
  });

  it('tries to fetch a meeting but a meeting does not exist yet', async () => {
    const response = {
      body: {
        timestamp: 1533905712110,
        status: 404,
        error: 'Not Found',
        message: 'The PR for which the meeting was requested has no meeting',
        path: '/api/v1/prs/1/meetings'
      },
      status: 404
    };
    fetchMock.getOnce('/api/v1/prs/1/meetings', response);

    const store = mockStore();

    await store.dispatch(fetchMeeting(1));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.FETCH_MEETING_REQUEST
      },
      {
        type: dispatchTypes.ERROR_RESPONSE,
        httpCode: 404
      }
    ]);
  });

  it('tries to fetch a meeting but meeting does not exist anymore in Outlook Exchange Store', async () => {
    const response = {
      body: {
        timestamp: 1533906311538,
        status: 500,
        error: 'Internal Server Error',
        message:
          'Binding an appointment from the exchange store did not work due to: The specified object was not found in the store.',
        path: '/api/v1/prs/1/meetings'
      },
      status: 500
    };
    fetchMock.getOnce('/api/v1/prs/1/meetings', response);

    const store = mockStore();

    await store.dispatch(fetchMeeting(1));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.FETCH_MEETING_REQUEST
      },
      {
        type: dispatchTypes.ERROR_RESPONSE,
        httpCode: 500
      }
    ]);
  });
});
