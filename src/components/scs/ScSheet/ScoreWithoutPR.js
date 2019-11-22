import React, { useState, useEffect, memo } from 'react';
import { injectIntl } from 'react-intl';
import {
  withStyles,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { round } from './calculationFunc';

const styles = theme => ({
  ...theme.styledComponents,
  container: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  scoreGridContainer: {
    background: theme.palette.secondary.brightGrey,
    padding: theme.spacing.unit
  },
  percentageGridContainer: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`
  },
  white: {
    color: theme.palette.secondary.contrastText
  }
});

const ScoreWithoutPR = memo(
  ({ intl, classes, finalScore }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
      () => {
        if (finalScore) {
          setIsLoading(false);
        }
      },
      [finalScore]
    );

    console.log('now');

    if (isLoading) {
      return (
        <div className={classes.progressBarCentered}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <div className={classes.container}>
        <Grid container className={classes.scoreGridContainer}>
          <Grid item sm={10}>
            <Typography variant="body1">
              {intl.formatMessage({ id: 'scwithoutPR.score.title' })}
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="body1">{round(finalScore, 1)}</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.percentageGridContainer}>
          <Grid item sm={10}>
            <Typography variant="body1" className={classes.white}>
              Score text
            </Typography>
          </Grid>
          <Grid item sm={2}>
            100%
          </Grid>
        </Grid>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.finalScore === nextProps.finalScore
);

export default injectIntl(withStyles(styles)(ScoreWithoutPR));
