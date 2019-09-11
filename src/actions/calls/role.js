import { default as fetch } from '../../helper/customFetch';
import { sortByLastName } from "../../helper/sort";

export const getRoles = async (
  setRoles,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/role/`
    );

    const responseList = await response.json();
    const prTableEntries = responseList ? responseList : [];

    setRoles(prTableEntries);
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
    let prTableEntries = responseList ? responseList : [];
    if (prTableEntries) {
      sortByLastName(prTableEntries);
    }

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

export const setRoles = async (
  employeeId,
  roles,
  errorContext
) => {
  try {
    await fetch(
      `${process.env.REACT_APP_API}/api/v3/role/${employeeId}`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(roles)
    });

  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};
