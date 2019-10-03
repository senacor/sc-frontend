import { default as fetch } from '../helper/customFetch';

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

export const getSystemInfo = async (setSystemInfo, errorContext) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/system/info`
    );

    const responseJson = await response.json();
    setSystemInfo(responseJson);
  } catch (err) {
    console.log(err);
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

export const getHealthcheckData = async (
  setData,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API}/api/v3/log/all`);
    const data = await response.json();

    setData(data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const deleteError = async (id, errorContext) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v3/log/delete/${id}`, {
      method: 'delete',
      mode: 'cors'
    });
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const getFeedbacks = async (setData, setIsLoading, errorContext) => {
  try {
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API}/api/v3/feedback/all`);
    const data = await response.json();

    setData(data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const deleteFeedbacks = async (ids, errorContext) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v3/feedback`, {
      method: 'delete',
      mode: 'cors',
      body: JSON.stringify(ids)
    });
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};
