import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withStyles, Tooltip, InputLabel } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import InfoIcon from '@material-ui/icons/Info';
import {
  projectPerformanceLevels,
  workEffectivityPerformanceLevels,
  generalPerformanceLevels,
  dailyBusinessPerformanceLevels,
  workQualityPerformanceLevels
} from '../../helper/scSheetData';

const styles = theme => ({
  center: {
    textAlign: 'center'
  },
  select: {
    width: 50
  },
  iconComment: {
    color: theme.palette.primary['400'],
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});

const ScRatingPoints = ({ classes, intl, type, rating, changeEvaluation }) => {
  const determinePerformanceLevelsText = type => {
    let arr;
    switch (type) {
      case 'dailyBusiness':
        arr = dailyBusinessPerformanceLevels;
        break;
      case 'project':
        arr = projectPerformanceLevels;
        break;
      case 'workEffectivity':
        arr = workEffectivityPerformanceLevels;
        break;
      case 'workQuality':
        arr = workQualityPerformanceLevels;
        break;
      default:
        arr = generalPerformanceLevels;
    }
    return arr;
  };

  return (
    <Fragment>
      <FormControl>
        <InputLabel id="evaluation-label">
          {intl.formatMessage({
            id: 'scsheet.textheader.selfEvaluation'
          })}
        </InputLabel>
        <Select
          id="evaluation-label"
          value={rating}
          onChange={changeEvaluation}
          className={classes.select}
          renderValue={selected => <span>{selected}</span>}
        >
          {determinePerformanceLevelsText(type).map((value, index) => {
            return (
              <MenuItem key={index} value={index + 1}>
                {intl.formatMessage({ id: value })}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Tooltip title={intl.formatMessage({ id: 'scsheet.tooltip.evaluation' })}>
        <InfoIcon className={classes.iconComment} />
      </Tooltip>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScRatingPoints));
