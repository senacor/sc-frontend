import React from 'react';
import PropTypes from 'prop-types';

import StepConnector from '@material-ui/core/StepConnector/StepConnector';
import Step from '@material-ui/core/Step/Step';
import StepLabel from '@material-ui/core/StepLabel/StepLabel';
import Typography from '@material-ui/core/Typography/Typography';
import Stepper from '@material-ui/core/Stepper/Stepper';

const PrStatusStepper = props => {
  const { classes, stepStructure } = props;
  return (
    <Stepper
      orientation="horizontal"
      className={classes.stepper}
      activeStep={
        [...Array(stepStructure.length).keys()].filter(stepId =>
          mainStepIsDone(prStatusesDone, stepId, stepStructure)
        ).length
      }
      onChange={() => {}}
      classes={{ root: classes.stepperRoot }}
      connector={
        <StepConnector classes={{ root: classes.stepConnectorRoot }} />
      }
    >
      {stepStructure.map(mainStep => {
        return (
          <Step key={mainStep.mainStepLabel}>
            <StepLabel classes={{ root: classes.stepLabelRoot }}>
              <Typography
                variant="subheading"
                gutterBottom
                className={classes.mainStepLabel}
              >
                {mainStep.mainStepLabel}
              </Typography>
              {this.getExtraStepContent(mainStep.substeps)}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

PrStatusStepper.propTypes = {};

export default PrStatusStepper;
