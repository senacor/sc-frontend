import { default as fetch } from '../../helper/customFetch';

export const getRoles = async (setRoles, setIsLoading, errorContext) => {
  try {
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API}/api/v3/role`);

    const responseList = await response.json();
    const prTableEntries = responseList ? responseList : [];
    const prTableEntriesWithoutAdminAndOther = prTableEntries.filter(
      role => role.name !== 'ADMIN'
    );

    setIsLoading(false);
    setRoles(prTableEntriesWithoutAdminAndOther);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
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

    setIsLoading(false);
    setData(prTableEntries);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const setRoles = async (employeeId, roles, errorContext) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v3/role/${employeeId}`, {
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