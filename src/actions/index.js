import moment from 'moment';
import { default as fetch } from '../helper/customFetch';
import * as dispatchTypes from '../helper/dispatchTypes';

export {
  addRating,
  addEmployeeContribution,
  changeRatingTargetRole
} from './sheet';
export { changeLanguage } from './language';
export { login, logout } from './login';
export { appointmentsSearch, changeDate } from './appointments';
export { addPrStatus } from './status';
export { fetchFilteredPrsForHumanResource, fetchFilteredPrs } from './prs';
export {
  addFilter,
  deleteFilter,
  resetFilterGroup,
  getFilterPossibilities
} from './filter';

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

export const addPr = loginName => async dispatch => {
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
        deadline: moment()
          .add(1, 'months')
          .format('YYYY-MM-DD'),
        employeeLogin: loginName
      })
    }
  );

  if (changeResponse.ok) {
    const pr = await changeResponse.json();

    dispatch({
      type: dispatchTypes.ADD_PR_RESPONSE,
      pr
    });
  } else {
    const error = await changeResponse.json();
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: changeResponse.status,
      message: error.message
    });
  }
};

export const fetchPrById = prsId => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_PR_BY_ID_REQUEST
  });
  dispatch({
    type: dispatchTypes.ERROR_GONE
  });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}`
  );
  if (response.ok) {
    const prById = await response.json();

    dispatch({
      type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
      prById
    });
    return prById;
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
