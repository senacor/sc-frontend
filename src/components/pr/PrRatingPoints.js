import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import { textFieldEnum } from '../../helper/textFieldEnum';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

class PrRatingPoints extends Component {
  ratingValue = entry => {
    if (entry === 0) {
      return '-';
    } else {
      return entry;
    }
  };

  render() {
    const { readOnly, classes, category, onChange, value, state } = this.props;

    let disabledRatingPoints = () => {
      return (
        <TextField
          disabled
          InputProps={{ classes: { input: classes.center } }}
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
            {[0, 1, 2, 3, 4, 5].map(ratingValue => {
              return (
                <MenuItem
                  key={category + '_RatingValue' + ratingValue}
                  id={category + '_RatingValue' + ratingValue}
                  value={this.ratingValue(ratingValue)}
                >
                  {this.ratingValue(ratingValue)}
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
  }
}

export default PrRatingPoints;
