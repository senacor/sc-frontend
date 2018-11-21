import isLoading from './isLoading';
import * as dispatchTypes from '../helper/dispatchTypes';

describe('isLoading', () => {
  [
    { type: dispatchTypes.ADD_PR_RESPONSE, isLoading: true },
    { type: dispatchTypes.ERROR_RESPONSE, isLoading: true },
    { type: dispatchTypes.ADD_PR_REQUEST, isLoading: false },
    { type: dispatchTypes.FETCH_PRS_RESPONSE, isLoading: true },
    { type: dispatchTypes.FETCH_PRS_REQUEST, isLoading: false },
    { type: dispatchTypes.FETCH_PRS_HR_RESPONSE, isLoading: true },
    { type: dispatchTypes.FETCH_PRS_HR_REQUEST, isLoading: false },
    { type: dispatchTypes.FETCH_OWN_PRS_RESPONSE, isLoading: true },
    { type: dispatchTypes.FETCH_OWN_PRS_REQUEST, isLoading: false },
    { type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE, isLoading: true },
    { type: dispatchTypes.FETCH_PR_BY_ID_REQUEST, isLoading: false },
    { type: dispatchTypes.LOGIN_REQUEST, isLoading: false },
    { type: dispatchTypes.LOGIN_RESPONSE, isLoading: true },
    { type: dispatchTypes.LOGIN_UNAUTHORIZED, isLoading: true },
    { type: dispatchTypes.LOGOUT, isLoading: true }
  ].forEach(state => {
    it(`sets loading on ${state.type}`, () => {
      const stateBefore = state.isLoading;
      const action = {
        type: state.type
      };

      const stateAfter = isLoading(stateBefore, action);

      expect(stateAfter).toEqual(!state.isLoading);
    });
  });
});
