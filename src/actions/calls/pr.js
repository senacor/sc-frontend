import { default as fetch } from '../../helper/customFetch';
import generateMapById from '../../helper/generateMapById';

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

export const addPr = async (loginName, setLoading, setPr, errorContext) => {
  setLoading(true);

  const changeResponse = await fetch(`${process.env.REACT_APP_API}/api/v3/pr`, {
    method: 'post',
    mode: 'cors'
  });

  if (changeResponse.ok) {
    const pr = await changeResponse.json();
    setPr(pr);
    setLoading(false);
  } else {
    const error = await changeResponse.json();
    errorContext.setValue({
      hasErrors: true,
      message: error.message
    });
    setLoading(false);
  }
};

export const addPrStatus = async (
  prById,
  status,
  afterPrFetched,
  errorContext
) => {
  const addResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prById.id}/status`,
    {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        status
      })
    }
  );

  if (addResponse.ok) {
    let response = await addResponse.json();
    console.log('NOTHING WITH THIS RESPONSE??? yes: ', response);
    const setIsLoading = () => {}; //ignoring loading aspect
    fetchPrById(prById.id, afterPrFetched, setIsLoading, errorContext);
  } else {
    errorContext.setValue({ hasErrors: true, message: addResponse.status });
  }
};

export const delegateReviewer = async (
  prId,
  reviewerId,
  setPr,
  errorContext
) => {
  const changeResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prId}/delegate`,
    {
      method: 'post',
      mode: 'cors',
      body: reviewerId
    }
  );

  await changeResponse.json();
  if (changeResponse.ok) {
    //updating PR because of reviewer change
    fetchPrById(
      prId,
      setPr,
      () => {}, //ignoring loading
      errorContext
    );
  } else {
    errorContext.setValue({ hasErrors: true, message: changeResponse.status });
  }
};
