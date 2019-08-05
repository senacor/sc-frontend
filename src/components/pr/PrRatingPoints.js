import React from 'react';

import TextField from '@material-ui/core/TextField';

import { textFieldEnum } from '../../helper/textFieldEnum';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

const PrRatingPoints = ({
  readOnly,
  classes,
  category,
  onChange,
  value,
  state
}) => {
  const ratingValue = entry => {
    if (entry === 0) {
      return '-';
    } else {
      return entry;
    }
  };

  let disabledRatingPoints = () => {
    return (
      <TextField
        disabled
        InputProps={{ classes: { input: classes.center } }}
        value={'-'}
      />
    );
  };

  let readOnlyRatingPoints = value => {
    return (
      <TextField
        value={value}
        readOnly
        InputProps={{ classes: { input: classes.center } }}
      />
    );
  };

  let writeableRatingPoints = value => {
    return (
      <FormControl className={classes.formControl} readOnly={readOnly}>
        <Select
          id={category + '_RatingId'}
          value={value}
          onChange={onChange}
          displayEmpty
          name="rating"
        >
          {[0, 1, 2, 3, 4, 5].map(value => {
            return (
              <MenuItem
                key={category + '_RatingValue' + value}
                id={category + '_RatingValue' + value}
                value={ratingValue(value)}
              >
                {ratingValue(value)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  switch (state) {
    case textFieldEnum.ENABLED:
      return writeableRatingPoints(value);
    case textFieldEnum.DISABLED:
      return disabledRatingPoints(value);
    case textFieldEnum.READONLY:
      return readOnlyRatingPoints(value);
    default:
      return null;
  }
};

export default PrRatingPoints;
