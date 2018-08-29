import { combineReducers } from 'redux';
import objectGet from 'object-get';
import * as dispatchTypes from '../helper/dispatchTypes';
import * as finalizationTypes from '../helper/prFinalization';

export const prFinalizationStatus = (
  state = {
    isFinalizedByEmployee: false,
    isFinalizedByReviewer: false
  },
  action
) => {
  switch (action.type) {
    case dispatchTypes.FETCHED_PR_VISIBILITY:
      return {
        isFinalizedByEmployee:
          objectGet(
            action,
            'prFinalizationStatus.finalizationStatusOfEmployee'
          ) === finalizationTypes.FINALIZED,
        isFinalizedByReviewer:
          objectGet(
            action,
            'prFinalizationStatus.finalizationStatusOfReviewer'
          ) === finalizationTypes.FINALIZED
      };
    default:
      return state;
  }
};

const prFinalizationStatusById = combineReducers({ prFinalizationStatus });

export default prFinalizationStatusById;
