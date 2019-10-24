import React, { useContext, useState } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import {
  addFinalCommentEmployee,
  addFinalCommentHr,
  addPrStatus,
  addRatings,
  addReflections
} from '../../calls/pr';
import { PrContext } from '../App';
import ConfirmDialog from '../utils/ConfirmDialog';
import { useInfoContext, useUserinfoContext } from '../../helper/contextHooks';

const styles = theme => ({
  rightFloat: {
    display: 'flex',
    float: 'right'
  },
  saveButton: {
    color: theme.palette.secondary.white
  },
  submitButton: {
    marginLeft: 3 * theme.spacing.unit,
    color: theme.palette.secondary.white
  },
  container: {
    marginRight: '0%'
  }
});

const ButtonsBelowSheet = props => {
  const { classes, pr, intl, errorContext } = props;
  let { errors } = props;
  const { setValue: setPr } = useContext(PrContext.context);
  const info = useInfoContext();
  const { context: infoContext } = info;
  const user = useUserinfoContext();
  const [dialogOpen, setDialogOpen] = useState(false);

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
    info.hide();
    errorContext.setValue({ hasInfos: false, messageId: '', errors: {} });
    if (
      !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
      user.isOwnerInPr(pr)
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
      user.isReviewerInPr(pr)
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
      user.isOwnerInPr(pr)
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
      user.hasRoleHr()
    ) {
      addFinalCommentHr(pr.id, pr.finalCommentHr, errorContext, infoContext);
    }
  };

  const handleSubmitClick = () => {
    info.hide();
    errorContext.setValue({ hasInfos: false, messageId: '', errors: {} });
    if (
      !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
      user.isOwnerInPr(pr)
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
      user.isSupervisorInPr(pr)
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
          info.msg('pr.submitted');
        });
      }
    } else if (
      pr.statusSet.includes('FILLED_SHEET_REVIEWER_SUBMITTED') &&
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      user.isSupervisorInPr(pr)
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
          info.msg('pr.submitted');
        });
      }
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      user.isOwnerInPr(pr)
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
        info.msg('pr.submitted');
      });
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      !pr.statusSet.includes('PR_COMPLETED') &&
      user.hasRoleHr()
    ) {
      addFinalCommentHr(
        pr.id,
        pr.finalCommentHr,
        errorContext,
        infoContext
      ).then(() => {
        addPrStatus(pr.id, 'PR_COMPLETED', setPr, errorContext);
        info.msg('pr.submitted');
      });
    }
    setDialogOpen(false);
  };

  const disabled = () => {
    //I am reviewer of the PR
    if (user.isReviewerInPr(pr)) {
      return (
        pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') ||
        (!pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
          pr.statusSet.includes('FILLED_SHEET_REVIEWER_SUBMITTED'))
      );
    }

    //I am owner of the PR
    if (user.isOwnerInPr(pr)) {
      return (
        (pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
          !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER')) ||
        pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE')
      );
    }

    //I am HR
    if (user.hasRoleHr()) {
      return (
        !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') ||
        pr.statusSet.includes('PR_COMPLETED')
      );
    }

    return true;
  };

  const submitButtonText = () => {
    if (
      (user.isOwnerInPr(pr) &&
        pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED')) ||
      (user.isReviewerInPr(pr) &&
        pr.statusSet.includes('FILLED_SHEET_REVIEWER_SUBMITTED')) ||
      (user.hasRoleHr() &&
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

  const CreateSaveButton = () => {
    return (
      <Button
        variant="contained"
        color="secondary"
        className={`${classes.rightFloat} ${classes.saveButton}`}
        disabled={disabled()}
        onClick={handleSaveClick}
      >
        {intl.formatMessage({
          id: 'buttonsbelowsheet.draft'
        })}
      </Button>
    );
  };

  const CreateSubmitButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        className={`${classes.rightFloat} ${classes.submitButton}`}
        disabled={disabled()}
        onClick={() => setDialogOpen(true)}
      >
        {submitButtonText()}
      </Button>
    );
  };

  return (
    <div className={classes.container}>
      <CreateSubmitButton />
      <CreateSaveButton />
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleConfirm={handleSubmitClick}
        confirmationText={intl.formatMessage({
          id: 'buttonsbelowsheet.submitDialogText'
        })}
        confirmationHeader={intl.formatMessage({
          id: 'buttonsbelowsheet.submitDialogTitle'
        })}
      />
    </div>
  );
};

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
