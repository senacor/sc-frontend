import React from 'react';
import StepConnector from '@material-ui/core/StepConnector/StepConnector';
import Step from '@material-ui/core/Step/Step';
import StepLabel from '@material-ui/core/StepLabel/StepLabel';
import Typography from '@material-ui/core/Typography/Typography';
import Stepper from '@material-ui/core/Stepper/Stepper';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import PrSubstepItem from './PrSubstepItem';

const styles = theme => {
  return {
    stepper: {
      backgroundColor: 'inherit',
      padding: '0',
      width: '100%'
    },
    mainStepLabel: {
      color: theme.palette.primary['400']
    },
    stepLabelRoot: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    stepperRoot: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    stepConnectorRoot: {
      paddingTop: '10px'
    }
  };
};

const PrStateStepper = ({ classes, stepStructure, activeStep }) => {
  const getExtraStepContent = substeps => {
    return Object.values(substeps).map((substep, index) => {
      return <PrSubstepItem key={`SubStepGrid_${index}`} substep={substep} />;
    });
  };

  return (
    <Stepper
      orientation="horizontal"
      className={classes.stepper}
      activeStep={activeStep}
      classes={{ root: classes.stepperRoot }}
      connector={
        <StepConnector classes={{ root: classes.stepConnectorRoot }} />
      }
    >
      {stepStructure.map((mainStep, index) => {
        return (
          <Step key={mainStep.mainStepLabel}>
            <StepLabel classes={{ root: classes.stepLabelRoot }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.mainStepLabel}
              >
                {mainStep.mainStepLabel}
              </Typography>
              {index <= activeStep && (
                <List>{getExtraStepContent(mainStep.substeps)}</List>
              )}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default withStyles(styles)(PrStateStepper);
