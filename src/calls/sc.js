import { default as fetch } from '../helper/customFetch';

export const savePerformanceData = async (scId, type, data, info, error) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/data/${type}`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(data)
      }
    );

    if (response.status === 200) {
      info.msg('sc.saved');
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const saveDelegation = async (
  scId,
  data,
  info,
  error,
  afterDelegation
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/delegate`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(data)
      }
    );

    if (response.status === 200) {
      info.msg('sc.delegation.saved');
    }
    afterDelegation();
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const getOwnScs = async (setOwnScs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/overview/own`
    );
    const responseOwnScs = await response.json();

    setIsLoading(false);
    setOwnScs(responseOwnScs.scs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

// Redirecting to sc
export const linkToSc = (id, history) => {
  history.push(`/scDetail/${id}`);
};

export const fetchScById = async (
  scId,
  setSc,
  setIsLoading,
  error,
  afterScFetched
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}`
    );
    const responseScData = await response.json();
    setIsLoading(false);
    setSc(responseScData);
    afterScFetched(responseScData);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getScsInProgress = async (setScs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/overview/hr/in-progress`
    );
    const responseScs = await response.json();

    setIsLoading(false);
    setScs(responseScs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getScsHrTodo = async (setScs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/overview/hr/todo`
    );
    const responseScs = await response.json();

    setIsLoading(false);
    setScs(responseScs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getScsToReview = async (setScs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/overview/scs-to-review`
    );
    const responseScs = await response.json();

    setIsLoading(false);
    setScs(responseScs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const addScType = async (
  scId,
  status,
  position,
  setSc,
  setIsLoading,
  error,
  afterScFetched
) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/status?scStatus=${status}&position=${position}`,
      {
        method: 'post',
        mode: 'cors'
      }
    );
    if (response.ok) {
      fetchScById(scId, setSc, setIsLoading, error, afterScFetched);
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const addScStatus = async (
  scId,
  status,
  setSc,
  setIsLoading,
  error,
  afterScFetched
) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/status?scStatus=${status}`,
      {
        method: 'post',
        mode: 'cors'
      }
    );
    if (response.ok) {
      fetchScById(scId, setSc, setIsLoading, error, afterScFetched);
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};
