import * as dispatchTypes from '../helper/dispatchTypes';

export const requiredFields = (
  state = { employee: true, reviewer: true },
  action
) => {
  switch (action.type) {
    case dispatchTypes.REQUIRED_FIELDS:
      return action.payload;
    case dispatchTypes.REVIEWER_INFO_RESPONSE:
      return { employee: true, reviewer: true };
    case dispatchTypes.SET_PR_TAB:
      return { employee: true, reviewer: true };
    case dispatchTypes.ADD_PR_STATUS_RESPONSE:
      return { employee: true, reviewer: true };
    default:
      return state;
  }
};
