import { default as fetch } from '../helper/customFetch';

export const getAllEmployees = async (setEmployees, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/all`
    );

    let responseEmployees = await response.json();

    setIsLoading(false);
    setEmployees(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    setEmployees([]);
    error.showGeneral();
  }
};

export const getAllEmployeesForImport = async (
  setEmployees,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/all-for-import`
    );

    let responseEmployees = await response.json();

    setIsLoading(false);
    setEmployees(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    setEmployees([]);
    error.showGeneral();
  }
};

export const getActiveEmployees = async (setEmployees, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/active`
    );

    let responseEmployees = await response.json();

    setIsLoading(false);
    setEmployees(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    setEmployees([]);
    error.showGeneral();
  }
};

export const getInactiveEmployees = async (
  setEmployees,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/inactive/employee/all`
    );

    const responseEmployees = await response.json();

    setIsLoading(false);
    setEmployees(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    setEmployees([]);
    error.showGeneral();
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
      `${process.env.REACT_APP_API}/api/v1/employee/${employeeId}`
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

export const getEmployeesInTeam = async (
  setEmployeesInTeam,
  employeeId,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/${employeeId}/team`
    );

    const responseEmployees = await response.json();

    setIsLoading(false);
    setEmployeesInTeam(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    setEmployeesInTeam([]);
    error.showGeneral();
  }
};

export const saveReviewers = async (data, info, error) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/reviewers`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(data)
      }
    );

    if (response.status === 200) {
      info.msg('sc.saved');
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const changeSupervisor = async (
  employeeId,
  supervisorId,
  info,
  error
) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/employee/${employeeId}/supervisor?supervisorId=${supervisorId}`,
      {
        method: 'post',
        mode: 'cors'
      }
    );

    if (response.status === 200) {
      info.msg('sc.saved');
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const getPlannedLeavings = async (
  setPlannedLeavings,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/plannedLeavings`
    );

    const responseEmployees = await response.json();

    setIsLoading(false);
    setPlannedLeavings(responseEmployees);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    setPlannedLeavings([]);
    error.showGeneral();
  }
};

export const getEmployeesWithoutSupervisor = async (
  setEmployeesWithoutSupervisor,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/newEmployees`
    );

    if (response.ok) {
      const responseEmployees = await response.json();
      setEmployeesWithoutSupervisor(responseEmployees);
    } else {
      setEmployeesWithoutSupervisor([]);
      error.showGeneral();
    }
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    setEmployeesWithoutSupervisor([]);
    error.showGeneral();
  }
};

export const assignSupervisorsToEmployees = async (
  data,
  setIsLoading,
  info,
  error
) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employee/assign-supervisors`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      info.msg('sc.saved');
    } else {
      error.showGeneral();
    }
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};
