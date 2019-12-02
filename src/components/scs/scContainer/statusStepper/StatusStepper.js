import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Paper, Stepper, Step, StepLabel } from '@material-ui/core';
import StepContent from './StepContent';
import { SC_STATUS } from '../../../../helper/scSheetData';

const styles = theme => ({
  ...theme.styledComponents,
  mainStepLabel: {
    color: theme.palette.primary['400']
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
      label: intl.formatMessage({ id: 'sc.phase.termin' })
    },
    {
      index: 3,
      label: intl.formatMessage({ id: 'sc.phase.done' })
    }
  ];
  const [activeStep, setActiveStep] = useState(steps[0].id);

  useEffect(
    () => {
      const statuses = sc.statusSet;
      if (statuses.length === 0) {
        setActiveStep(steps[0].index);
      } else if (
        (statuses.includes(SC_STATUS.WITHOUT_PR) ||
          statuses.includes(SC_STATUS.WITH_PR)) &&
        (!statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED) ||
          !statuses.includes(SC_STATUS.REVIEWER_SUBMITTED))
      ) {
        setActiveStep(steps[1].index);
      } else if (
        statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED) &&
        statuses.includes(SC_STATUS.REVIEWER_SUBMITTED) &&
        !statuses.includes(SC_STATUS.MEETING_CONFIRMED)
      ) {
        setActiveStep(steps[2].index);
      } else if (statuses.includes(SC_STATUS.MEETING_CONFIRMED)) {
        setActiveStep(steps[3].index);
      } else {
        setActiveStep(steps[0].index);
      }
    },
    [sc]
  );

  const handleMeetingConfirm = () => {
    // TODO: add status, that meeting has taken place
  };

  return (
    <Paper className={classes.paper}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(step => (
          <Step key={step.index}>
            <StepLabel>
              <StepContent
                step={step}
                activeStep={activeStep}
                sc={sc}
                handleMeetingConfirm={handleMeetingConfirm}
              />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(StatusStepper));
