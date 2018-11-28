import { SET_PR_TAB } from '../helper/dispatchTypes';
import { prTabEnum } from '../helper/prTabEnum';

export const prTabs = (state = prTabEnum.DETAIL_VIEW, action) => {
  switch (action.type) {
    case SET_PR_TAB: {
      return action.payload;
    }
    default:
      return state;
  }
};
