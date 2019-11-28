import { default as fetch } from '../helper/customFetch';

export const getRoles = async (setRoles, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/role/all`
    );

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
    error.showGeneral();
  }
};

export const getSystemInfo = async (setSystemInfo, error) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/system/info`
    );

    const responseJson = await response.json();
    setSystemInfo(responseJson);
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const getAllEmployeesWithRoles = async (
  setData,
  setIsLoading,
  error
) => {
  //TODO: remove this comment or not? saasassss
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/employee-with-roles/all`
    );

    const responseList = await response.json();
    let prTableEntries = responseList ? responseList : [];

    setIsLoading(false);
    setData(prTableEntries);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const setRoles = async (employeeId, roles, error) => {
  try {
    await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/${employeeId}/roles`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(roles)
      }
    );
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const getHealthcheckData = async (setData, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/log/all`);
    const data = await response.json();

    setData(data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const deleteError = async (id, error) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v1/log/delete/${id}`, {
      method: 'delete',
      mode: 'cors'
    });
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const deleteAllErrors = async error => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v1/log/delete/all`, {
      method: 'delete',
      mode: 'cors'
    });
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const getMaintenanceTeam = async (setData, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/maintenance/member/all`
    );
    const data = await response.json();

    setData(data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const addMaintenanceTeamMember = async (
  id,
  maintenanceData,
  setMaintenanceData,
  error
) => {
  try {
    error.hide();
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/maintenance/member/${id}`,
      {
        method: 'post',
        mode: 'cors'
      }
    );
    const member = await response.json();
    if (response.status === 400) {
      error.show('maintenance.error');
    } else {
      let newData = maintenanceData.slice(0);
      newData.push(member);
      setMaintenanceData(newData);
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const deleteMaintenanceTeamMember = async (id, error) => {
  try {
    await fetch(
      `${process.env.REACT_APP_API}/api/v1/maintenance/member/${id}`,
      {
        method: 'delete',
        mode: 'cors'
      }
    );
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};
