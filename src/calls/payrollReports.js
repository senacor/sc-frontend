import { default as fetch } from '../helper/customFetch';

export const loadPayrollReports = async (
  setReportsData,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/payroll-report`
    );

    if (response.ok) {
      const reports = await response.json();
      setReportsData(reports);
    } else {
      error.showGeneral();
    }
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    console.log(err);
    error.showGeneral();
  }
};

export const getLastPayrollReport = async (
  setLastPayrollReport,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/payroll-report/last`
    );

    if (response.ok) {
      const report = await response.json();
      setLastPayrollReport(report);
    } else {
      error.showGeneral();
    }
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    console.log(err);
    error.showGeneral();
  }
};

export const payrollReportXlsx = async (
  reportId,
  error
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/payroll-report/${reportId}`
    );
    return await response.blob();
  } catch (err) {
    error.showGeneral();
  }
};