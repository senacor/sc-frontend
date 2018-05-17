const addRating = (
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
      headers: { 'Content-Type': 'application/json' },
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

export default addRating;
