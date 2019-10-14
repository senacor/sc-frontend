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

export const deleteAllErrors = async errorContext => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v3/log/delete/all`, {
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

export const getMaintenanceTeam = async (
  setData,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/maintenance/member/all`
    );
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

export const addMaintenanceTeamMember = async (
  id,
  maintenanceData,
  setMaintenanceData,
  errorContext
) => {
  try {
    errorContext.setValue({ hasErrors: false, messageId: '', errors: {} });
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/maintenance/member/${id}`,
      {
        method: 'post',
        mode: 'cors'
      }
    );
    const member = await response.json();
    if (response.status === 400) {
      errorContext.setValue({
        hasErrors: true,
        messageId: 'maintenance.error'
      });
    } else {
      let newData = maintenanceData.slice(0);
      newData.push(member);
      setMaintenanceData(newData);
    }
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const deleteMaintenanceTeamMember = async (id, errorContext) => {
  try {
    await fetch(
      `${process.env.REACT_APP_API}/api/v3/maintenance/member/${id}`,
      {
        method: 'delete',
        mode: 'cors'
      }
    );
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};
