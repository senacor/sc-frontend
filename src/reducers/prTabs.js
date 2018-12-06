import {
  ADD_PR_STATUS_RESPONSE,
  REQUIRED_FIELDS,
  REVIEWER_INFO_RESPONSE,
  SET_PR_TAB
} from '../helper/dispatchTypes';
import { prTabEnum } from '../helper/prTabEnum';

export const prTabs = (state = prTabEnum.DETAIL_VIEW, action) => {
  switch (action.type) {
    case SET_PR_TAB: {
      return action.payload;
    }
    case REVIEWER_INFO_RESPONSE:
      return prTabEnum.DETAIL_VIEW;
    case REQUIRED_FIELDS:
      return prTabEnum.DETAIL_VIEW;
    case ADD_PR_STATUS_RESPONSE:
      return prTabEnum.DETAIL_VIEW;
    default:
      return state;
  }
};
