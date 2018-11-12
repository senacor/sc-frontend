import { Component } from 'react';
import { connect } from 'react-redux';

export class Authorized extends Component {
  userHasRole = role => {
    return this.props.userroles.includes(role);
  };

  userHasOneOfTheRoles = roles => {
    let i = 0;
    for (let role in roles) {
      if (this.userHasRole(roles[role])) {
        i++;
      }
    }
    return i > 0;
  };

  render() {
    const { roles, children } = this.props;

    if (!roles || this.userHasOneOfTheRoles(roles)) {
      return children;
    }

    return null;
  }
}

export default connect(state => ({
  userroles: state.userroles
}))(Authorized);
