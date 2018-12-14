import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getPrDetail,
  getPrEmployeeContributions,
  getPrRatings,
  getRequiredFields,
  getUserinfo,
  getUserroles
} from '../../reducers/selector';
import { changeRequiredFields } from '../../actions/sheet';
import * as actions from '../../actions';
import PrStatusActionButton from './prDetail/PrStatusActionButton';
import { CheckRequiredClick } from '../hoc/CheckRequiredClick';
import { prStatusEnum } from '../../helper/prStatus';
import { isHr } from '../../helper/checkRole';
import { hasRoleInPrBasedOnUserName } from '../../helper/hasRoleInPr';

const styles = theme => ({
  rightFloat: {
    display: 'flex',
    marginRight: '1%',
    float: 'right'
  },
  buttonDesktopBelow: {
    position: 'relative',
    marginRight: '2%',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '2%',
    marginTop: '2%'
  },
  buttonDesktopDisabled: {
    position: 'relative',
    marginRight: '2%',
    backgroundColor: 'rgba(77, 79, 92, 0.1)',
    color: '#FFF',
    marginBottom: '2%',
    marginTop: '2%'
  },
  container: {
    marginRight: '6%'
  }
});

class ButtonsBelowSheet extends React.Component {
  checkRequiredFields = (
    employeeContributionRole,
    employeeContributionLeader,
    overallComment,
    status
  ) => {
    let filledEmployee =
      employeeContributionRole !== null &&
      employeeContributionLeader !== null &&
      employeeContributionRole !== '' &&
      employeeContributionLeader !== '';
    let filledReviewer = overallComment !== null && overallComment !== '';

    let required = { employee: true, reviewer: true };
    switch (status) {
      case prStatusEnum.RELEASED_SHEET_EMPLOYEE:
        return Object.assign({}, required, {
          employee: filledEmployee
        });
      case prStatusEnum.RELEASED_SHEET_REVIEWER:
        return Object.assign({}, required, {
          reviewer: filledReviewer
        });
      case prStatusEnum.FINALIZED_REVIEWER:
        return Object.assign({}, required, {
          reviewer: filledReviewer
        });
      default:
        return required;
    }
  };

  requiredFieldsEmpty = status => {
    let {
      employeeContributionRole,
      employeeContributionLeader,
      overallComment
    } = this.props;

    let fieldFilled = this.checkRequiredFields(
      employeeContributionRole,
      employeeContributionLeader,
      overallComment,
      status
    );

    if (
      prStatusEnum.RELEASED_SHEET_EMPLOYEE === status &&
      false === fieldFilled.employee
    ) {
      this.props.checkRequired(fieldFilled);
      return true;
    } else if (
      prStatusEnum.RELEASED_SHEET_REVIEWER === status &&
      false === fieldFilled.reviewer
    ) {
      this.props.checkRequired(fieldFilled);
      return true;
    } else if (
      prStatusEnum.FINALIZED_REVIEWER === status &&
      false === fieldFilled.reviewer
    ) {
      this.props.checkRequired(fieldFilled);
      return true;
    } else {
      return false;
    }
  };

  getActionPerformerButton = (pr, status, label) => {
    return (
      <CheckRequiredClick
        onClick={() => {
          this.props.addPrStatus(pr, status);
        }}
        check={() => !this.requiredFieldsEmpty(status)}
        message={'Bitte alle Pflichtfelder ausfüllen.'}
        inputClass={this.props.classes.rightFloat}
      >
        <PrStatusActionButton
          label={label}
          inputClass={this.props.classes.buttonDesktopBelow}
        />
      </CheckRequiredClick>
    );
  };

  getDisabledButton = (pr, status, label) => {
    return (
      <CheckRequiredClick
        onClick={() => {
          this.props.addPrStatus(pr, status);
        }}
        check={() => !this.requiredFieldsEmpty(status)}
        message={'Bitte alle Pflichtfelder ausfüllen.'}
        inputClass={this.props.classes.rightFloat}
      >
        <PrStatusActionButton
          label={label}
          inputClass={this.props.classes.buttonDesktopDisabled}
          disabled
        />
      </CheckRequiredClick>
    );
  };

