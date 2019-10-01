import ROLES from './roles';
import objectGet from 'object-get';

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

export const hasRoleInPrBasedOnUserName = (pr, userinfo) => roles => {
  let hasRoleInPr = false;
  roles.forEach(function(item) {
    if (objectGet(pr, `${item}.login`) === userinfo.username) {
      hasRoleInPr = true;
    }
  });
  return hasRoleInPr;
};
