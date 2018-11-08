import { Component } from 'react';
import { connect } from 'react-redux';

export class Authorized extends Component {
  userHasRole = role => {
    return this.props.userroles.includes(role);
  };

  render() {
    const { forRole, children } = this.props;

    if (!forRole || this.userHasRole(forRole)) {
      return children;
    }

    return null;
  }
}

export default connect(state => ({
  userroles: state.userroles
}))(Authorized);
