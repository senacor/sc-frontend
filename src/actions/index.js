import { default as fetch } from '../helper/customFetch';
import * as dispatchTypes from '../helper/dispatchTypes';

export { addRating, addEmployeeContribution } from './sheet';
export { login, logout } from './login';
export { getUserInfo, getUserPhoto, getUserRoles } from './userinfo';
export { prSearch } from './employeeSearch';
export { getCstMembers } from './cstMembers';

export const fetchTasks = () => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_TASKS_REQUEST
  });
  dispatch({
    type: dispatchTypes.ERROR_GONE
  });

  const response = await fetch(process.env.REACT_APP_API + '/api/v1/tasks');
  if (response.ok) {
    const data = await response.json();
    const tasks = data._embedded ? data._embedded.taskResponseList : [];
    dispatch({
      type: dispatchTypes.FETCH_TASKS_RESPONSE,
      tasks
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};

export const fetchPrs = () => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_PRS_REQUEST
  });
  dispatch({
    type: dispatchTypes.ERROR_GONE
  });

  const response = await fetch(process.env.REACT_APP_API + '/api/v1/prs');
  if (response.ok) {
    const data = await response.json();
    const prs = data._embedded ? data._embedded.prResponseList : [];

    dispatch({
      type: dispatchTypes.FETCH_PRS_RESPONSE,
      prs
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};

export const editTask = newTask => async dispatch => {
  dispatch({
    type: dispatchTypes.EDIT_TASK_REQUEST
  });

  const changeResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v1/tasks/${newTask.id}`,
    {
      method: 'put',
      mode: 'cors',
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
    type: dispatchTypes.EDIT_TASK_RESPONSE,
    task
  });
};

export const addPr = () => async dispatch => {
  dispatch({
    type: dispatchTypes.ADD_PR_REQUEST
  });

  const changeResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs`,
    {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        occasion: 'ON_DEMAND',
        supervisor: 'ttran',
        deadline: '2018-03-14',
        employeeId: 1
      })
    }
  );
  const pr = await changeResponse.json();

  dispatch({
    type: dispatchTypes.ADD_PR_RESPONSE,
    pr
  });
};

export const fetchPrById = prsId => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_PR_BY_ID_REQUEST
  });
  dispatch({
    type: dispatchTypes.ERROR_GONE
  });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${prsId}`
  );
  if (response.ok) {
    const prById = await response.json();

    dispatch({
      type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
      prById
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};

export const delegateReviewer = (prId, reviewerId) => async dispatch => {
  dispatch({
    type: dispatchTypes.DELEGATE_REVIEWER_REQUEST
  });

  const changeResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${prId}/delegation`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        reviewerEmployeeId: reviewerId
      })
    }
  );

  const prNewReviewer = await changeResponse.json();
  if (changeResponse.ok) {
    dispatch({
      type: dispatchTypes.DELEGATE_REVIEWER_RESPONSE,
      prNewReviewer: prNewReviewer
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: changeResponse.status
    });
  }
};

export const changePrSortOrder = sortOrder => async dispatch => {
  dispatch({
    type: dispatchTypes.CHANGE_SORT_ORDER,
    sortOrder: sortOrder
  });
};
