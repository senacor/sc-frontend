import { prFinalizationStatus } from './getPrFinalizationStatus';
import {
  FETCHED_PR_FINALIZATION_STATUS,
  FETCHED_USERINFO
} from '../helper/dispatchTypes';
import { FINALIZED } from '../helper/prFinalization';

const prevState = {
  isFinalizedByEmployee: false,
  isFinalizedByReviewer: true
};

describe('prFinalizationStatus', () => {
  it('should return proper finalization status for reviewer and employee', () => {
    let action = {
      type: FETCHED_PR_FINALIZATION_STATUS,
      prFinalizationStatusById: {
        finalizationStatusOfEmployee: FINALIZED,
        finalizationStatusOfReviewer: FINALIZED
      }
    };

    const nextState = prFinalizationStatus(prevState, action);

    expect(nextState).toEqual({
      isFinalizedByEmployee: true,
      isFinalizedByReviewer: true
    });
  });

  it('should return state as it was before when non-matching action is dispatched', () => {
    let action = {
      type: FETCHED_USERINFO,
      prFinalizationStatus: {
        isFinalizedByEmployee: FINALIZED,
        isFinalizedByReviewer: FINALIZED
      }
    };

    const nextState = prFinalizationStatus(prevState, action);

    expect(nextState).toEqual({
      isFinalizedByEmployee: false,
      isFinalizedByReviewer: true
    });
  });
});
