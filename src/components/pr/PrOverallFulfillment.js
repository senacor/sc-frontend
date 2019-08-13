import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { mapRatingFullfilment } from '../../helper/mapRatingFullfilment';

const styles = theme => ({
  simpleBlack: {
    color: theme.palette.primary[900],
    width: '80%'
  },
  selectWidth: {
    width: '90%'
  }
});

const PrOverallFulfillment = ({
  category,
  classes,
  isReadOnly,
  hidden,
  rating,
  action,
  intl
}) => {
  const [ratingState, setRatingState] = useState(rating);

  const handleChange = value => {
    setRatingState(value);
  };

  if (isReadOnly) {
    return (
      <Grid container spacing={16}>
        <Grid item xs={10}>
          <div className={classes.simpleBlack}>
            <Typography>
              {intl.formatMessage({
                id: `${category}`
              })}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1">
            {isReadOnly
              ? mapRatingFullfilment(ratingState, intl)
              : intl.formatMessage({
                  id: 'proverallfulfillment.noentry'
                })}
          </Typography>
        </Grid>
      </Grid>
    );
  } else if (hidden) {
    return null;
  } else {
    return (
      <Grid container spacing={16}>
        <Grid item xs={8}>
          <div className={classes.simpleBlack}>
            <Typography>
              {intl.formatMessage({
                id: `${category}`
              })}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.selectWidth}>
            <FormControl fullWidth={true}>
              <Select
                value={ratingState}
                onChange={event => {
                  handleChange(event.target.value);
                  action(event.target.value);
                }}
              >
                {[0, 1, 2, 3, 4, 5].map(ratingValue => {
                  return (
                    <MenuItem
                      key={category + '_rating_' + ratingValue}
                      value={ratingValue}
                    >
                      {mapRatingFullfilment(ratingValue, intl)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    );
  }
};

export default injectIntl(withStyles(styles)(PrOverallFulfillment));
