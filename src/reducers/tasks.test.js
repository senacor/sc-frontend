import tasks from './tasks';

describe('isLoading', () => {
  [
    { type: 'ADD_PR_RESPONSE', isLoading: true },
    { type: 'ERROR_RESPONSE', isLoading: true },
    { type: 'ADD_PR_REQUEST', isLoading: false },
    { type: 'FETCH_PRS_RESPONSE', isLoading: true },
    { type: 'FETCH_PRS_REQUEST', isLoading: false },
    { type: 'FETCH_TASKS_RESPONSE', isLoading: true },
    { type: 'FETCH_TASKS_REQUEST', isLoading: false }
  ].forEach(state => {
    it(`sets tasks and loading on ${state.type}`, () => {
      const stateBefore = {
        list: [],
        isLoading: state.isLoading
      };
      const action = {
        type: state.type,
        tasks: []
      };

      const stateAfter = tasks(stateBefore, action);

      expect(stateAfter).toEqual({
        isLoading: !state.isLoading,
        list: []
      });
    });
  });
});
