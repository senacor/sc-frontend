import objectGet from 'object-get';
import { default as fetch } from '../helper/customFetch';
import * as dispatchTypes from '../helper/dispatchTypes';

export const addRating = (
  prById,
  category,
  comment,
  rating,
  ratingId
) => async dispatch => {
  dispatch({
    type: dispatchTypes.ADD_COMMENT_REQUEST
  });

  const response = await fetch(
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

  if (response.ok) {
    const prRating = await response.json();

    dispatch({
      type: dispatchTypes.ADD_COMMENT_RESPONSE,
      payload: {
        prId: prById.id,
        prRating
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
    type: dispatchTypes.ADD_TEXT_REQUEST
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
      type: dispatchTypes.ADD_TEXT_RESPONSE,
      payload: {
        prReflectionSet,
        prId: prById.id
      }
    });
  }
};

export const changeRatingTargetRole = (
  prId,
  targetRoleName,
  rating
) => async dispatch => {
  dispatch({
    type: dispatchTypes.CHANGE_RATING_TARGETROLE_REQUEST
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
      type: dispatchTypes.CHANGE_RATING_TARGETROLE_RESPONSE,
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

export const changeRequiredFields = check => async dispatch => {
  dispatch({
    type: dispatchTypes.REQUIRED_FIELDS,
    payload: check
  });
};
