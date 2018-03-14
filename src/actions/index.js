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

export const editTask = newTask => async dispatch => {
  dispatch({
    type: 'EDIT_TASK_REQUEST'
  });

  const changeResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v1/tasks/${newTask.id}`,
    {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: newTask.description,
        title: newTask.title,
        username: newTask.username,
        deadline: newTask.deadline,
        type: newTask.type,
        linkToDetails: newTask.linkToDetails,
        status: newTask.status
      })
    }
  );
  const task = await changeResponse.json();

  dispatch({
    type: 'EDIT_TASK_RESPONSE',
    task
  });
};
