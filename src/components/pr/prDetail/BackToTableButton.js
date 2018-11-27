import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import React from 'react';
import ROUTES from '../../../helper/routes';
import { isHr } from '../../../helper/checkRole';
import { getUserPrincipalName, getUserroles } from '../../../reducers/selector';
import { connect } from 'react-redux';

export class BackToTableButton extends Component {
  getBackJumpPoint = (pr, userroles, username) => {
    if (pr.employee.login === username) {
      return ROUTES.OWN_PR_TABLE;
    } else if (
      pr.supervisor.login === username ||
      pr.reviewer.login === username
    ) {
      return ROUTES.PR_TO_REVIEW_TABLE;
    } else if (isHr(userroles)) {
      return ROUTES.HR_PR_TABLE;
    } else {
      return ROUTES.LOGOUT;
    }
  };

  render() {
    const { pr, userroles, username } = this.props;

    return (
      <IconButton
        aria-label="Links"
        component={NavLink}
        to={this.getBackJumpPoint(pr, userroles, username)}
      >
        <Icon fontSize={'small'}>close</Icon>
      </IconButton>
    );
  }
}

export default connect(
  state => ({
    username: getUserPrincipalName(state),
    userroles: getUserroles(state)
  }),
  {}
)(BackToTableButton);
