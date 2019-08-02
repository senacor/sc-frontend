import { connect } from 'react-redux';

const Authorized = ({ userroles, roles, children }) => {
  const userHasRole = role => {
    return userroles.includes(role);
  };

  const userHasOneOfTheRoles = roles => {
    let i = 0;
    for (let role in roles) {
      if (userHasRole(roles[role])) {
        i++;
      }
    }
    return i > 0;
  };

  if (!roles || userHasOneOfTheRoles(roles)) {
    return children;
  }

  return null;
};

export default connect(state => ({
  userroles: state.userroles
}))(Authorized);
