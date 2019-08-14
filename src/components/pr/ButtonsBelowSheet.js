import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core';
import PrStatusActionButton from './prDetail/PrStatusActionButton';
import { CheckRequiredClick } from '../hoc/CheckRequiredClick';
import { prStatusEnum } from '../../helper/prStatus';
import { isHr } from '../../helper/checkRole';
import { hasRoleInPrBasedOnUserName } from '../../helper/hasRoleInPr';
import Typography from '@material-ui/core/Typography/Typography';
import { injectIntl } from 'react-intl';
import { ErrorContext, PrContext, UserinfoContext } from '../App';
import { addPrStatus } from '../../actions/calls/pr';

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
    marginRight: '0%'
  }
});

const ButtonsBelowSheet = props => {
  const { classes, pr, savingThreads, intl } = props;

  const { setValue: setPr } = useContext(PrContext.context);
  const errorContext = useContext(ErrorContext.context);
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
  const checkRequiredFields = (
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

  const requiredFieldsEmpty = status => {
    let {
      employeeContributionRole,
      employeeContributionLeader,
      overallComment
    } = props;

    let fieldFilled = checkRequiredFields(
      employeeContributionRole,
      employeeContributionLeader,
      overallComment,
      status
    );

    if (
      prStatusEnum.RELEASED_SHEET_EMPLOYEE === status &&
      false === fieldFilled.employee
    ) {
      return true;
    } else if (
      prStatusEnum.RELEASED_SHEET_REVIEWER === status &&
      false === fieldFilled.reviewer
    ) {
      return true;
    } else if (
      prStatusEnum.FINALIZED_REVIEWER === status &&
      false === fieldFilled.reviewer
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getActionPerformerButton = (pr, status, label) => {
    return (
      <CheckRequiredClick
        onClick={() => {
          addPrStatus(pr, status, setPr, errorContext);
        }}
        check={() => !requiredFieldsEmpty(status)}
        message={intl.formatMessage({
          id: 'buttonsbelowsheet.fillrequired'
        })}
        inputClass={classes.rightFloat}
      >
        <PrStatusActionButton
          label={label}
          inputClass={classes.buttonDesktopBelow}
        />
      </CheckRequiredClick>
    );
  };

  const getDisabledButton = (pr, status, label) => {
    return (
      <CheckRequiredClick
        onClick={() => {
          addPrStatus(pr, status, setPr, errorContext);
        }}
        check={() => !requiredFieldsEmpty(status)}
        message={intl.formatMessage({
          id: 'buttonsbelowsheet.fillrequired'
        })}
        inputClass={classes.rightFloat}
      >
        <PrStatusActionButton
          label={label}
          inputClass={classes.buttonDesktopDisabled}
          disabled
        />
      </CheckRequiredClick>
    );
  };

  const getEmployeeButtons = pr => {
    let reviewerFinalized = pr.statusSet.includes(
      prStatusEnum.FINALIZED_REVIEWER
    );
    let employeeFinalized = pr.statusSet.includes(
      prStatusEnum.FINALIZED_EMPLOYEE
    );
    let employeeReleased = pr.statusSet.includes(
      prStatusEnum.RELEASED_SHEET_EMPLOYEE
    );
    let releaseButton = !employeeReleased
      ? getActionPerformerButton(
          pr,
          prStatusEnum.RELEASED_SHEET_EMPLOYEE,
          `${intl.formatMessage({
            id: 'buttonsbelowsheet.release'
          })}`
        )
      : null;
    let finalizeButtonDisabled = !reviewerFinalized
      ? getDisabledButton(
          pr,
          prStatusEnum.FINALIZED_EMPLOYEE,
          `${intl.formatMessage({
            id: 'buttonsbelowsheet.finish'
          })}`
        )
      : null;
    let finalizeButtonEnabled =
      reviewerFinalized && !employeeFinalized
        ? getActionPerformerButton(
            pr,
            prStatusEnum.FINALIZED_EMPLOYEE,
            `${intl.formatMessage({
              id: 'buttonsbelowsheet.finish'
            })}`
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

  const getReviewerButtons = pr => {
    let reviewerFinalized = pr.statusSet.includes(
      prStatusEnum.FINALIZED_REVIEWER
    );
    let reviewerReleased = pr.statusSet.includes(
      prStatusEnum.RELEASED_SHEET_REVIEWER
    );
    let employeeReleased = pr.statusSet.includes(
      prStatusEnum.RELEASED_SHEET_EMPLOYEE
    );
    let releaseButton = !reviewerReleased
      ? getActionPerformerButton(
          pr,
          prStatusEnum.RELEASED_SHEET_REVIEWER,
          `${intl.formatMessage({
            id: 'buttonsbelowsheet.release'
          })}`
        )
      : null;
    let finalizeButtonDisabled = !(employeeReleased && reviewerReleased)
      ? getDisabledButton(
          pr,
          prStatusEnum.FINALIZED_REVIEWER,
          `${intl.formatMessage({
            id: 'buttonsbelowsheet.finish'
          })}`
        )
      : null;
    let finalizeButtonEnabled =
      employeeReleased && reviewerReleased && !reviewerFinalized
        ? getActionPerformerButton(
            pr,
            prStatusEnum.FINALIZED_REVIEWER,
            `${intl.formatMessage({
              id: 'buttonsbelowsheet.finish'
            })}`
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

  const getHrButtons = pr => {
    let employeeFinalized = pr.statusSet.includes(
      prStatusEnum.FINALIZED_EMPLOYEE
    );
    let hrFinalized = pr.statusSet.includes(prStatusEnum.ARCHIVED_HR);
    let releaseButtonDisabled = !employeeFinalized
      ? getDisabledButton(
          pr,
          prStatusEnum.ARCHIVED_HR,
          `${intl.formatMessage({
            id: 'buttonsbelowsheet.finish'
          })}`
        )
      : null;
    let releaseButtonEnabled =
      employeeFinalized && !hrFinalized
        ? getActionPerformerButton(
            pr,
            prStatusEnum.ARCHIVED_HR,
            `${intl.formatMessage({
              id: 'buttonsbelowsheet.finish'
            })}`
          )
        : null;
    return (
      <div>
        {releaseButtonEnabled}
        {releaseButtonDisabled}
      </div>
    );
  };

  const findButtonsForRole = (pr, userroles, userinfo) => {
    let userIsMemberOfHr = isHr(userroles);
    let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);

    if (userIsMemberOfHr) {
      return getHrButtons(pr);
    } else if (hasRoleInPr(['employee'])) {
      return getEmployeeButtons(pr);
    } else if (hasRoleInPr(['reviewer', 'supervisor'])) {
      return getReviewerButtons(pr);
    } else {
      return null;
    }
  };

  return (
    <div className={classes.container}>
      <Typography>
        {savingThreads > 0
          ? intl.formatMessage({
              id: 'prstate.saving'
            })
          : intl.formatMessage({
              id: 'prstate.saved'
            })}
      </Typography>
      {findButtonsForRole(pr, userroles, userinfo)}
    </div>
  );
};

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
