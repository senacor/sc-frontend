import { default as fetch } from '../helper/customFetch';
import {
  FETCH_EMPLOYEES_REQUEST,
  ERROR_GONE,
  FETCH_EMPLOYEES_RESPONSE,
  ERROR_RESPONSE
} from '../helper/dispatchTypes';

let employeeSearchRequestCounter = 0;

export const employeeSearch = searchEmployee => async dispatch => {
  dispatch({
    type: FETCH_EMPLOYEES_REQUEST
  });
  dispatch({
    type: ERROR_GONE
  });

  employeeSearchRequestCounter++;
  let currentRequest = employeeSearchRequestCounter;
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/employees?query=${searchEmployee}`
  );
  if (currentRequest === employeeSearchRequestCounter) {
    if (response.ok) {
      const data = await response.json();
      const employees = data._embedded
        ? data._embedded.personSearchResponseList
        : [];
      dispatch({
        type: FETCH_EMPLOYEES_RESPONSE,
        employees
      });
    } else {
      dispatch({
        type: ERROR_RESPONSE,
        httpCode: response.status
      });
    }
  }
};

export const employeeSearchClear = () => async dispatch => {
  dispatch({
    type: FETCH_EMPLOYEES_RESPONSE,
    employees: []
  });
  dispatch({
    type: ERROR_GONE
  });
};
