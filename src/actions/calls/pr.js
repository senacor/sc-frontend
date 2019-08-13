import { default as fetch } from '../../helper/customFetch';
import generateMapById from '../../helper/generateMapById';
import * as dispatchTypes from '../../helper/dispatchTypes';

export const fetchPrById = async (
  prsId,
  afterPrFetched,
  setIsLoading,
  errorContext
) => {
  setIsLoading(true);
  errorContext.setValue({ hasErrors: false, message: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}`
  );
  if (response.ok) {
    const prById = await response.json();
    if (prById.competence === undefined) {
      prById.competence = 'CONSULTING';
    }
    afterPrFetched(prById);
    setIsLoading(false);
    return prById;
  } else {
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: false,
      message: 'Es wurde Fehler aufgetreten: ' + response.status
    });
  }
};

export const fetchFilteredPrs = async (filter, role, setData, setIsLoading) => {
  setIsLoading(true);

  let query = '';
  if (filter) {
    let filterString = Object.keys(filter)
      .map(function(key) {
        return filter[key].searchString;
      })
      .join('&');
    query = filterString ? '&' + filterString : '';
  }

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/prs?role=${role}${query}`
  );

  if (response.ok) {
    const responseList = await response.json();
    let prTableEntries = responseList ? responseList : [];

    // if query contains '=&' or ends with '=', that means in some filter there is nothing selected
    // so table entries will be empty
    if (query.includes('=&') || query.endsWith('=')) {
      prTableEntries = [];
    }

    const resultDataArray = Object.values(
      generateMapById(prTableEntries, 'prId')
    );
    setData(resultDataArray);
    setIsLoading(false);
  } else {
    //TODO: add error handling
  }
};

export const fetchFilteredPrsForHumanResource = async (
  filter,
  role,
  setData,
  setIsLoading
) => {
  setIsLoading(true);

  let query = '';
  if (filter) {
    let filterString = Object.keys(filter)
      .map(function(key) {
        return filter[key].searchString;
      })
      .join('&');
    query = filterString ? '?' + filterString : '';
  }
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/prs?role=HR&${query}`
  );

  if (response.ok) {
    const responseList = await response.json();
    const prTableEntries = responseList ? responseList : [];
    const resultDataArray = Object.values(
      generateMapById(prTableEntries, 'prId')
    );
    setData(resultDataArray);
    setIsLoading(false);
  } else {
    //TODO: add error handling
  }
};
