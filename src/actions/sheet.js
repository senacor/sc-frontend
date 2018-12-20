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

export const changeFinalCommentHr = (id, finalCommentHr) => async dispatch => {
  dispatch({
    type: dispatchTypes.CHANGE_HR_COMMENT_REQUEST
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${id}/hrcomment`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        finalCommentHr: finalCommentHr
      })
    }
  );

  if (response.ok) {
    dispatch({
      type: dispatchTypes.CHANGE_HR_COMMENT_RESPONSE,
      payload: {
        prId: id,
        comment: finalCommentHr
      }
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};

export const changeAdvancementStrategies = (
  id,
  advancementStrategies
) => async dispatch => {
  dispatch({
    type: dispatchTypes.CHANGE_ADVANCEMENT_STRATEGIES_REQUEST
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${id}/advancement`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        advancementStrategies: advancementStrategies
      })
    }
  );

  if (response.ok) {
    dispatch({
      type: dispatchTypes.CHANGE_ADVANCEMENT_STRATEGIES_RESPONSE,
      payload: {
        prId: id,
        advancementStrategies: advancementStrategies
      }
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};

export const changeFinalCommentEmployee = (
  id,
  finalCommentEmployee
) => async dispatch => {
  dispatch({
    type: dispatchTypes.CHANGE_FINAL_COMMENT_REQUEST,
    finalCommentEmployee: finalCommentEmployee
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v2/prs/${id}/finalization`,
    {
      method: 'put',
      body: JSON.stringify({
        finalCommentEmployee: finalCommentEmployee
      })
    }
  );

  if (response.ok) {
    dispatch({
      type: dispatchTypes.CHANGE_FINAL_COMMENT_RESPONSE,
      payload: {
        prId: id,
        comment: finalCommentEmployee
      }
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
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
