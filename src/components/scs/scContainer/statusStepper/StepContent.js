import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
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
  }
});

const StepContent = ({ classes, intl, step, activeStep, sc }) => {
  const user = useUserinfoContext();
  const statuses = sc.statusSet;

  const determineScPhase = index => {
    switch (index) {
      case 0:
        return determineTextInPreparation();
      case 1:
        return determineTextInProgress();
      default:
        return;
    }
  };

  const determineTextInPreparation = () => {
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
      <Typography variant="body2" className={classes.stepCaptionTitle}>
        {intl.formatMessage({ id: 'sc.statusStepper.termin' })}:
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {terminText}
      </Typography>
    </div>
  );

  const determineTextInProgress = () => {
    let stepCaptionText = {
      reviewer: '',
      employee: '',
      termin: ''
    };
    if (user.isReviewerInSc(sc)) {
      if (statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED)) {
        stepCaptionText.employee = intl.formatMessage({
          id: 'sc.phase.inProgress.scSubmitted'
        });
      } else {
        stepCaptionText.employee = intl.formatMessage({
          id: 'sc.phase.inProgress.scNotSubmitted'
        });
      }
      if (!statuses.includes(SC_STATUS.REVIEWER_SUBMITTED)) {
        stepCaptionText.reviewer = intl.formatMessage({
          id: 'sc.phase.inProgress.scToSubmit'
        });
      }
    }
    return stepCaptionLayout(
      stepCaptionText.employee,
      stepCaptionText.reviewer,
      stepCaptionText.termin
    );
  };

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
