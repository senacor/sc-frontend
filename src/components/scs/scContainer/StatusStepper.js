import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Paper, Stepper, withStyles } from '@material-ui/core';
import { SC_STATUS } from '../../../helper/scSheetData';
import Typography from '@material-ui/core/Typography';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useUserinfoContext } from '../../../helper/contextHooks';
import { isReady } from '../ScSheet/evaluationsCheck';

const styles = theme => ({
  ...theme.styledComponents,
  mainStepLabel: {
    color: theme.palette.primary['400']
  },
  archivedLabel: {
    padding: '5vh',
    display: 'flex',
    justifyContent: 'center'
  },
  readyLabel: {
    padding: '3vh',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.secondary.darkGrey,
    fontSize: '1em'
  }
});

const StatusStepper = ({ classes, intl, sc }) => {
  const steps = [
    {
      index: 0,
      label: intl.formatMessage({ id: 'sc.phase.preparation' })
    },
    {
      index: 1,
      label: intl.formatMessage({ id: 'sc.phase.inProgress' })
    },
    {
      index: 2,
      label: intl.formatMessage({ id: 'sc.phase.ready' })
    },
    {
      index: 3,
      label: intl.formatMessage({ id: 'sc.phase.closed' })
    }
  ];
  const [activeStep, setActiveStep] = useState(steps[0].id);
  const [archived, setArchived] = useState(false);

  const user = useUserinfoContext();

  const determineGeneralStatus = () => {
    if (!sc) {
      return;
    }

    //general status: ARCHIVED
    if (sc.statusSet.includes(SC_STATUS.ARCHIVED)) {
      setArchived(true);
      return;
    }

    //general status: INITIALIZATION
    if (sc.statusSet.length === 0) {
      setActiveStep(steps[0].index);
      return;
    }

    //general status: CLOSED
    if (sc.statusSet.includes(SC_STATUS.CLOSED)) {
      setActiveStep(steps[3].index);
      return;
    }

    //general status: READY
    if (
      (sc.statusSet.includes(SC_STATUS.WITHOUT_PR) ||
        sc.statusSet.includes(SC_STATUS.WITH_PR)) &&
      isReady(sc)
    ) {
      setActiveStep(steps[2].index);
      return;
    }

    //general status: IN PROGRESS
    if (!isReady(sc)) {
      setActiveStep(steps[1].index);
    }
  };

  useEffect(determineGeneralStatus, [sc]);

  const hintSentenceId = () => {
    const msgId = (() => {
      if (activeStep === 0) {
        if (user.isReviewerInSc(sc))
          return 'sc.statusStepper.init.reviewer.hint';
        if (user.isOwnerInSc(sc)) return 'sc.statusStepper.init.employee.hint';
        return 'sc.statusStepper.init.other.hint';
      }

      if (activeStep === 1) {
        if (user.isReviewerInSc(sc))
          return 'sc.statusStepper.progress.reviewer.hint';
        if (user.isOwnerInSc(sc))
          return 'sc.statusStepper.progress.employee.hint';
        return 'sc.statusStepper.progress.other.hint';
      }

      if (activeStep === 2) {
        return 'sc.statusStepper.ready';
      }

      if (activeStep === 3) {
        return 'sc.statusStepper.closed';
      }
    })();

    return msgId ? intl.formatMessage({ id: msgId }) : null;
  };

  return (
    <Paper className={classes.paper}>
      {archived ? (
        <Typography
          variant="h5"
          component="h2"
          className={classes.archivedLabel}
        >
          {intl.formatMessage({ id: 'sc.statusStepper.archived' })}
        </Typography>
      ) : (
        <Fragment>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(step => (
              <Step key={step.index}>
                <StepLabel>
                  <Typography color="primary" variant="body1">
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.readyLabel}
          >
            {hintSentenceId()}
          </Typography>
        </Fragment>
      )}
    </Paper>
  );
};
export default injectIntl(withStyles(styles)(StatusStepper));
