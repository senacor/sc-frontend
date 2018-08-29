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
    case dispatchTypes.FETCHED_PR_FINALIZATION_STATUS:
      return {
        isFinalizedByEmployee:
          objectGet(
            action,
            'prFinalizationStatusById.finalizationStatusOfEmployee'
          ) === finalizationTypes.FINALIZED,
        isFinalizedByReviewer:
          objectGet(
            action,
            'prFinalizationStatusById.finalizationStatusOfReviewer'
          ) === finalizationTypes.FINALIZED
      };
    default:
      return state;
  }
};

const prFinalizationStatusById = combineReducers({ prFinalizationStatus });

export default prFinalizationStatusById;
