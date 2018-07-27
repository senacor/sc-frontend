import { addPrStatus } from './status';
import { prStatusEnum } from '../components/pr/PrState';
import * as dispatchTypes from '../helper/dispatchTypes';
import * as visibilityTypes from '../helper/prVisibility';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addPrStatus', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should add status and update visibility if sheet is released', async () => {
    let prBefore = {
      id: 1,
      prVisibilityEntry: {
        visibilityToEmployee: visibilityTypes.INVISIBLE,
        visibilityToReviewer: visibilityTypes.INVISIBLE
      }
    };
    let prAfter = Object.assign(
      {},
      {
        id: 1,
        prStatusEntries: [prStatusEnum.RELEASED_SHEET_REVIEWER],
        prVisibilityEntry: {
          visibilityToEmployee: visibilityTypes.VISIBLE,
          visibilityToReviewer: visibilityTypes.INVISIBLE
        }
      }
    );
    fetchMock.putOnce('/api/v1/prs/1/status', {
      prId: 1,
      statuses: [prStatusEnum.RELEASED_SHEET_REVIEWER]
    });
    fetchMock.putOnce('/api/v1/prs/1/visibility', {
      prId: 1,
      visibilityToEmployee: visibilityTypes.VISIBLE,
      visibilityToReviewer: visibilityTypes.INVISIBLE
    });
    fetchMock.getOnce('/api/v1/prs/1', prAfter);

    const store = mockStore();
    await store.dispatch(
      addPrStatus(prBefore, prStatusEnum.RELEASED_SHEET_REVIEWER)
    );

    expect(store.getActions()).toEqual([
      { type: dispatchTypes.ADD_PR_STATUS_REQUEST },
      { type: dispatchTypes.CHANGE_PR_VISIBILITY_REQUEST },
      { type: dispatchTypes.FETCH_PR_BY_ID_REQUEST },
      { type: dispatchTypes.ERROR_GONE },
      {
        type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
        prById: prAfter
      }
    ]);
  });
});
