import React, { useState, Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withStyles, Tooltip, InputLabel } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import InfoIcon from '@material-ui/icons/Info';

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

const ScRatingPoints = ({ classes, intl }) => {
  // TODO: connecting to ScFields object
  const [rating, setRating] = useState('');

  const ratingValue = entry => {
    if (entry) {
      return entry;
    } else {
      return '-';
    }
  };

  const handleChangeRating = event => {
    setRating(event.target.value);
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
          labelId="evaluation-label"
          id="evaluation-label"
          value={ratingValue(rating)}
          onChange={handleChangeRating}
          className={classes.select}
          renderValue={selected => <div>{selected}</div>}
        >
          {[
            `1 - ${intl.formatMessage({
              id: 'scsheet.evaluation.1'
            })}`,
            `2 - ${intl.formatMessage({
              id: 'scsheet.evaluation.2'
            })}`,
            `3 - ${intl.formatMessage({
              id: 'scsheet.evaluation.3'
            })}`,
            `4 - ${intl.formatMessage({
              id: 'scsheet.evaluation.4'
            })}`,
            `5 - ${intl.formatMessage({
              id: 'scsheet.evaluation.5'
            })}`
          ].map((value, index) => {
            return (
              <MenuItem
                key={index}
                value={Number(ratingValue(value.charAt(0)))}
              >
                {ratingValue(value)}
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
