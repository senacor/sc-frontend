import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography, TextField, Grid } from '@material-ui/core';
import ScRatingPoints from '../ScRatingPoints';

const styles = theme => ({
  fieldContainer: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
    background: theme.palette.secondary.brightGrey,
    borderRadius: 3
  },
  header: {
    background: theme.palette.secondary.darkGreen,
    color: theme.palette.contrastText,
    padding: theme.spacing.unit,
    borderRadius: 3
  },
  textsContainer: {
    padding: theme.spacing.unit
  },
  headline: {
    width: 300,
    marginRight: theme.spacing.unit
  },
  evaluation: {
    width: 170,
    marginRight: theme.spacing.unit
  },
  scRatingPoints: {
    textAlign: 'center'
  }
});

const ScFields = ({ intl, classes, ratings, setRatings }) => {
  return (
    <div className={classes.fieldContainer}>
      <Typography variant="h5" className={classes.header}>
        {intl.formatMessage({ id: 'scsheet.category.leistungen' })}
      </Typography>
      <div className={classes.textsContainer}>
        <TextField
          type="text"
          margin="normal"
          variant="outlined"
          label={intl.formatMessage({ id: 'scsheet.textheader.headline' })}
          className={classes.headline}
        />
        <TextField
          type="text"
          margin="normal"
          variant="outlined"
          label={intl.formatMessage({ id: 'scsheet.textheader.evaluation' })}
          className={classes.evaluation}
        />
        <TextField
          type="text"
          margin="normal"
          variant="outlined"
          label={intl.formatMessage({ id: 'scsheet.textheader.percentage' })}
          className={classes.evaluation}
        />
        <Grid container>
          <Grid item sm={3}>
            <TextField
              type="text"
              margin="normal"
              variant="outlined"
              label={intl.formatMessage({ id: 'scsheet.textarea.description' })}
              rows={3}
              multiline
              className={classes.textarea}
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              type="text"
              margin="normal"
              variant="outlined"
              label={intl.formatMessage({ id: 'scsheet.textarea.goal' })}
              rows={3}
              multiline
              className={classes.textarea}
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              type="text"
              margin="normal"
              variant="outlined"
              label={intl.formatMessage({ id: 'scsheet.textarea.goalcomment' })}
              rows={3}
              multiline
              className={classes.textarea}
            />
          </Grid>
          <Grid item sm={3} className={classes.scRatingPoints}>
            <ScRatingPoints />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default injectIntl(withStyles(styles)(ScFields));
