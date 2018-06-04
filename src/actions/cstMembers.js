import { default as fetch } from '../helper/customFetch';

export const getCstMembers = () => async dispatch => {
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/cstmembers?supervisorId=1`,
    {
      mode: 'cors'
    }
  );

  if (response.ok) {
    const cstMembers = await response.json();

    dispatch({
      type: 'FETCHED_CSTMEMBERS',
      cstMembers
    });
  }
};
