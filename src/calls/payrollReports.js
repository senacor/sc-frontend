import { default as fetch } from '../helper/customFetch';

export const loadPayrollReports = async (
  setReportsData,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(false);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/payroll-report`
    );

    if (response.ok) {
      const reports = await response.json();
      setReportsData(reports);
      setIsLoading(false);
    } else {
      error.showGeneral();
    }

  } catch (err) {
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