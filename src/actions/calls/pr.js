import { default as fetch } from '../../helper/customFetch';
import generateMapById from '../../helper/generateMapById';

export const fetchPrById = async (
  prsId,
  afterPrFetched,
  setIsLoading,
  errorContext
) => {
  setIsLoading(true);
  errorContext.setValue({ hasErrors: false, messageId: '' });

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
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const addReflections = async (
  prsId,
  firstReflectionField,
  secondReflectionField,
  errorContext,
  infoContext
) => {
  errorContext.setValue({ hasErrors: false, messageId: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/reflections`,
    {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        firstReflectionField: firstReflectionField,
        secondReflectionField: secondReflectionField
      })
    }
  );
  if (response.ok) {
    showSavedInfoMessage(infoContext);
  } else {
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const addRatings = async (
  prsId,
  rating,
  targetRole,
  advancementStrategies,
  errorContext,
  infoContext
) => {
  errorContext.setValue({ hasErrors: false, messageId: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/review`,
    {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        rating: rating,
        targetRole: targetRole,
        advancementStrategies: advancementStrategies
      })
    }
  );
  if (response.ok) {
    showSavedInfoMessage(infoContext);
  } else {
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const addFinalCommentEmployee = async (
  prsId,
  finalCommentEmployee,
  errorContext,
  infoContext
) => {
  if (!finalCommentEmployee) {
    showSavedInfoMessage(infoContext);
    return;
  }

  errorContext.setValue({ hasErrors: false, messageId: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/commentEmployee`,
    {
      method: 'post',
      mode: 'cors',
      body: finalCommentEmployee
    }
  );
  if (response.ok) {
    showSavedInfoMessage(infoContext);
  } else {
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const addFinalCommentHr = async (
  prsId,
  finalCommentHr,
  errorContext,
  infoContext
) => {
  if (!finalCommentHr) {
    showSavedInfoMessage(infoContext);
    return;
  }

  errorContext.setValue({ hasErrors: false, messageId: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/commentHr`,
    {
      method: 'post',
      mode: 'cors',
      body: finalCommentHr
    }
  );
  if (response.ok) {
    showSavedInfoMessage(infoContext);
  } else {
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const fetchFilteredOwnPrs = async (
  filter,
  setData,
  setIsLoading,
  errorContext
) => {
  try {
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
      `${process.env.REACT_APP_API}/api/v3/pr/own${query}`
    );

    const responseList = await response.json();
    const prTableEntries = responseList ? responseList : [];
    const resultDataArray = Object.values(
      generateMapById(prTableEntries, 'prId')
    );
    setIsLoading(false);
    setData(resultDataArray);
  } catch (err) {
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const fetchFilteredPrsToReview = async (
  filter,
  setData,
  setIsLoading,
  errorContext
) => {
  try {
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
      `${process.env.REACT_APP_API}/api/v3/pr/prsToReview${query}`
    );

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
    setIsLoading(false);
    setData(resultDataArray);
  } catch (err) {
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const fetchFilteredAllPrs = async (
  filter,
  setData,
  setIsLoading,
  errorContext
) => {
  try {
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
      `${process.env.REACT_APP_API}/api/v3/pr/all${query}`
    );

    const responseList = await response.json();
    const prTableEntries = responseList ? responseList : [];
    const resultDataArray = Object.values(
      generateMapById(prTableEntries, 'prId')
    );
    setIsLoading(false);
    setData(resultDataArray);
  } catch (err) {
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
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
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setLoading(false);
  }
};

export const addPrStatus = async (
  prsId,
  status,
  afterPrFetched,
  errorContext
) => {
  const addResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/status?prStatus=${status}`,
    {
      method: 'post',
      mode: 'cors'
    }
  );

  if (addResponse.ok) {
    const setIsLoading = () => {}; //ignoring loading aspect
    fetchPrById(prsId, afterPrFetched, setIsLoading, errorContext);
  } else {
    errorContext.setValue({ hasErrors: true, messageId: 'message.error' });
  }
};

export const delegateReviewer = async (
  prId,
  reviewerId,
  updatePr,
  errorContext
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/pr/${prId}/delegate`,
      {
        method: 'post',
        mode: 'cors',
        body: reviewerId
      }
    );

    if (response.ok) {
      //updating PR because of reviewer change
      fetchPrById(
        prId,
        updatePr,
        () => {}, //ignoring loading
        errorContext
      );
    }
  } catch (err) {
    errorContext.setValue({ hasErrors: true, messageId: 'message.error' });
  }
};

const showSavedInfoMessage = infoContext => {
  window.scrollTo(0, 0);
  infoContext.setValue({
    hasInfos: true,
    messageId: 'pr.saved'
  });
};
