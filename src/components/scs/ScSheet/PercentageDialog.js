import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  withStyles
} from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { savePercentage } from '../../../calls/sc';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';
import { CATEGORY } from '../../../helper/scSheetData';

const styles = theme => ({
  content: {
    padding: 3 * theme.spacing.unit,
    overflowX: 'hidden'
  },
  dialogContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10
  },
  centerText: {
    textAlign: 'center'
  }
});

const PercentageDialog = ({
  open,
  scId,
  percentage,
  handleChangeWeightPercentage,
  handleClose,
  type,
  classes,
  intl
}) => {
  const [skillsPercentage, setSkillsPercentage] = useState(0);

  useEffect(
    () => {
      setSkillsPercentage(percentage);
    },
    [percentage]
  );

  const info = useInfoContext();
  const error = useErrorContext();

  const closeDialog = () => {
    setSkillsPercentage(percentage);
    handleClose();
  };

  const handleChange = (event, newValue) => {
    setSkillsPercentage(newValue);
  };

  const handleSave = () => {
    savePercentage(scId, skillsPercentage, info, error);
    type === CATEGORY.PERFORMANCE
      ? handleChangeWeightPercentage(type, 100 - skillsPercentage)
      : handleChangeWeightPercentage(type, skillsPercentage);
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        {intl.formatMessage({
          id: 'percentagedialog.changepercentage'
        })}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <div className={classes.dialogContainer}>
          <div className={classes.textContainer}>
            <Typography className={classes.centerText}>
              {intl.formatMessage({
                id: 'percentagedialog.performance'
              })}
            </Typography>
            <Typography>{`${100 - skillsPercentage}%`}</Typography>
          </div>
          <Slider
            value={skillsPercentage}
            onChange={handleChange}
            step={5}
            min={0}
            max={100}
          />
          <div className={classes.textContainer}>
            <Typography className={classes.centerText}>
              {intl.formatMessage({
                id: 'percentagedialog.skills'
              })}
            </Typography>
            <Typography>{`${skillsPercentage}%`}</Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeDialog}>
          {intl.formatMessage({
            id: 'system.cancel'
          })}
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {intl.formatMessage({
            id: 'scsheet.save'
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default injectIntl(withStyles(styles)(PercentageDialog));
