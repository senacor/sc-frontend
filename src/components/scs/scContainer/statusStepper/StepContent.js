import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { SC_STATUS } from '../../../../helper/scSheetData';

const styles = theme => ({
  container: {
    maxWidth: 170
  }
});

const StepContent = ({ classes, intl, step, activeStep, sc }) => {
  const statuses = sc.statusSet;

  const determineScPhase = index => {
    switch (index) {
      case 0:
        return determineTextInPreparation();
      default:
        return;
    }
  };

  const determineTextInPreparation = () => {
    let label = '';
    if (
      statuses.includes(SC_STATUS.WITHOUT_PR) ||
      statuses.includes(SC_STATUS.WITH_PR)
    ) {
      label = intl.formatMessage({ id: 'sc.phase.preparation.scTypeChosen' });
    } else {
      label = intl.formatMessage({
        id: 'sc.phase.preparation.scTypeNotChosen'
      });
    }
    return <Typography variant="caption">{label}</Typography>;
  };

  return (
    <div className={classes.container}>
      <Typography color="primary" variant="body1">
        {step.label}
      </Typography>
      {step.index === activeStep && determineScPhase(activeStep)}
    </div>
  );
};

export default injectIntl(withStyles(styles)(StepContent));
