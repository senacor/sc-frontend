import objectGet from 'object-get';
import { default as fetch } from '../helper/customFetch';
import { fetchPrById } from './index';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_RESPONSE,
  ADD_TEXT_REQUEST,
  ADD_TEXT_RESPONSE,
  CHANGE_RATING_TARGETROLE_REQUEST,
  CHANGE_RATING_TARGETROLE_RESPONSE,
  ERROR_RESPONSE
} from '../helper/dispatchTypes';
import * as dispatchTypes from '../helper/dispatchTypes';
import * as visibilityTypes from '../helper/prVisibility';

export const addRating = (
  prById,
  category,
  comment,
  rating,
  ratingId
) => async dispatch => {
  dispatch({
    type: ADD_COMMENT_REQUEST
  });

  await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${prById.id}/ratings/${ratingId}`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        comment: comment,
        rating: rating
      })
    }
  );

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${prById.id}/ratings`
  );

  if (response.ok) {
    const result = await response.json();
    const responseList = objectGet(result, '_embedded.prRatingResponseList');
    const prRatings = responseList ? responseList : [];

    dispatch({
      type: ADD_COMMENT_RESPONSE,
      payload: {
        prId: prById.id,
        prRatings
      }
    });
  }
};

export const addEmployeeContribution = (
  prById,
  category,
  text,
  reflectionSetId
) => async dispatch => {
  dispatch({
    type: ADD_TEXT_REQUEST
  });

  await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${
      prById.id
    }/reflections/${reflectionSetId}`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        text: text
      })
    }
  );

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${prById.id}/reflections`
  );

  if (response.ok) {
    const result = await response.json();
    const responseList = objectGet(
      result,
      '_embedded.prReflectionResponseList'
    );
    const prReflectionSet = responseList ? responseList : [];
    dispatch({
      type: ADD_TEXT_RESPONSE,
      payload: {
        prReflectionSet,
        prId: prById.id
      }
    });
  }
};

export const setVisibilityById = (
  prById,
  toEmployee = false,
  toSupervisor = false
) => async dispatch => {
  dispatch({
    type: dispatchTypes.CHANGE_PR_VISIBILITY_REQUEST
  });
  const changeResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${prById.id}/visibility`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        visibilityToEmployee: toEmployee
          ? visibilityTypes.VISIBLE
          : visibilityTypes.INVISIBLE,
        visibilityToReviewer: toSupervisor
          ? visibilityTypes.VISIBLE
          : visibilityTypes.INVISIBLE
      })
    }
  );
  await changeResponse.json();

  if (changeResponse.ok) {
    return fetchPrById(prById.id)(dispatch);
  } else {
    return dispatch({
      type: ERROR_RESPONSE,
      httpCode: changeResponse.status
    });
  }
};

export const changeRatingTargetRole = (
  prId,
  targetRoleName,
  rating
) => async dispatch => {
  dispatch({
    type: CHANGE_RATING_TARGETROLE_REQUEST
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${prId}/role/${targetRoleName}`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        rating: rating
      })
    }
  );

  if (response.ok) {
    const result = await response.json();
    const rating = objectGet(result, 'rating');
    dispatch({
      type: CHANGE_RATING_TARGETROLE_RESPONSE,
      payload: {
        prId,
        targetRoleName,
        rating
      }
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};

export const changeVisibilityForEmployee = pr => {
  let isVisibleToEmployee =
    pr.prVisibilityEntry.visibilityToEmployee === visibilityTypes.VISIBLE;
  let isVisibleToReviewer =
    pr.prVisibilityEntry.visibilityToReviewer === visibilityTypes.VISIBLE;
  return setVisibilityById(pr, !isVisibleToEmployee, isVisibleToReviewer);
};

export const changeVisibilityForReviewer = pr => {
  let isVisibleToEmployee =
    pr.prVisibilityEntry.visibilityToEmployee === visibilityTypes.VISIBLE;
  let isVisibleToReviewer =
    pr.prVisibilityEntry.visibilityToReviewer === visibilityTypes.VISIBLE;
  return setVisibilityById(pr, isVisibleToEmployee, !isVisibleToReviewer);
};
