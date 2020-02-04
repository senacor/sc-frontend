import React, { useState, Fragment, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { savePercentage } from '../../../calls/sc';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';

const styles = theme => ({});

const PercentageDialog = ({
  open,
  scId,
  prCategoriesWeightPercentage,
  handleClose,
  classes,
  intl
}) => {
  const [skillsPercentage, setSkillsPercentage] = useState(0);

  useEffect(
    () => {
      setSkillsPercentage(prCategoriesWeightPercentage);
    },
    [prCategoriesWeightPercentage]
  );

  const info = useInfoContext();
  const error = useErrorContext();

  const handleChange = (event, newValue) => {
    setSkillsPercentage(newValue);
  };

  const handleSave = () => {
    savePercentage(scId, skillsPercentage, info, error);
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>change percentage</DialogTitle>
      <DialogContent style={{ padding: 20 }}>
        <Grid container>
          <Grid item xs={1}>
            <Typography>
              {intl.formatMessage({
                id: 'percentagedialog.performance'
              })}
            </Typography>
            <Typography>{`${100 - skillsPercentage}%`}</Typography>
          </Grid>
          <Grid item xs={10}>
            <Slider
              value={skillsPercentage}
              onChange={handleChange}
              step={5}
              min={0}
              max={100}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography>
              {intl.formatMessage({
                id: 'percentagedialog.skills'
              })}
            </Typography>
            <Typography>{`${skillsPercentage}%`}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleClose}>
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
