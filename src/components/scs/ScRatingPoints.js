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
  workQualityPerformanceLevels,
  CATEGORY
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

const ScRatingPoints = ({
  classes,
  intl,
  type,
  rating,
  changeEvaluation,
  fieldsDisabled
}) => {
  const determinePerformanceLevelsText = type => {
    let arr;
    switch (type) {
      case CATEGORY.DAILY_BUSINESS:
        arr = dailyBusinessPerformanceLevels;
        break;
      case CATEGORY.PROJECT:
        arr = projectPerformanceLevels;
        break;
      case CATEGORY.WORK_EFFICIENCY:
        arr = workEffectivityPerformanceLevels;
        break;
      case CATEGORY.WORK_QUALITY:
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
          disabled={fieldsDisabled}
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
