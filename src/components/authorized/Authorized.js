import { Component } from 'react';
import { connect } from 'react-redux';
import ROLES from '../../helper/roles';
import { getReviewerInfo } from '../../reducers/selector';

export class Authorized extends Component {
  userHasRole = role => {
    if (
      role === ROLES.PR_REVIEWER &&
      (this.props.numberOfPrsToReview > 0 ||
        this.props.userroles.includes(ROLES.PR_CST_LEITER))
    ) {
      return true;
    } else {
      return this.props.userroles.includes(role);
    }
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
  userroles: state.userroles,
  numberOfPrsToReview: getReviewerInfo(state).numberOfPrsToReview
}))(Authorized);
