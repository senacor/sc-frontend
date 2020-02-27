import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import { determineFinalPercentage } from './calculations/helperFunctions';
// Material UI
import { Grid, Typography, withStyles } from '@material-ui/core';

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
  ({ isReady, intl, classes, finalScore, reviewerScore }) => {
    const percentageTextDescription = () => {
      if (!isReady) {
        return intl.formatMessage({
          id: 'scsheet.score.percentagetext'
        });
      }

      const percentageToMessageId = {
        75: 'scsheet.score.percentage.title.75',
        100: 'scsheet.score.percentage.title.100',
        125: 'scsheet.score.percentage.title.125',
        150: 'scsheet.score.percentage.title.150',
        175: 'scsheet.score.percentage.title.175',
        200: 'scsheet.score.percentage.title.200',
        225: 'scsheet.score.percentage.title.225',
        250: 'scsheet.score.percentage.title.250',
        300: 'scsheet.score.percentage.title.300'
      };

      return (
        <Fragment>
          {intl.formatMessage({
            id: 'scsheet.score.percentagetext'
          })}
          :{' '}
          {intl.formatMessage({
            id: percentageToMessageId[determineFinalPercentage(finalScore)]
          })}
        </Fragment>
      );
    };

    return (
      <div className={classes.container}>
        <Grid container className={classes.scoreGridContainer}>
          <Grid item sm={10}>
            <Typography variant="body1">
              {intl.formatMessage({
                id: 'scwithoutPR.score.title'
              })}
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="body1">{finalScore.toFixed(1)}</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.percentageGridContainer}>
          <Grid item sm={10}>
            <Typography variant="body1" className={classes.white}>
              {percentageTextDescription()}
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
