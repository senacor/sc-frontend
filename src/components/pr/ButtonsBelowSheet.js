import React, { useContext } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getUserroles } from '../../reducers/selector';
import { injectIntl } from 'react-intl';
import ROLES from '../../helper/roles';
import {
  addFinalCommentEmployee,
  addFinalCommentHr,
  addRatings,
  addReflections,
  addPrStatus
} from '../../actions/calls/pr';
import { ErrorContext } from '../App';

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
  const { classes, pr, userroles, intl } = props;
  let errorContext = useContext(ErrorContext.context);

  const createDraftButton = () => {
    return (
      <Button
        className={`${classes.rightFloat} ${classes.buttonDesktopBelow}`}
        onClick={() => {
          if (!pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED')) {
            addReflections(
              pr.id,
              pr.firstReflectionField,
              pr.secondReflectionField,
              errorContext
            );
          } else if (
            !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER')
          ) {
            addRatings(
              pr.id,
              pr.targetRole,
              pr.advancementStrategies,
              errorContext
            );
          } else if (
            pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
            !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE')
          ) {
            addFinalCommentEmployee(
              pr.id,
              pr.finalCommentEmployee,
              errorContext
            );
          } else if (
            pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
            pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
            !pr.statusSet.includes('PR_COMPLETED')
          ) {
            addFinalCommentHr(pr.id, pr.finalCommentHr, errorContext);
          }
        }}
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
        onClick={() => {
          if (!pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED')) {
            addReflections(
              pr.id,
              pr.firstReflectionField,
              pr.secondReflectionField,
              errorContext
            );
            addPrStatus(pr.id, 'FILLED_SHEET_EMPLOYEE_SUBMITTED', errorContext);
          } else if (
            !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER')
          ) {
            addRatings(
              pr.id,
              pr.targetRole,
              pr.advancementStrategies,
              errorContext
            );
          } else if (
            pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
            !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE')
          ) {
            addFinalCommentEmployee(
              pr.id,
              pr.finalCommentEmployee,
              errorContext
            );
          } else if (
            pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
            pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') &&
            !pr.statusSet.includes('PR_COMPLETED')
          ) {
            addFinalCommentHr(pr.id, pr.finalCommentHr, errorContext);
          }
        }}
      >
        {intl.formatMessage({
          id: 'buttonsbelowsheet.release'
        })}
      </Button>
    );
  };

  const createButtonsForRole = (pr, userroles) => {
    if (userroles.includes(ROLES.PR_MITARBEITER)) {
      return (
        <div>
          {createSubmitButton()}
          {createDraftButton()}
        </div>
      );
    }
  };

  return (
    <div className={classes.container}>
      {createButtonsForRole(pr, userroles)}
    </div>
  );
};

export const StyledComponent = withStyles(styles)(ButtonsBelowSheet);
export default injectIntl(
  connect(state => ({ userroles: getUserroles(state) }))(StyledComponent)
);
