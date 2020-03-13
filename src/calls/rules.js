import { default as fetch } from '../helper/customFetch';

export const getIgnoreList = async (setIgnoreList, setIsLoading, error) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/ignore-list`
    );
    const responseList = await response.json();
    setIsLoading(false);
    setIgnoreList(responseList);
  } catch (err) {
    setIgnoreList([]);
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const saveIgnoreList = async (ignorelist, afterSave, error, info) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/ignore-list`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(ignorelist)
      }
    );

    if (response.ok) {
      afterSave();
      info.msg('autorules.save.success');
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const getAllPeriods = async (setPeriods, setIsLoading, error) => {
  try {
    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/period`);
    const periodsResponse = await response.json();
    const periods = periodsResponse.map(p => ({
      period: p.name,
      from: p.displayProcessStart,
      to: p.displayProcessEnd,
      scGeneration: p.scAutoGeneration,
      scEnd: p.scProcessEnd,
      payrollReport: p.payrollReport
    }));
    setIsLoading(false);
    setPeriods(periods);
  } catch (err) {
    setPeriods([]);
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const savePeriods = async (periods, afterSave, error, info) => {
  try {
    const periodsDTO = periods.map(p => ({
      name: p.period,
      displayProcessStart: p.from,
      displayProcessEnd: p.to,
      scAutoGeneration: p.scGeneration,
      scProcessEnd: p.scEnd,
      payrollReport: p.payrollReport
    }));

    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/period`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(periodsDTO)
    });

    if (response.ok) {
      afterSave();
      info.msg('autorules.save.success');
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};
