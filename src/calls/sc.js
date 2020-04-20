import { default as fetch } from '../helper/customFetch';
import { SC_STATUS } from '../helper/scSheetData';

export const savePerformanceData = async (
  scId,
  type,
  data,
  template,
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
        body: JSON.stringify({
          data: data,
          template: template.data
        })
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

    if (responseScData.publishedReviewerData.dailyBusiness.length === 0) {
      responseScData.publishedReviewerData.dailyBusiness.push({
        title: '',
        weight: 0
      });
    }
    if (responseScData.publishedReviewerData.project.length === 0) {
      responseScData.publishedReviewerData.project.push({
        title: '',
        weight: 0
      });
    }
    setSc(responseScData);
    afterScFetched(responseScData);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getScsByStatus = async (status, setScs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/overview/hr/${status}`
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
    const statusDTO =
      status === SC_STATUS.SC_WITHOUT_PR_PRESET
        ? SC_STATUS.WITHOUT_PR
        : status === SC_STATUS.SC_WITH_PR_PRESET
        ? SC_STATUS.WITH_PR
        : status;
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/status?scStatus=${statusDTO}&classification=${classification}`,
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

export const saveScInit = async (
  scId,
  status,
  classification,
  dailyBusinesses,
  projects,
  initScTemplate,
  setSc,
  setIsLoading,
  error,
  afterScFetched,
  info
) => {
  try {
    const statusDTO =
      status === SC_STATUS.WITHOUT_PR
        ? SC_STATUS.SC_WITHOUT_PR_PRESET
        : status === SC_STATUS.WITH_PR
        ? SC_STATUS.SC_WITH_PR_PRESET
        : status;

    const template = initScTemplate
      ? {
          dailyBusinesses: initScTemplate.data.dailyBusiness.map(entry => ({
            title: entry.title,
            weight: entry.weight
          })),
          projects: initScTemplate.data.project.map(entry => ({
            title: entry.title,
            weight: entry.weight
          }))
        }
      : null;
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/saveInit?scStatus=${statusDTO}&classification=${classification}`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
          data: {
            dailyBusinesses: dailyBusinesses,
            projects: projects
          },
          template: template
        })
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

export const publishScInit = async (
  scId,
  status,
  classification,
  dailyBusinesses,
  projects,
  initScTemplate,
  setSc,
  setIsLoading,
  error,
  afterScFetched,
  info
) => {
  try {
    const statusDTO =
      status === SC_STATUS.SC_WITHOUT_PR_PRESET
        ? SC_STATUS.WITHOUT_PR
        : status === SC_STATUS.SC_WITH_PR_PRESET
        ? SC_STATUS.WITH_PR
        : status;

    const template = initScTemplate
      ? {
          dailyBusinesses: initScTemplate.data.dailyBusiness.map(entry => ({
            title: entry.title,
            weight: entry.weight
          })),
          projects: initScTemplate.data.project.map(entry => ({
            title: entry.title,
            weight: entry.weight
          }))
        }
      : null;
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/publishInit?scStatus=${statusDTO}&classification=${classification}`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
          data: {
            dailyBusinesses: dailyBusinesses,
            projects: projects
          },
          template: template
        })
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

export const addScStatus = async (
  scId,
  status,
  setSc,
  setIsLoading,
  error,
  afterScFetched,
  info
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

export const getEmployeeScsToImport = async (
  employeeId,
  setScs,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/employee/${employeeId}/sc/all-for-import`
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

export const savePercentage = async (scId, skillsPercentage, info, error) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/sc/${scId}/percentage?skillsPercentage=${skillsPercentage}`,
      {
        method: 'post',
        mode: 'cors'
      }
    );
    if (response.ok) {
      info.msg('sc.saved');
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const importLastSc = async (
  scId,
  setSc,
  setIsLoading,
  error,
  afterScFetched
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/initImportLast`,
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
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const cleanInitImport = async (
  scId,
  setSc,
  setIsLoading,
  error,
  afterScFetched
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/cleanInitImport`,
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
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const importFromSpecificSc = async (
  scId,
  scFromId,
  setSc,
  setIsLoading,
  error,
  afterScFetched
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/sc/${scId}/initImport/${scFromId}`,
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
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};
