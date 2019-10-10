import { default as fetch } from '../helper/customFetch';

export const getAllEmployees = async (
  setEmployees,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/employee/all`
    );

    const responseEmployees = await response.json();

    setIsLoading(false);
    setEmployees(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const getAllPrsByEmployee = async (
  id,
  setPrs,
  setArchivedPrs,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/pr/overview/all/${id}`
    );
    const responsePrs = await response.json();
    let archivedPrs = [...responsePrs.archivedPrs];
    let prs = [...responsePrs.prs];
    addAttributeToArchivedPrs(archivedPrs);
    addAttributeToPrs(prs);

    setIsLoading(false);
    setPrs(prs);
    setArchivedPrs(archivedPrs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
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
      `${process.env.REACT_APP_API}/api/v3/employee/${employeeId}`
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
