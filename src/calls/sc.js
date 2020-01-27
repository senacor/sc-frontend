import { default as fetch } from '../helper/customFetch';

export const savePerformanceData = async (
  scId,
  type,
  data,
  info,
  error,
  setSc,
  setIsLoading,
  afterScFetched
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/data/${type}`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      info.msg('sc.saved');
      fetchScById(scId, setSc, setIsLoading, error, afterScFetched);
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const createScForEmployee = async (
  employeeId,
  setScs,
  setIsLoading,
  info,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${employeeId}`,
      { method: 'post', mode: 'cors' }
    );

    if (response.status === 200) {
      info.msg('sc.saved');
      getEmployeeScs(employeeId, setScs, setIsLoading, error);
    }

    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const exportToPdf = async (scId, error) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/exportPdf`
    );
    return await response.blob();
  } catch (err) {
    error.showGeneral();
  }
};

export const exportToXlsx = async error => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/excel-export`
    );
    return await response.blob();
  } catch (err) {
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

export const saveWeightUpdate = async (
  scId,
  weightData,
  info,
  error,
  afterUpdate
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/weight`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(weightData)
      }
    );

    if (response.status === 200) {
      info.msg('sc.weight.saved');
      afterUpdate();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const publishScSectionData = async (
  scId,
  type,
  sectionData,
  withEvaluation,
  info,
  setIsLoading,
  error
) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/data/${type}/publish?evaluation=${withEvaluation}`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(sectionData)
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
  classification,
  dailyBusinesses,
  projects,
  setSc,
  setIsLoading,
  error,
  afterScFetched
) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/status?scStatus=${status}&classification=${classification}`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
          dailyBusinesses: dailyBusinesses,
          projects: projects
        })
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

export const removeScStatus = async (
  scId,
  status,
  setSc,
  setIsLoading,
  afterScFetched,
  info,
  error
) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/status/remove?scStatus=${status}`,
      {
        method: 'post',
        mode: 'cors'
      }
    );
    if (response.ok) {
      info.msg('scsheet.reopenSuccessful');
      fetchScById(scId, setSc, setIsLoading, error, afterScFetched);
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const getEmployeeScs = async (
  employeeId,
  setScs,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/${employeeId}/sc/all`
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

export const addGoal = async (scId, setSc, type, goal, error) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/goal/${type}`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({ title: goal })
      }
    );
    if (response.ok) {
      const responseBody = await response.json();
      setSc(responseBody);
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const removeGoal = async (scId, setSc, type, index, error) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/goal/${type}?index=${index}`,
      {
        method: 'delete',
        mode: 'cors'
      }
    );
    if (response.ok) {
      const responseBody = await response.json();
      setSc(responseBody);
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const archiveSc = async (scId, afterArchived, error) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/archive`,
      {
        method: 'post',
        mode: 'cors'
      }
    );
    if (response.ok) {
      afterArchived();
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const archiveAndCreateSc = async (scId, afterArchived, error) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/archivewithcreate`,
      {
        method: 'post',
        mode: 'cors'
      }
    );
    if (response.ok) {
      const responseBody = await response.json();
      afterArchived(responseBody);
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};
