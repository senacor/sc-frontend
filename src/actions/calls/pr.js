import { default as fetch } from '../../helper/customFetch';

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

export const sendReflections = async (
  prsId,
  firstReflectionField,
  secondReflectionField,
  //success,
  errorContext
) => {
  errorContext.setValue({ hasErrors: false, message: '' });
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
    //TODO success callback
  } else {
    errorContext.setValue({
      hasErrors: false,
      message: 'Es wurde Fehler aufgetreten: ' + response.status
    });
  }
};

export const sendRatings = async (
  prsId,
  rating,
  targetRole,
  advancementStrategies,
  //afterPrSent,
  errorContext
) => {
  errorContext.setValue({ hasErrors: false, message: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/review`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        rating: rating,
        targetRole: targetRole,
        advancementStrategies: advancementStrategies
      })
    }
  );
  if (response.ok) {
    //TODO success callback
  } else {
    errorContext.setValue({
      hasErrors: false,
      message: 'Es wurde Fehler aufgetreten: ' + response.status
    });
  }
};

export const sendFinalCommentEmployee = async (
  prsId,
  finalCommentEmployee,
  //afterPrSent,
  errorContext
) => {
  errorContext.setValue({ hasErrors: false, message: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/commentEmployee`,
    {
      method: 'put',
      mode: 'cors',
      body: finalCommentEmployee
    }
  );
  if (response.ok) {
    //TODO success callback
  } else {
    errorContext.setValue({
      hasErrors: false,
      message: 'Es wurde Fehler aufgetreten: ' + response.status
    });
  }
};

export const sendFinalCommentHr = async (
  prsId,
  finalCommentHr,
  //afterPrSent,
  setIsLoading,
  errorContext
) => {
  setIsLoading(true);
  errorContext.setValue({ hasErrors: false, message: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/commentHr`,
    {
      method: 'put',
      mode: 'cors',
      body: finalCommentHr
    }
  );
  if (response.ok) {
    const prById = await response.json();
    //afterPrFetched(prById);
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
