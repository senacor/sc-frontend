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
import { ErrorContext, PrContext, UserinfoContext } from '../App';

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
  const { classes, pr, intl, errorContext } = props;
  let { errors } = props;
  const { setValue: setPr } = useContext(PrContext.context);
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;

  const validateInputs = () => {
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
        message: 'errorMessage...',
        errors: errors
      });
      return true;
    }
  };

  const handleDraftClick = () => {
    if (
      !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
      pr.employee.id === userinfo.userId
    ) {
      addReflections(
        pr.id,
        pr.firstReflectionField,
        pr.secondReflectionField,
        errorContext
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
        errorContext
      );
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      pr.employee.id === userinfo.userId
    ) {
      addFinalCommentEmployee(pr.id, pr.finalCommentEmployee, errorContext);
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      !pr.statusSet.includes('PR_COMPLETED') &&
      userroles.includes('PR_HR')
    ) {
      addFinalCommentHr(pr.id, pr.finalCommentHr, errorContext);
    }
  };

  const handleSubmitClick = () => {
    if (
      !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
      pr.employee.id === userinfo.userId
    ) {
      if (!validateInputs()) {
        addReflections(
          pr.id,
          pr.firstReflectionField,
          pr.secondReflectionField,
          errorContext
        ).then(() => {
          addPrStatus(
            pr.id,
            'FILLED_SHEET_EMPLOYEE_SUBMITTED',
            setPr,
            errorContext
          );
        });
      }
    } else if (
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      userroles.includes('PR_CST_Leiter')
    ) {
      addRatings(
        pr.id,
        pr.prRating,
        pr.targetRole,
        pr.advancementStrategies,
        errorContext
      ).then(() => {
        addPrStatus(
          pr.id,
          'FILLED_SHEET_REVIEWER_SUBMITTED',
          setPr,
          errorContext
        );
      });
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      pr.employee.id === userinfo.userId
    ) {
      addFinalCommentEmployee(
        pr.id,
        pr.finalCommentEmployee,
        errorContext
      ).then(() => {
        addPrStatus(
          pr.id,
          'MODIFICATIONS_ACCEPTED_EMPLOYEE',
          setPr,
          errorContext
        );
      });
    } else if (
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
      !pr.statusSet.includes('PR_COMPLETED') &&
      userroles.includes('PR_HR')
    ) {
      addFinalCommentHr(pr.id, pr.finalCommentHr, errorContext).then(() => {
        addPrStatus(pr.id, 'PR_COMPLETED', setPr, errorContext);
      });
    }
  };

  const createDraftButton = () => {
    return (
      <Button
        onClick={handleDraftClick}
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
        onClick={handleSubmitClick}
      >
        {intl.formatMessage({
          id: 'buttonsbelowsheet.release'
        })}
      </Button>
    );
  };

  const createButtonsForRole = (pr, userroles) => {
    return (
      <div>
        {createSubmitButton()}
        {createDraftButton()}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {createButtonsForRole(pr, userroles)}
    </div>
  );
};

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
