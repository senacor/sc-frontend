import { default as fetch } from '../helper/customFetch';
import { addAttributeToArchivedPrs, addAttributeToPrs } from './employees';

export const fetchPrById = async (
  prsId,
  afterPrFetched,
  setIsLoading,
  error
) => {
  setIsLoading(true);
  error.hide();

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
    error.showGeneral();
  }
};

export const fetchInactivePrById = async (
  prsId,
  afterPrFetched,
  setIsLoading,
  error
) => {
  setIsLoading(true);
  error.hide();

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/inactive/employee/pr/${prsId}`
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
    error.showGeneral();
  }
};

export const addReflections = async (
  prsId,
  firstReflectionField,
  secondReflectionField,
  error,
  infoContext
) => {
  error.hide();
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
    error.showGeneral();
  }
};

export const addRatings = async (
  prsId,
  rating,
  targetRole,
  advancementStrategies,
  error,
  infoContext
) => {
  error.hide();
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
    error.showGeneral();
  }
};

export const addFinalCommentEmployee = async (
  prsId,
  finalCommentEmployee,
  error,
  infoContext
) => {
  if (!finalCommentEmployee) {
    showSavedInfoMessage(infoContext);
    return;
  }

  error.hide();
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
    error.showGeneral();
  }
};

export const addFinalCommentHr = async (
  prsId,
  finalCommentHr,
  error,
  infoContext
) => {
  if (!finalCommentHr) {
    showSavedInfoMessage(infoContext);
    return;
  }

  error.hide();
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
    error.showGeneral();
  }
};

export const addPr = async (loginName, setLoading, setPr, error) => {
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
    error.showGeneral();
    setLoading(false);
  }
};

export const requestPrForEmployees = async (
  employeeIds,
  onSuccess,
  infoContext,
  error
) => {
  const requestPrResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/employee/selected`,
    {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(employeeIds)
    }
  );

  if (requestPrResponse.ok) {
    let pr = await requestPrResponse.json();

    const employeeNames = pr.map(
      employee => `${employee.firstName} ${employee.lastName}`
    );
    const employeesResultSentence = `${employeeNames.join(', ')}.`;

    infoContext.setValue({
      hasInfos: true,
      messageId: 'pr.started',
      messageVars: {
        employees:
          employeesResultSentence.length > 1 ? employeesResultSentence : '-'
      }
    });

    onSuccess(pr);
  } else {
    error.showGeneral();
  }
};

export const addPrStatus = async (prsId, status, afterPrFetched, error) => {
  const addResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/status?prStatus=${status}`,
    {
      method: 'post',
      mode: 'cors'
    }
  );

  if (addResponse.ok) {
    const setIsLoading = () => {}; //ignoring loading aspect
    fetchPrById(prsId, afterPrFetched, setIsLoading, error);
  } else {
    error.showGeneral();
  }
};

export const delegateReviewer = async (prId, reviewerId, updatePr, error) => {
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
        error
      );
    }
  } catch (err) {
    error.showGeneral();
  }
};

const showSavedInfoMessage = infoContext => {
  infoContext.setValue({
    hasInfos: true,
    messageId: 'pr.saved'
  });
};

// Redirecting to PR sheet
export const linkToPr = (id, archived, history) => {
  if (!archived) {
    history.push(`/prDetail/${id}`);
  }
  return null;
};

export const getOwnPrs = async (
  setOwnPrs,
  setOwnArchivedPrs,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/pr/overview/own`
    );
    const responseOwnPrs = await response.json();

    let archivedPrs = [...responseOwnPrs.archivedPrs];
    let prs = [...responseOwnPrs.prs];
    addAttributeToArchivedPrs(archivedPrs);
    addAttributeToPrs(prs);

    setIsLoading(false);
    setOwnPrs(prs);
    setOwnArchivedPrs(archivedPrs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getPrsToReview = async (setPrs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/pr/overview/prsToReview`
    );
    const responsePrs = await response.json();

    setIsLoading(false);
    setPrs(responsePrs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getPrsInProgress = async (setPrs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/pr/overview/hrAll`
    );
    const responsePrs = await response.json();

    setIsLoading(false);
    setPrs(responsePrs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getDeclinedPrs = async (isHr, setPrs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/pr/overview/` +
        (isHr ? 'declinedBySupervisor' : 'declinedByHr')
    );
    const responsePrs = await response.json();

    setIsLoading(false);
    setPrs(responsePrs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getPrsHrTodo = async (setPrs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/pr/overview/hrTodo`
    );
    const responsePrs = await response.json();

    setIsLoading(false);
    setPrs(responsePrs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const declinePr = async (prsId, status, afterPrDeclined, error) => {
  const addResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/status?prStatus=${status}`,
    {
      method: 'post',
      mode: 'cors'
    }
  );

  if (addResponse.ok) {
    afterPrDeclined();
  } else {
    error.showGeneral();
  }
};

export const undecline = async (prsId, callback, error) => {
  const addResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}/resetDecline`,
    {
      method: 'post',
      mode: 'cors'
    }
  );

  if (addResponse.ok) {
    callback();
  } else {
    error.showGeneral();
  }
};
