import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

const styles = () => ({
  center: {
    textAlign: 'center'
  },
  select: {
    width: 50
  }
});

const ScRatingPoints = ({ classes, intl, category, rating, action }) => {
  const [ratingState, setRatingState] = useState(rating);

  const ratingValue = entry => {
    if (entry) {
      return entry;
    } else {
      return '-';
    }
  };

  return (
    <FormControl>
      <Select
        value={ratingValue(ratingState)}
        onChange={event => {
          setRatingState(event.target.value);
          return action(event.target.value);
        }}
        className={classes.select}
        renderValue={selected => <div>{selected}</div>}
      >
        {/*{[0, 1, 2, 3, 4, 5].map(value => {*/}
        {[
          `1 - ${intl.formatMessage({
            id: 'scsheet.bewertung.nichtErfullt'
          })}`,
          `2 - ${intl.formatMessage({
            id: 'scsheet.bewertung.zumTeilErfullt'
          })}`,
          `3 - ${intl.formatMessage({
            id: 'scsheet.bewertung.vollstandigErfullt'
          })}`,
          `4 - ${intl.formatMessage({
            id: 'scsheet.bewertung.regelmassigUbererfullt'
          })}`,
          `5 - ${intl.formatMessage({
            id: 'scsheet.bewertung.starkUbererfullt'
          })}`
        ].map(value => {
          return (
            <MenuItem
              key={category + '_rating_' + value.charAt(0)}
              value={Number(ratingValue(value.charAt(0)))}
            >
              {ratingValue(value)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default injectIntl(withStyles(styles)(ScRatingPoints));
