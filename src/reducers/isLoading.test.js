import isLoading from './isLoading';

describe('isLoading', () => {
  [
    { type: 'ADD_PR_RESPONSE', isLoading: true },
    { type: 'ERROR_RESPONSE', isLoading: true },
    { type: 'ADD_PR_REQUEST', isLoading: false },
    { type: 'FETCH_PRS_RESPONSE', isLoading: true },
    { type: 'FETCH_PRS_REQUEST', isLoading: false },
    { type: 'FETCH_TASKS_RESPONSE', isLoading: true },
    { type: 'FETCH_TASKS_REQUEST', isLoading: false },
    { type: 'FETCH_PR_BY_ID_RESPONSE', isLoading: true },
    { type: 'FETCH_PR_BY_ID_REQUEST', isLoading: false }
  ].forEach(state => {
    it(`sets tasks and loading on ${state.type}`, () => {
      const stateBefore = state.isLoading;
      const action = {
        type: state.type
      };

      const stateAfter = isLoading(stateBefore, action);

      expect(stateAfter).toEqual(!state.isLoading);
    });
  });
});