  getEmployeeButtons = pr => {
    let reviewerFinalized = pr.statuses.includes(
      prStatusEnum.FINALIZED_REVIEWER
    );
    let employeeFinalized = pr.statuses.includes(
      prStatusEnum.FINALIZED_EMPLOYEE
    );
    let employeeReleased = pr.statuses.includes(
      prStatusEnum.RELEASED_SHEET_EMPLOYEE
    );
    let releaseButton = !employeeReleased
      ? this.getActionPerformerButton(
          pr,
          prStatusEnum.RELEASED_SHEET_EMPLOYEE,
          'Freigeben'
        )
      : null;
    let finalizeButtonDisabled = !reviewerFinalized
      ? this.getDisabledButton(
          pr,
          prStatusEnum.FINALIZED_EMPLOYEE,
          'Abschliessen'
        )
      : null;
    let finalizeButtonEnabled =
      reviewerFinalized && !employeeFinalized
        ? this.getActionPerformerButton(
            pr,
            prStatusEnum.FINALIZED_EMPLOYEE,
            'Abschliessen'
          )
        : null;
    return (
      <div>
        {finalizeButtonEnabled}
        {finalizeButtonDisabled}
        {releaseButton}
      </div>
    );
  };

  getReviewerButtons = pr => {
    let reviewerFinalized = pr.statuses.includes(
      prStatusEnum.FINALIZED_REVIEWER
    );
    let reviewerReleased = pr.statuses.includes(
      prStatusEnum.RELEASED_SHEET_REVIEWER
    );
    let employeeReleased = pr.statuses.includes(
      prStatusEnum.RELEASED_SHEET_EMPLOYEE
    );
    let releaseButton = !reviewerReleased
      ? this.getActionPerformerButton(
          pr,
          prStatusEnum.RELEASED_SHEET_REVIEWER,
          'Freigeben'
        )
      : null;
    let finalizeButtonDisabled = !employeeReleased
      ? this.getDisabledButton(
          pr,
          prStatusEnum.FINALIZED_REVIEWER,
          'Abschliessen'
        )
      : null;
    let finalizeButtonEnabled =
      employeeReleased && !reviewerFinalized
        ? this.getActionPerformerButton(
            pr,
            prStatusEnum.FINALIZED_REVIEWER,
            'Abschliessen'
          )
        : null;
    return (
      <div>
        {finalizeButtonEnabled}
        {finalizeButtonDisabled}
        {releaseButton}
      </div>
    );
  };

  getHrButtons = pr => {
    let employeeFinalized = pr.statuses.includes(
      prStatusEnum.FINALIZED_EMPLOYEE
    );
    let releaseButtonDisabled = !employeeFinalized
      ? this.getDisabledButton(pr, prStatusEnum.ARCHIVED_HR, 'Abschliessen')
      : null;
    let releaseButtonEnabled = employeeFinalized
      ? this.getActionPerformerButton(
          pr,
          prStatusEnum.ARCHIVED_HR,
          'Abschliessen'
        )
      : null;
    return (
      <div>
        {releaseButtonEnabled}
        {releaseButtonDisabled}
      </div>
    );
  };

  findButtonsForRole = (pr, userroles, userinfo) => {
    let userIsMemberOfHr = isHr(userroles);
    let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);

    if (userIsMemberOfHr) {
      return this.getHrButtons(pr);
    } else if (hasRoleInPr(['employee'])) {
      return this.getEmployeeButtons(pr);
    } else if (hasRoleInPr(['reviewer', 'supervisor'])) {
      return this.getReviewerButtons(pr);
    } else {
      return null;
    }
  };

  render() {
    let { classes, pr, userroles, userinfo } = this.props;
    return (
      <div className={classes.container}>
        {this.findButtonsForRole(pr, userroles, userinfo)}
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(ButtonsBelowSheet);
export default connect(
  state => ({
    pr: getPrDetail()(state),
    userroles: getUserroles(state),
    userinfo: getUserinfo(state),
    overallComment: getPrRatings('FULFILLMENT_OF_REQUIREMENT')(state).comment,
    employeeContributionRole: getPrEmployeeContributions(
      'ROLE_AND_PROJECT_ENVIRONMENT'
    )(state).text,
    employeeContributionLeader: getPrEmployeeContributions(
      'INFLUENCE_OF_LEADER_AND_ENVIRONMENT'
    )(state).text,
    requiredFields: getRequiredFields(state)
  }),
  {
    checkRequired: changeRequiredFields,
    addPrStatus: actions.addPrStatus
  }
)(StyledComponent);
