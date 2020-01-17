import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
// Material UI
import { Divider, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { CATEGORY } from '../../../../helper/scSheetData';
import MixedScRow from './MixedScRow';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  },
  hidden: {
    display: 'none'
  }
});

const PerformanceSummary = ({
  classes,
  intl,
  dailyBusinessGoals,
  projectGoals,
  hasWeightPercentage,
  performanceWeightPercentage,
  handleChangeWeightPercentage
}) => {
  return (
    <Fragment>
      <Grid container>
        {hasWeightPercentage ? (
          <Fragment>
            <Grid item xs={11}>
              <Typography variant="h5" className={classes.categoryTitle}>
                {intl.formatMessage({ id: 'scsheet.category.performance' })}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <TextField
                disabled={true}
                inputProps={{ style: { height: 10 } }}
                type="number"
                value={performanceWeightPercentage}
                onChange={event =>
                  handleChangeWeightPercentage(
                    CATEGORY.PERFORMANCE,
                    event.target.value
                  )
                }
                margin="normal"
                variant="outlined"
                label={'%'}
              />
            </Grid>
          </Fragment>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.categoryTitle}>
              {intl.formatMessage({ id: 'scsheet.category.performance' })}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Typography variant="h5" className={classes.subCategoryTitle}>
        {intl.formatMessage({ id: 'scsheet.subtitle.dailyBusiness' })}
      </Typography>
      {dailyBusinessGoals.map((row, index) => {
        return (
          <MixedScRow
            key={index}
            index={index}
            rowReviewer={row.reviewer}
            rowEmployee={row.employee}
            description={intl.formatMessage({
              id: 'scsheet.textarea.description'
            })}
            achievement={intl.formatMessage({
              id: 'scsheet.textarea.achievement'
            })}
            type={CATEGORY.DAILY_BUSINESS}
          />
        );
      })}
      <Divider />
      <Typography variant="h5" className={classes.subCategoryTitle}>
        {intl.formatMessage({ id: 'scsheet.subtitle.project' })}
      </Typography>
      {projectGoals.map((row, index) => {
        return (
          <MixedScRow
            key={index}
            index={index}
            rowReviewer={row.reviewer}
            rowEmployee={row.employee}
            description={intl.formatMessage({
              id: 'scsheet.textarea.description'
            })}
            achievement={intl.formatMessage({
              id: 'scsheet.textarea.achievement'
            })}
            type={CATEGORY.PROJECT}
          />
        );
      })}
      <Divider />
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(PerformanceSummary));
