import ROLES from './roles';

export const hasRole = (role, userroles) => {
  return userroles.includes(role);
};

export const isEmployee = (userroles = []) => {
  return (
    userroles.includes(ROLES.DEVELOPER) || userroles.includes(ROLES.CONSULTING)
  );
};

export const isSupervisor = (userroles = []) => {
  return userroles.includes(ROLES.SUPERVISOR);
};

export const isPersonalDev = (userroles = []) => {
  return userroles.includes(ROLES.PERSONAL_DEV);
};
