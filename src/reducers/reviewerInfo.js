import { REVIEWER_INFO_RESPONSE } from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const reviewerInfo = (
  state = { numberOfPrsToReview: 0, numberOfPrsToSupervise: 0 },
  action
) => {
  switch (action.type) {
    case REVIEWER_INFO_RESPONSE:
      const reviewerInfo = cloneDeep(state);
      reviewerInfo.numberOfPrsToReview =
        action.payload.reviewerInfo.numberOfPrsToReview;
      reviewerInfo.numberOfPrsToSupervise =
        action.payload.reviewerInfo.numberOfPrsToSupervise;
      return reviewerInfo;

    default:
      return state;
  }
};
