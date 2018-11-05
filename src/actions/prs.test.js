import {
  fetchAllPrsForHumanResource,
  fetchFilteredPrsForHumanResource,
  fetchFilteredPrs
} from './prs';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  FETCH_PRS_HR_RESPONSE,
  FETCH_PRS_HR_REQUEST,
  FETCH_FILTERED_PRS_HR_REQUEST,
  FETCH_OWN_PRS_REQUEST,
  FETCH_OWN_PRS_RESPONSE
} from '../helper/dispatchTypes';
import FILTER_GROUPS from '../components/humanResources/filterGroups';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchAllPrsForHumanResource redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch FETCH_PRS_HR_RESPONSE', async () => {
    const testdata = {
      _embedded: {
        performanceReviewTableEntryResponseList: [
          {
            prId: 4,
            employee: {
              id: 502,
              firstName: 'Michaela',
              lastName: 'Mitarbeiterin'
            },
            deadline: '2018-10-10',
            prOccasion: 'ON_DEMAND'
          },
          {
            prId: 5,
            employee: {
              id: 502,
              firstName: 'Michaela',
              lastName: 'Mitarbeiterin'
            },
            deadline: '2018-10-11',
            prOccasion: 'ON_DEMAND'
          }
        ]
      }
    };
    fetchMock.getOnce('/api/v1/hr/prs', {
      body: testdata
    });
    const store = mockStore();

    await store.dispatch(fetchAllPrsForHumanResource());

    expect(store.getActions()).toEqual([
      {
        type: FETCH_PRS_HR_REQUEST
      },
      {
        type: FETCH_PRS_HR_RESPONSE,
        payload: {
          prTableEntries: [
            {
              prId: 4,
              employee: {
                id: 502,
                firstName: 'Michaela',
                lastName: 'Mitarbeiterin'
              },
              deadline: '2018-10-10',
              prOccasion: 'ON_DEMAND'
            },
            {
              prId: 5,
              employee: {
                id: 502,
                firstName: 'Michaela',
                lastName: 'Mitarbeiterin'
              },
              deadline: '2018-10-11',
              prOccasion: 'ON_DEMAND'
            }
          ]
        }
      }
    ]);
  });
});

describe('fetchFilteredPrsForHumanResource redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch FETCH_FILTERED_PRS_HR_REQUEST', async () => {
    const testdata = {
      _embedded: {
        performanceReviewTableEntryResponseList: [
          {
            prId: 4,
            employee: {
              id: 502,
              firstName: 'Michaela',
              lastName: 'Mitarbeiterin'
            },
            deadline: '2018-10-10',
            prOccasion: 'ON_DEMAND'
          },
          {
            prId: 5,
            employee: {
              id: 502,
              firstName: 'Michaela',
              lastName: 'Mitarbeiterin'
            },
            deadline: '2018-10-11',
            prOccasion: 'ON_DEMAND'
          }
        ]
      }
    };
    const filter = { employee: { searchString: 'employee=502', value: '' } };
    fetchMock.getOnce('/api/v1/hr/prs?employee=502', {
      body: testdata
    });
    const store = mockStore();

    await store.dispatch(fetchFilteredPrsForHumanResource(filter));

    expect(store.getActions()).toEqual([
      {
        type: FETCH_FILTERED_PRS_HR_REQUEST
      },
      {
        type: FETCH_PRS_HR_RESPONSE,
        payload: {
          prTableEntries: [
            {
              prId: 4,
              employee: {
                id: 502,
                firstName: 'Michaela',
                lastName: 'Mitarbeiterin'
              },
              deadline: '2018-10-10',
              prOccasion: 'ON_DEMAND'
            },
            {
              prId: 5,
              employee: {
                id: 502,
                firstName: 'Michaela',
                lastName: 'Mitarbeiterin'
              },
              deadline: '2018-10-11',
              prOccasion: 'ON_DEMAND'
            }
          ]
        }
      }
    ]);
  });
});

describe('fetchFilteredPrs redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch FETCH_OWN_PRS_REQUEST', async () => {
    const testdata = {
      _embedded: {
        ownPrResponseList: [
          {
            prId: 4,
            employee: {
              id: 502,
              firstName: 'Michaela',
              lastName: 'Mitarbeiterin'
            },
            deadline: '2018-10-10',
            prOccasion: 'ON_DEMAND'
          },
          {
            prId: 5,
            employee: {
              id: 502,
              firstName: 'Michaela',
              lastName: 'Mitarbeiterin'
            },
            deadline: '2018-10-11',
            prOccasion: 'ON_DEMAND'
          }
        ]
      }
    };
    const filter = { employee: { searchString: 'employee=502', value: '' } };
    fetchMock.getOnce('/api/v1/prs?role=REVIEWER&employee=502', {
      body: testdata
    });
    const store = mockStore();

    await store.dispatch(fetchFilteredPrs(filter, FILTER_GROUPS.REVIEWER));

    expect(store.getActions()).toEqual([
      {
        type: FETCH_OWN_PRS_REQUEST
      },
      {
        type: FETCH_OWN_PRS_RESPONSE,
        payload: {
          prTableEntries: [
            {
              prId: 4,
              employee: {
                id: 502,
                firstName: 'Michaela',
                lastName: 'Mitarbeiterin'
              },
              deadline: '2018-10-10',
              prOccasion: 'ON_DEMAND'
            },
            {
              prId: 5,
              employee: {
                id: 502,
                firstName: 'Michaela',
                lastName: 'Mitarbeiterin'
              },
              deadline: '2018-10-11',
              prOccasion: 'ON_DEMAND'
            }
          ]
        }
      }
    ]);
  });
});
