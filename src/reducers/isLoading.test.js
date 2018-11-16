import isLoading from './isLoading';
import * as dispatchTypes from '../helper/dispatchTypes';

describe('isLoading', () => {
  const requestList = [
    { type: dispatchTypes.FETCH_PRS_REQUEST, action: 'FETCH_PRS' },
    { type: dispatchTypes.FETCH_PR_BY_ID_REQUEST, action: 'FETCH_PR_BY_ID' },
    { type: dispatchTypes.LOGIN_REQUEST, action: 'LOGIN' }
  ];

  const responseList = [
    { type: dispatchTypes.ADD_PR_RESPONSE, action: 'ADD_PR' },
    { type: dispatchTypes.ERROR_RESPONSE, action: 'ERROR' },
    { type: dispatchTypes.FETCH_PRS_RESPONSE, action: 'FETCH_PRS' },
    { type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE, action: 'FETCH_PR_BY_ID' },
    { type: dispatchTypes.LOGIN_RESPONSE, action: 'LOGIN' },
    { type: dispatchTypes.LOGIN_UNAUTHORIZED, action: 'LOGIN_UNAUTHORIZED' },
    { type: dispatchTypes.LOGOUT, action: 'LOGOUT' }
  ];

  requestList.forEach(state => {
    it(`sets loading on ${state.type}`, () => {
      const stateBefore = { isLoading: false, action: [] };
      const action = {
        type: state.type
      };

      const stateAfter = isLoading(stateBefore, action);

      expect(stateAfter).toEqual({
        isLoading: true,
        action: [state.action]
      });
    });
  });

  responseList.forEach(state => {
    it(`sets loading on ${state.type}`, () => {
      const stateBefore = { isLoading: true, action: [state.action] };
      const action = {
        type: state.type
      };

      const stateAfter = isLoading(stateBefore, action);

      expect(stateAfter).toEqual({
        isLoading: false,
        action: []
      });
    });
  });
});
