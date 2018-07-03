import { default as fetch } from '../helper/customFetch';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_RESPONSE,
  ADD_TEXT_REQUEST,
  ADD_TEXT_RESPONSE
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
    const prRatings = await response.json();

    dispatch({
      type: ADD_COMMENT_RESPONSE,
      prRatings
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
    const prReflectionSet = await response.json();

    dispatch({
      type: ADD_TEXT_RESPONSE,
      prReflectionSet
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
  const task = await changeResponse.json();

  if (changeResponse.ok) {
    dispatch({
      type: dispatchTypes.CHANGE_PR_VISIBILITY_RESPONSE,
      task
    });
    Object.assign(prById.prVisibilityEntry, task);
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: changeResponse.status
    });
  }
};
