import { default as fetch } from '../../helper/customFetch';

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
    console.log('employees', responseEmployees);

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
    console.log('response', responsePrs);
    setIsLoading(false);
    setPrs(responsePrs.prs);
    setArchivedPrs(responsePrs.archivedPrs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};
