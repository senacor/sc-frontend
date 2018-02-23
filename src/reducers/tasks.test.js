import tasks from './tasks';

it('sets loading on FETCH_TASK_REQUEST', () => {
  const stateBefore = {
    list: ['task'],
    isLoading: false
  };
  const action = {
    type: 'FETCH_TASKS_REQUEST'
  };

  const stateAfter = tasks(stateBefore, action);

  expect(stateAfter).toEqual({
    isLoading: true,
    list: ['task']
  });
});

it('sets tasks and loading on FETCH_TASK_RESPONSE', () => {
  const stateBefore = {
    list: ['task'],
    isLoading: true
  };
  const action = {
    type: 'FETCH_TASKS_RESPONSE',
    tasks: ['task2']
  };

  const stateAfter = tasks(stateBefore, action);

  expect(stateAfter).toEqual({
    isLoading: false,
    list: ['task2']
  });
});
