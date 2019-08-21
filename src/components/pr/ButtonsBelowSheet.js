import React, { useContext } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import {
  addFinalCommentEmployee,
  addFinalCommentHr,
  addRatings,
  addReflections,
  addPrStatus
} from '../../actions/calls/pr';
import { PrContext, UserinfoContext } from '../App';

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
  const { classes, pr, intl, errorContext, infoContext } = props;
  let { errors } = props;
  const { setValue: setPr } = useContext(PrContext.context);
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;

  const validateReflectionInputs = () => {
    if (!pr.firstReflectionField) {
      errors = { ...errors, firstReflectionField: true };
    }
    if (pr.firstReflectionField) {
      errors = { ...errors, firstReflectionField: false };
    }
    if (!pr.secondReflectionField) {
      errors = { ...errors, secondReflectionField: true };
    }
    if (pr.secondReflectionField) {
      errors = { ...errors, secondReflectionField: false };
    }

    if (Object.values(errors).includes(true)) {
      errorContext.setValue({
        hasErrors: true,
        messageId: 'buttonsbelowsheet.fillrequired',
        errors: errors
      });
      window.scrollTo(0, 0);
      return true;
    }
  };

  const validateOverallAssessment = () => {
    if (!pr.prRating.overallAssessment.fulfillmentOfRequirement.comment) {
      errors = { ...errors, overallAssessmentComment: true };
    }
    if (pr.prRating.overallAssessment.fulfillmentOfRequirement.comment) {
      errors = { ...errors, overallAssessmentComment: false };
    }

    if (Object.values(errors).includes(true)) {
      errorContext.setValue({
        hasErrors: true,
        messageId: 'buttonsbelowsheet.fillrequired',
        errors: errors
      });
      window.scrollTo(0, 0);
      return true;
    }
  };

  const handleSaveClick = () => {
    infoContext.setValue({ hasInfos: false, messageId: '' });
    errorContext.setValue({ hasInfos: false, messageId: '', errors: {} });
    if (
      !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
      pr.employee.id === userinfo.userId
    ) {
      addReflections(
        pr.id,
        pr.firstReflectionField,
        pr.secondReflectionField,
        errorContext,
        infoContext
      );
    } else if (
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      userroles.includes('PR_CST_Leiter')
    ) {
      addRatings(
        pr.id,
        pr.prRating,
        pr.targetRole,
        pr.advancementStrategies,
        errorContext,
        infoContext
      );
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      pr.employee.id === userinfo.userId
    ) {
      addFinalCommentEmployee(
        pr.id,
        pr.finalCommentEmployee,
        errorContext,
        infoContext
      );
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      !pr.statusSet.includes('PR_COMPLETED') &&
      userroles.includes('PR_HR')
    ) {
      addFinalCommentHr(pr.id, pr.finalCommentHr, errorContext, infoContext);
    }
  };

  const handleSubmitClick = () => {
    infoContext.setValue({ hasInfos: false, messageId: '' });
    errorContext.setValue({ hasInfos: false, messageId: '', errors: {} });
    if (
      !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
      pr.employee.id === userinfo.userId
    ) {
      if (!validateReflectionInputs()) {
        addReflections(
          pr.id,
          pr.firstReflectionField,
          pr.secondReflectionField,
          errorContext,
          infoContext
        ).then(() => {
          addPrStatus(
            pr.id,
            'FILLED_SHEET_EMPLOYEE_SUBMITTED',
            setPr,
            errorContext
          );
          infoContext.setValue({ hasInfos: true, messageId: 'pr.submitted' });
        });
      }
    } else if (
      !pr.statusSet.includes('FILLED_SHEET_REVIEWER_SUBMITTED') &&
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      userroles.includes('PR_CST_Leiter')
    ) {
      if (!validateOverallAssessment()) {
        addRatings(
          pr.id,
          pr.prRating,
          pr.targetRole,
          pr.advancementStrategies,
          errorContext,
          infoContext
        ).then(() => {
          addPrStatus(
            pr.id,
            'FILLED_SHEET_REVIEWER_SUBMITTED',
            setPr,
            errorContext
          );
          infoContext.setValue({ hasInfos: true, messageId: 'pr.submitted' });
        });
      }
    } else if (
      pr.statusSet.includes('FILLED_SHEET_REVIEWER_SUBMITTED') &&
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      userroles.includes('PR_CST_Leiter')
    ) {
      if (!validateOverallAssessment()) {
        addRatings(
          pr.id,
          pr.prRating,
          pr.targetRole,
          pr.advancementStrategies,
          errorContext,
          infoContext
        ).then(() => {
          addPrStatus(
            pr.id,
            'MODIFICATIONS_ACCEPTED_REVIEWER',
            setPr,
            errorContext
          );
          infoContext.setValue({ hasInfos: true, messageId: 'pr.submitted' });
        });
      }
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      pr.employee.id === userinfo.userId
    ) {
      addFinalCommentEmployee(
        pr.id,
        pr.finalCommentEmployee,
        errorContext,
        infoContext
      ).then(() => {
        addPrStatus(
          pr.id,
          'MODIFICATIONS_ACCEPTED_EMPLOYEE',
          setPr,
          errorContext
        );
        infoContext.setValue({ hasInfos: true, messageId: 'pr.submitted' });
      });
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      !pr.statusSet.includes('PR_COMPLETED') &&
      userroles.includes('PR_HR')
    ) {
      addFinalCommentHr(
        pr.id,
        pr.finalCommentHr,
        errorContext,
        infoContext
      ).then(() => {
        addPrStatus(pr.id, 'PR_COMPLETED', setPr, errorContext);
        infoContext.setValue({ hasInfos: true, messageId: 'pr.submitted' });
      });
    }
  };

  const disabled = () => {
    if (userroles.includes('PR_Mitarbeiter')) {
      return (
        (pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
          !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER')) ||
        pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE')
      );
    } else if (userroles.includes('PR_CST_Leiter')) {
      return pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER');
    } else if (userroles.includes('PR_HR')) {
      return (
        !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') ||
        pr.statusSet.includes('PR_COMPLETED')
      );
    }
  };

  const submitButtonText = () => {
    if (
      (userroles.includes('PR_Mitarbeiter') &&
        pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED')) ||
      (userroles.includes('PR_CST_Leiter') &&
        pr.statusSet.includes('FILLED_SHEET_REVIEWER_SUBMITTED')) ||
      (userroles.includes('PR_HR') &&
        pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE'))
    ) {
      return intl.formatMessage({
        id: 'buttonsbelowsheet.finish'
      });
    }

    return intl.formatMessage({
      id: 'buttonsbelowsheet.release'
    });
  };

  const createSaveButton = () => {
    return (
      <Button
        onClick={handleSaveClick}
        disabled={disabled()}
        className={`${classes.rightFloat} ${classes.buttonDesktopBelow}`}
      >
        {intl.formatMessage({
          id: 'buttonsbelowsheet.draft'
        })}
      </Button>
    );
  };

  const createSubmitButton = () => {
    return (
      <Button
        className={`${classes.rightFloat} ${classes.buttonDesktopBelow}`}
        disabled={disabled()}
        onClick={handleSubmitClick}
      >
        {submitButtonText()}
      </Button>
    );
  };

  return (
    <div className={classes.container}>
      {createSubmitButton()}
      {createSaveButton()}
    </div>
  );
};

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
