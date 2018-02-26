export const fetchTasks = () => async dispatch => {
  dispatch({
    type: 'FETCH_TASKS_REQUEST'
  });

  const response = await fetch(process.env.REACT_APP_API + '/api/v1/tasks');
  const data = await response.json();
  const tasks = data._embedded ? data._embedded.taskResponseList : [];

  dispatch({
    type: 'FETCH_TASKS_RESPONSE',
    tasks
  });
};
