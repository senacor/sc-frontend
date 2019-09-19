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
