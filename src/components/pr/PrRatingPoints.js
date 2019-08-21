import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  center: {
    textAlign: 'center'
  }
});

const PrRatingPoints = ({
  classes,
  category,
  rating,
  isReadOnly,
  isError,
  action
}) => {
  const [ratingState, setRatingState] = useState(rating);

  const ratingValue = entry => {
    if (entry) {
      return entry;
    } else {
      return '-';
    }
  };

  if (isReadOnly('RATINGS_REVIEWER')) {
    return (
      <TextField
        readOnly
        value={ratingValue(rating)}
        inputProps={{ classes: { input: classes.center } }}
      />
    );
  } else if (isError) {
    return (
      <FormControl error>
        <Select
          value={ratingValue(ratingState)}
          onChange={event => {
            setRatingState(event.target.value);
            return action(event.target.value);
          }}
        >
          {[0, 1, 2, 3, 4, 5].map(value => {
            return (
              <MenuItem
                key={category + '_rating_' + value}
                value={ratingValue(value)}
              >
                {ratingValue(value)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  } else {
    return (
      <FormControl>
        <Select
          value={ratingValue(ratingState)}
          onChange={event => {
            setRatingState(event.target.value);
            return action(event.target.value);
          }}
        >
          {[0, 1, 2, 3, 4, 5].map(value => {
            return (
              <MenuItem
                key={category + '_rating_' + value}
                value={ratingValue(value)}
              >
                {ratingValue(value)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
};

export default withStyles(styles)(PrRatingPoints);
