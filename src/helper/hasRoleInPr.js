import objectGet from 'object-get';

export const hasRoleInPrBasedOnUserName = (pr, userinfo) => roles => {
  let hasRoleInPr = false;
  roles.forEach(function(item) {
    if (objectGet(pr, `${item}.login`) === userinfo.userPrincipalName) {
      hasRoleInPr = true;
    }
  });
  return hasRoleInPr;
};
