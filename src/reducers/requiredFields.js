import * as dispatchTypes from '../helper/dispatchTypes';

export const requiredFields = (
  state = { employee: true, reviewer: true },
  action
) => {
  switch (action.type) {
    case dispatchTypes.REQUIRED_FIELDS:
      return action.payload;
    default:
      return state;
  }
};
