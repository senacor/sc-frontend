import { default as fetch } from '../helper/customFetch';

export const prSearch = searchEmployee => async dispatch => {
  dispatch({
    type: 'FETCH_EMPLOYEES_REQUEST'
  });
  dispatch({
    type: 'ERROR_GONE'
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/employees?query=${searchEmployee}`
  );
  if (response.ok) {
    const data = await response.json();
    const employees = data._embedded
      ? data._embedded.personSearchResponseList
      : [];
    dispatch({
      type: 'FETCH_EMPLOYEES_RESPONSE',
      employees
    });
  } else {
    dispatch({
      type: 'ERROR_RESPONSE',
      httpCode: response.status
    });
  }
};
