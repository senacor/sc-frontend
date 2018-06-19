import ROLES from './roles';

export const hasRole = (role, userroles) => {
  return userroles.includes(role);
};

export const isEmployee = (userroles = []) => {
  return userroles.includes('PR_Mitarbeiter');
};

export const isSupervisor = userroles => {
  return userroles.includes(ROLES.PR_CST_LEITER);
};
