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

it('sets loading on FETCH_PRS_REQUEST', () => {
  const stateBefore = {
    isLoading: false,
    list: []
  };
  const action = {
    type: 'FETCH_PRS_REQUEST'
  };

  const stateAfter = tasks(stateBefore, action);

  expect(stateAfter).toEqual({
    isLoading: true,
    list: []
  });
});

it('sets tasks and loading on FETCH_PRS_RESPONSE', () => {
  const stateBefore = {
    list: [],
    isLoading: true
  };
  const action = {
    type: 'FETCH_PRS_RESPONSE',
    tasks: []
  };

  const stateAfter = tasks(stateBefore, action);

  expect(stateAfter).toEqual({
    isLoading: false,
    list: []
  });
});

it('sets loading on ADD_PR_REQUEST', () => {
  const stateBefore = {
    isLoading: false,
    list: []
  };
  const action = {
    type: 'ADD_PR_REQUEST'
  };

  const stateAfter = tasks(stateBefore, action);

  expect(stateAfter).toEqual({
    isLoading: true,
    list: []
  });
});

it('sets tasks and loading on ADD_PR_RESPONSE', () => {
  const stateBefore = {
    list: [],
    isLoading: true
  };
  const action = {
    type: 'ADD_PR_RESPONSE',
    tasks: []
  };

  const stateAfter = tasks(stateBefore, action);

  expect(stateAfter).toEqual({
    isLoading: false,
    list: []
  });
});

it('sets tasks and loading on ERROR_RESPONSE', () => {
  const stateBefore = {
    list: [],
    isLoading: true
  };
  const action = {
    type: 'ERROR_RESPONSE',
    tasks: []
  };

  const stateAfter = tasks(stateBefore, action);

  expect(stateAfter).toEqual({
    isLoading: false,
    list: []
  });
});
