import { fetchAllPrsForHumanResource } from './prs';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  FETCH_PRS_HR_RESPONSE,
  FETCH_PRS_HR_REQUEST
} from '../helper/dispatchTypes';

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
