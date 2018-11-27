import * as dispatchTypes from '../helper/dispatchTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { addFilter, getFilterPossibilities } from './filter';
import FILTER_GROUPS from '../components/humanResources/filterGroups';
import HR_ELEMENTS from '../components/humanResources/hrElements';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addFilter', () => {
  it('should dispatch ADD_SUBFILTER with filterGroup, filterBy and filter', async () => {
    let payload = {
      filterGroup: FILTER_GROUPS.HR,
      filterBy: HR_ELEMENTS.EMPLOYEE,
      filter: {
        searchString: 'employee=502',
        values: 'Michaela Mitarbeiterin'
      }
    };
    const store = mockStore();
    await store.dispatch(addFilter(payload));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.ADD_SUBFILTER,
        payload
      }
    ]);
  });
});

describe('getFilterPossibilities', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch FILTER_POSSIBILITIES_RESPONSE on valid response', async () => {
    let data = { levels: ['1', '2'] };
    fetchMock.getOnce('/api/v1/prs/filter', data);
    const store = mockStore();

    await store.dispatch(getFilterPossibilities());

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.FILTER_POSSIBILITIES_REQUEST
      },
      {
        type: dispatchTypes.FILTER_POSSIBILITIES_RESPONSE,
        payload: data
      }
    ]);
  });
});
