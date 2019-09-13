import { default as fetch } from '../../helper/customFetch';

export const getRoles = async (setRoles, setIsLoading, errorContext) => {
  try {
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API}/api/v3/role/`);

    const responseList = await response.json();
    const prTableEntries = responseList ? responseList : [];
    const prTableEntriesWithoutOther = prTableEntries.filter(
      role => role.name !== 'OTHER'
    );

    setRoles(prTableEntriesWithoutOther);
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

export const setRoles = async (employeeId, roles, errorContext) => {
  let body;
  if (roles.length === 0) {
    // if no role is selected, then OTHER should be added
    body = ['OTHER'];
  } else {
    // if some roles are selected, then OTHER should be removed
    body = roles.filter(role => role !== 'OTHER');
  }
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v3/role/${employeeId}`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(body)
    });
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};
