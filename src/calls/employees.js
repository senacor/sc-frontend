import { default as fetch } from '../helper/customFetch';

export const getAllEmployees = async (setEmployees, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/scorecards/employee/all`
    );

    const responseEmployees = await response.json();

    setIsLoading(false);
    setEmployees(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const getInactiveEmployees = async (
  setEmployees,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/scorecards/inactive/employee/all`
    );

    const responseEmployees = await response.json();

    setIsLoading(false);
    setEmployees(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const addAttributeToArchivedPrs = arr => {
  arr.map(item => {
    return (item.archived = true);
  });
};
export const addAttributeToPrs = arr => {
  arr.map(item => {
    return (item.archived = false);
  });
};

export const getEmployeeById = async (
  employeeId,
  setEmployee,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/scorecards/employee/${employeeId}`
    );
    if (response.ok) {
      const employee = await response.json();
      setEmployee(employee);
    }
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};
