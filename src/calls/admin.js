import { default as fetch } from '../helper/customFetch';

export const getRoles = async (setRoles, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/roles/standard`
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

export const getAllPatches = async (setPatchInfo, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/data-patch`
    );

    setIsLoading(false);
    if (response.ok) {
      const responseObject = await response.json();
      setPatchInfo(responseObject);
    } else {
      error.showGeneral();
    }
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const uploadPatchFile = async (
  file,
  setIsLoading,
  updatePatchInfo,
  info,
  error
) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/data-patch`,
      {
        method: 'post',
        mode: 'cors',
        body: formData
      },
      null,
      {}
    );
    if (response.ok) {
      const responseJson = await response.json();
      updatePatchInfo(responseJson);
    } else {
      error.showGeneral();
    }
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    console.log(err);
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
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/employee-with-roles/all`
    );

    const responseList = await response.json();
    if (response.ok && responseList && Array.isArray(responseList)) {
      let prTableEntries = responseList ? responseList : [];
      setData(prTableEntries);
    }
    setIsLoading(false);
  } catch (err) {
    setData([]);
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

    if (response.ok && data && Array.isArray(data)) {
      setData(data);
    }
    setIsLoading(false);
  } catch (err) {
    setData([]);
    console.log(err);
    error.showGeneral();
  }
};

export const addMaintenanceTeamMember = async (
  newMember,
  setMaintenanceData,
  error
) => {
  try {
    error.hide();
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/maintenance/member`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(newMember)
      }
    );
    await response.json();
    if (response.status === 400) {
      error.show('maintenance.error');
    } else {
      setMaintenanceData();
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const deleteMaintenanceTeamMember = async (dto, error) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v1/maintenance/member`, {
      method: 'delete',
      mode: 'cors',
      body: JSON.stringify(dto)
    });
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};
