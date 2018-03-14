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

export const changeTask = newTask => async dispatch => {
  dispatch({
    type: 'CHANGE_TASK'
  });

  const change = await fetch(process.env.REACT_APP_API + '/api/v1/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: {
      description: newTask.description,
      title: newTask.title,
      username: newTask.username,
      deadline: newTask.deadline,
      type: newTask.type,
      linkToDetails: newTask.linkToDetails,
      status: newTask.status
    }
  });

  dispatch({
    type: 'CHANGE_TASK_RESPONSE'
  });
};

///action type is: change, notChange
