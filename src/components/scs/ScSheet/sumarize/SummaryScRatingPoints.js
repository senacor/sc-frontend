import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import { InputLabel, withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

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
  },
  input: {
    color: theme.palette.secondary.darkGrey
  }
});

const SummaryScRatingPoints = ({
  classes,
  intl,
  type,
  ratingReviewer,
  ratingEmployee
}) => {
  return (
    <Fragment>
      <InputLabel id="evaluation-label">
        {intl.formatMessage({
          id: 'scsheet.textheader.evaluation'
        })}
      </InputLabel>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl style={{ display: 'block', paddingRight: '2vw' }}>
          <InputLabel id="evaluation-label">
            {intl.formatMessage({
              id: 'sc.summary.reviewer'
            })}
          </InputLabel>
          <Select
            disabled
            id="evaluation-label"
            value={ratingReviewer}
            className={classes.select}
            renderValue={selected => <span>{selected}</span>}
            inputProps={{ className: classes.input }}
          />
        </FormControl>
        <FormControl style={{ display: 'block' }}>
          <InputLabel id="evaluation-label">
            {intl.formatMessage({
              id: 'sc.summary.employee'
            })}
          </InputLabel>
          <Select
            disabled
            id="evaluation-label"
            value={ratingEmployee}
            className={classes.select}
            renderValue={selected => <span>{selected}</span>}
            inputProps={{ className: classes.input }}
          />
        </FormControl>
      </div>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(SummaryScRatingPoints));
