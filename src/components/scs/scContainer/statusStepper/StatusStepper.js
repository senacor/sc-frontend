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
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(
    () => {
      const statuses = sc.statusSet;
      if (statuses.length === 0) {
        setActiveStep(0);
      } else if (
        statuses.includes(SC_STATUS.WITHOUT_PR) ||
        statuses.includes(SC_STATUS.WITH_PR)
      ) {
        setActiveStep(1);
      }
    },
    [sc]
  );

  return (
    <Paper className={classes.paper}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(step => (
          <Step key={step.index}>
            <StepLabel>
              <StepContent step={step} activeStep={activeStep} sc={sc} />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(StatusStepper));
