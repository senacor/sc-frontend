import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography, TextField } from '@material-ui/core';

const styles = theme => ({
  headline: {
    width: 300
  },
  evaluation: {
    width: 170
  }
});

const ScFields = ({ intl, classes, ratings, setRatings }) => {
  return (
    <Fragment>
      <Typography variant="h5" className={classes.header}>
        {intl.formatMessage({ id: 'scsheet.category.leistungen' })}
      </Typography>
      <div>
        <TextField
          type="text"
          margin="normal"
          variant="outlined"
          label="Headline"
          className={classes.headline}
        />
        <TextField
          type="text"
          margin="normal"
          variant="outlined"
          label="Evaluation (Weight)"
          className={classes.evaluation}
        />
        <TextField
          type="text"
          margin="normal"
          variant="outlined"
          label="Percentage"
          className={classes.evaluation}
        />
      </div>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScFields));
