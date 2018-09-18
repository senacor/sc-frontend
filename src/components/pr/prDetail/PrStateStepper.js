import React from 'react';
import StepConnector from '@material-ui/core/StepConnector/StepConnector';
import Step from '@material-ui/core/Step/Step';
import StepLabel from '@material-ui/core/StepLabel/StepLabel';
import Typography from '@material-ui/core/Typography/Typography';
import Stepper from '@material-ui/core/Stepper/Stepper';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    },
    gridOffset: {
      paddingLeft: theme.spacing.unit
    },
    listItemRoot: {
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: 0.5 * theme.spacing.unit,
      paddingBottom: 0.5 * theme.spacing.unit
    },
    listItemPrimary: {
      fontSize: '0.875rem'
    }
  };
};

class PrStateStepper extends React.Component {
  getExtraStepContent = substeps => {
    let { classes } = this.props;
    return Object.values(substeps).map((substep, index) => {
      return (
        <ListItem
          key={`SubStepGrid_${index}`}
          classes={{
            root: classes.listItemRoot
          }}
        >
          <ListItemText
            classes={{
              primary: classes.listItemPrimary
            }}
            primary={substep.label}
            secondary={
              substep.isCompleted
                ? substep.rendering.complete
                : substep.rendering.incomplete
            }
          />
        </ListItem>
      );
    });
  };

  render() {
    const { classes, stepStructure, activeStep } = this.props;
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
                <List>{this.getExtraStepContent(mainStep.substeps)}</List>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  }
}

export default withStyles(styles)(PrStateStepper);
