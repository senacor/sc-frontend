export const fetchTasks = () => async dispatch => {
  dispatch({
    type: 'FETCH_TASKS_REQUEST'
  });
  dispatch({
    type: 'ERROR_GONE',
    hasError: false
  });

  const response = await fetch(process.env.REACT_APP_API + '/api/v1/tasks');
  if (response.ok) {
    const data = await response.json();
    const tasks = data._embedded ? data._embedded.taskResponseList : [];
    console.log(tasks);

    dispatch({
      type: 'FETCH_TASKS_RESPONSE',
      tasks
    });
  } else {
    dispatch({
      type: 'ERROR_RESPONSE',
      hasError: true
    });
  }
};
export const fetchPrs = () => async dispatch => {
  dispatch({
    type: 'FETCH_PRS_REQUEST'
  });
  dispatch({
    type: 'ERROR_GONE',
    hasError: false
  });

  const response = await fetch(process.env.REACT_APP_API + '/api/v1/prs');
  if (response.ok) {
    const data = await response.json();
    const prs = data._embedded ? data._embedded.prResponseList : [];

    dispatch({
      type: 'FETCH_PRS_RESPONSE',
      prs
    });
  } else {
    dispatch({
      type: 'ERROR_RESPONSE',
      hasError: true
    });
  }
};

export const editTask = newTask => async dispatch => {
  dispatch({
    type: 'EDIT_TASK_REQUEST'
  });

  const changeResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v1/tasks/${newTask.id}`,
    {
      method: 'put',
      mode: 'cors',
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
