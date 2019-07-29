import { connect } from 'react-redux';

const Authorized = props => {
  const userHasRole = role => {
    return props.userroles.includes(role);
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

  if (!props.roles || userHasOneOfTheRoles(props.roles)) {
    return props.children;
  }

  return null;
};

export default connect(state => ({
  userroles: state.userroles
}))(Authorized);
