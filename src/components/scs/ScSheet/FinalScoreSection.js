import React, { memo } from 'react';
import { injectIntl } from 'react-intl';
import {
  determineFinalPercentage,
  determineFinalText
} from './calculationFunc';

// Material UI
import { withStyles, Grid, Typography } from '@material-ui/core';

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

const FinalScoreSection = memo(
  ({ intl, classes, finalScore }) => {
    let finalTextId = determineFinalText(finalScore);
    return (
      <div className={classes.container}>
        <Grid container className={classes.scoreGridContainer}>
          <Grid item sm={10}>
            <Typography variant="body1">
              {intl.formatMessage({ id: 'scwithoutPR.score.title' })}
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="body1">{finalScore}</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.percentageGridContainer}>
          <Grid item sm={10}>
            <Typography variant="body1" className={classes.white}>
              {finalTextId && intl.formatMessage({ id: `${finalTextId}` })}
            </Typography>
          </Grid>
          <Grid item sm={2}>
            {`${determineFinalPercentage(finalScore)} %`}
          </Grid>
        </Grid>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.finalScore === nextProps.finalScore
);

export default injectIntl(withStyles(styles)(FinalScoreSection));
