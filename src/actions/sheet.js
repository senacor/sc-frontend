import { default as fetch } from '../helper/customFetch';

export const addRating = (
  prById,
  category,
  comment,
  rating,
  ratingId
) => async dispatch => {
  dispatch({
    type: 'ADD_COMMENT_REQUEST'
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
      type: 'ADD_COMMENT_RESPONSE',
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
    type: 'ADD_TEXT_REQUEST'
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
      type: 'ADD_TEXT_RESPONSE',
      prReflectionSet
    });
  }
};
