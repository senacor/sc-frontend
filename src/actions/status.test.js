import { addPrStatus } from './status';
import { prStatusEnum } from '../helper/prStatus';
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
    fetchMock.putOnce('/api/v2/prs/1/status', {
      prId: 1,
      statuses: [prStatusEnum.RELEASED_SHEET_REVIEWER]
    });
    fetchMock.getOnce('/api/v1/prs/1', prAfter);

    const store = mockStore();
    await store.dispatch(
      addPrStatus(prBefore, prStatusEnum.RELEASED_SHEET_REVIEWER)
    );

    expect(store.getActions()).toEqual([
      { type: dispatchTypes.ADD_PR_STATUS_REQUEST },
      {
        type: dispatchTypes.ADD_PR_STATUS_RESPONSE,
        payload: { prId: 1, statuses: [prStatusEnum.RELEASED_SHEET_REVIEWER] }
      },
      { type: dispatchTypes.FETCH_PR_BY_ID_REQUEST },
      { type: dispatchTypes.ERROR_GONE },
      {
        type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
        prById: prAfter
      }
    ]);
  });

  it('should add status and update finalization if sheet is finalized', async () => {
    let prBefore = {
      id: 1,
      prFinalizationStatus: {
        finalizationStatusOfEmployee: 'NOT_FINALIZED',
        finalizationStatusOfReviewer: 'NOT_FINALIZED'
      }
    };
    let prAfter = Object.assign(
      {},
      {
        id: 1,
        prStatusEntries: [prStatusEnum.FINALIZED_REVIEWER],
        prFinalizationStatus: {
          finalizationStatusOfEmployee: 'NOT_FINALIZED',
          finalizationStatusOfReviewer: 'FINALIZED'
        }
      }
    );
    fetchMock.putOnce('/api/v2/prs/1/status', {
      prId: 1,
      statuses: [prStatusEnum.FINALIZED_REVIEWER]
    });
    fetchMock.getOnce('/api/v1/prs/1', prAfter);

    const store = mockStore();
    await store.dispatch(
      addPrStatus(prBefore, prStatusEnum.FINALIZED_REVIEWER)
    );

    expect(store.getActions()).toEqual([
      { type: dispatchTypes.ADD_PR_STATUS_REQUEST },
      {
        type: dispatchTypes.ADD_PR_STATUS_RESPONSE,
        payload: { prId: 1, statuses: [prStatusEnum.FINALIZED_REVIEWER] }
      },
      { type: dispatchTypes.FETCH_PR_BY_ID_REQUEST },
      { type: dispatchTypes.ERROR_GONE },
      {
        type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
        prById: prAfter
      }
    ]);
  });

  it('should add status and update finalization if sheet is finalized by employee', async () => {
    let prBefore = {
      id: 1,
      prFinalizationStatus: {
        finalizationStatusOfEmployee: 'NOT_FINALIZED',
        finalizationStatusOfReviewer: 'NOT_FINALIZED'
      }
    };
    let prAfter = {
      id: 1,
      prStatusEntries: [prStatusEnum.FINALIZED_EMPLOYEE],
      prFinalizationStatus: {
        finalizationStatusOfEmployee: 'FINALIZED',
        finalizationStatusOfReviewer: 'NOT_FINALIZED'
      }
    };
    fetchMock.putOnce('/api/v2/prs/1/status', {
      prId: 1,
      statuses: [prStatusEnum.FINALIZED_EMPLOYEE]
    });
    fetchMock.getOnce('/api/v1/prs/1', prAfter);

    const store = mockStore();
    await store.dispatch(
      addPrStatus(prBefore, prStatusEnum.FINALIZED_EMPLOYEE)
    );

    expect(store.getActions()).toEqual([
      { type: dispatchTypes.ADD_PR_STATUS_REQUEST },
      {
        type: dispatchTypes.ADD_PR_STATUS_RESPONSE,
        payload: { prId: 1, statuses: [prStatusEnum.FINALIZED_EMPLOYEE] }
      },
      { type: dispatchTypes.FETCH_PR_BY_ID_REQUEST },
      { type: dispatchTypes.ERROR_GONE },
      {
        type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
        prById: prAfter
      }
    ]);
  });
});
