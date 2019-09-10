import { default as fetch } from '../../helper/customFetch';

let employeeSearchRequestCounter = 0;

export const employeeSearch = async (
  searchEmployee,
  setEmployeeSearchResults,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);
    employeeSearchRequestCounter++;
    let currentRequest = employeeSearchRequestCounter;
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/employees?query=${searchEmployee}`
    );
    if (currentRequest === employeeSearchRequestCounter) {
      const data = await response.json();
      const employees = data ? data : [];
      setEmployeeSearchResults(employees);
      setIsLoading(false);
    }
  } catch (err) {
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setIsLoading(false);
  }
};

export const getAllEmployeesWithRoles = async (
  setData,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/role/employee/all`
    );

    const responseList = await response.json();
    const prTableEntries = responseList ? responseList : [];

    setData(prTableEntries);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setIsLoading(false);
  }
};
