import React from 'react';
import { injectIntl } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';
import { SC_STATUS } from '../../../../helper/scSheetData';
import { useUserinfoContext } from '../../../../helper/contextHooks';

const styles = theme => ({
  container: {
    maxWidth: 170
  },
  stepCaptionContainer: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit
  },
  stepCaptionTitle: {
    paddingTop: theme.spacing.unit
  },
  btnMeetingConfirm: {
    marginTop: theme.spacing.unit,
    maxWidth: 140,
    fontSize: '0.85rem'
  }
});

const StepContent = ({ classes, intl, step, activeStep, sc }) => {
  const user = useUserinfoContext();
  const statuses = sc.statusSet;

  const determineTextPreparation = () => {
    let label = '';
    if (
      statuses.includes(SC_STATUS.WITHOUT_PR) ||
      statuses.includes(SC_STATUS.WITH_PR)
    ) {
      label = intl.formatMessage({ id: 'sc.phase.preparation.scTypeChosen' });
    } else {
      label = intl.formatMessage({
        id: 'sc.phase.preparation.scTypeNotChosen'
      });
    }
    return (
      <Typography color="textSecondary" variant="body2">
        {label}
      </Typography>
    );
  };

  const determineTextInProgress = () => {
    let stepCaptionText = {
      reviewer: '',
      employee: '',
      termin: ''
    };
    if (!statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED)) {
      // employee submitted SC
      if (user.isOwnerInSc(sc)) {
        stepCaptionText.employee = intl.formatMessage({
          id: 'sc.phase.inProgress.scToSubmit'
        });
      } else if (user.isReviewerInSc(sc) || user.hasRoleHr()) {
        stepCaptionText.employee = intl.formatMessage({
          id: 'sc.phase.inProgress.scNotSubmitted'
        });
      } else return;
    } else {
      stepCaptionText.employee = intl.formatMessage({
        id: 'sc.phase.inProgress.scSubmitted'
      });
    }
    if (!statuses.includes(SC_STATUS.REVIEWER_SUBMITTED)) {
      // reviewer submitted SC
      if (user.isReviewerInSc(sc)) {
        stepCaptionText.reviewer = intl.formatMessage({
          id: 'sc.phase.inProgress.scToSubmit'
        });
      } else if (user.isOwnerInSc(sc) || user.hasRoleHr()) {
        stepCaptionText.reviewer = intl.formatMessage({
          id: 'sc.phase.inProgress.scNotSubmitted'
        });
      } else return;
    } else {
      stepCaptionText.reviewer = intl.formatMessage({
        id: 'sc.phase.inProgress.scSubmitted'
      });
    }
    return stepCaptionLayout(
      stepCaptionText.employee,
      stepCaptionText.reviewer,
      stepCaptionText.termin
    );
  };

  const determineScPhase = index => {
    switch (index) {
      case 0:
        return determineTextPreparation();
      case 1:
        return determineTextInProgress();
      default:
        return;
    }
  };

  const stepCaptionLayout = (employeeText, reviewerText, terminText) => (
    <div className={classes.stepCaptionContainer}>
      <Typography variant="body2" className={classes.stepCaptionTitle}>
        {intl.formatMessage({ id: 'sc.statusStepper.employee' })}:
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {employeeText}
      </Typography>
      <Typography variant="body2" className={classes.stepCaptionTitle}>
        {intl.formatMessage({ id: 'sc.statusStepper.reviewer' })}:
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {reviewerText}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {terminText}
      </Typography>
    </div>
  );

  return (
    <div className={classes.container}>
      <Typography color="primary" variant="body1">
        {step.label}
      </Typography>
      {step.index === activeStep && determineScPhase(activeStep)}
    </div>
  );
};

export default injectIntl(withStyles(styles)(StepContent));
