import React, { useState, Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withStyles, Tooltip } from '@material-ui/core';
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
    padding: theme.spacing.unit
  }
});

const ScRatingPoints = ({ classes, intl }) => {
  const [rating, setRating] = useState('');

  console.log('rating', rating);

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
        <Select
          value={ratingValue(rating)}
          onChange={handleChangeRating}
          className={classes.select}
          renderValue={selected => <div>{selected}</div>}
        >
          {/*{[0, 1, 2, 3, 4, 5].map(value => {*/}
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
      <Tooltip title={intl.formatMessage({ id: 'scsheet.evaluation.tooltip' })}>
        <InfoIcon className={classes.iconComment} />
      </Tooltip>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScRatingPoints));
