import React, { Fragment, useState } from 'react';
import moment from 'moment-timezone';
import { withStyles } from '@material-ui/core/styles/index';
import { injectIntl } from 'react-intl';

// Material UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PrTextField from './PrTextField';
import {
  formatLocaleDateTime,
  validateDate,
  convertLocalDateTime
} from '../../helper/date';

const styles = theme => ({
  paddingBottom: {
    paddingBottom: 3 * theme.spacing.unit
  },
  marginBottom: {
    marginBottom: 3 * theme.spacing.unit
  },
  opportunityText: {
    margin: 'auto 0px'
  },
  opportunityGridItem: {
    margin: `${theme.spacing.unit} 0`,
    padding: `${theme.spacing.unit} 0`,
    minHeight: 80
  },
  textField: {
    margin: 'auto 0',
    padding: '0 10px',
    '& input': {
      width: 150
    }
  }
});

const AdvancementStrategies = ({ classes, intl, pr, readOnly }) => {
  const changeArrangementComment = value => {
    pr.advancementStrategies.arrangement.comment = value;
  };

  const changeTrainings = value => {
    pr.advancementStrategies.trainings = value;
  };

  const changeOppWindowDate = value => {
    pr.advancementStrategies.opportunityWindow = convertLocalDateTime(value);
  };

  const changeProjectDate = value => {
    pr.advancementStrategies.changeProject = convertLocalDateTime(value);
  };

  const changeRoleDate = value => {
    validateDate(value);
    pr.advancementStrategies.changeRole = convertLocalDateTime(value);
  };

  const changeArrangementDate = value => {
    pr.advancementStrategies.arrangement.date = convertLocalDateTime(value);
  };

  return (
    <Fragment>
      <Typography variant="body2">
        {intl.formatMessage({
          id: 'prsheet.employeeOpportunityTitle'
        })}
      </Typography>
      <form className={classes.paddingBottom}>
        <Grid container className={classes.paddingBottom}>
          <Grid container className={classes.opportunityGridItem}>
            <Grid item xs={6} className={classes.opportunityText}>
              <Typography component="span">
                {intl.formatMessage({
                  id: 'prsheet.opportunityWindow'
                })}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.textField}>
              <TextField
                type="date"
                disabled={readOnly('RATINGS_REVIEWER')}
                name="oppWindowDate"
                onChange={changeOppWindowDate}
                defaultValue={
                  formatLocaleDateTime(
                    pr.advancementStrategies.opportunityWindow
                  ) || ''
                }
              />
            </Grid>
          </Grid>
          <Grid container className={classes.opportunityGridItem}>
            <Grid item xs={6} className={classes.opportunityText}>
              <Typography component="span">
                {intl.formatMessage({
                  id: 'prsheet.changeProject'
                })}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.textField}>
              <TextField
                type="date"
                disabled={readOnly('RATINGS_REVIEWER')}
                defaultValue={
                  formatLocaleDateTime(
                    pr.advancementStrategies.changeProject
                  ) || ''
                }
                onChange={changeProjectDate}
              />
            </Grid>
          </Grid>
          <Grid
            container
            className={`${classes.opportunityGridItem} ${classes.marginBottom}`}
          >
            <Grid item xs={6} className={classes.opportunityText}>
              <Typography component="span">
                {intl.formatMessage({
                  id: 'prsheet.changeRole'
                })}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.textField}>
              <TextField
                type="date"
                disabled={readOnly('RATINGS_REVIEWER')}
                defaultValue={
                  formatLocaleDateTime(pr.advancementStrategies.changeRole) ||
                  ''
                }
                onChange={changeRoleDate}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.opportunityGridItem}>
            <Grid item xs={6} className={classes.opportunityText}>
              <Typography>
                {intl.formatMessage({
                  id: 'prsheet.otherArrangements'
                })}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.textField}>
              <TextField
                type="date"
                disabled={readOnly('RATINGS_REVIEWER')}
                value={
                  formatLocaleDateTime(
                    pr.advancementStrategies.arrangement.date
                  ) || ''
                }
                onChange={changeArrangementDate}
              />
            </Grid>
            <Grid item xs={12} className={classes.paddingBottom}>
              <PrTextField
                type="text"
                isReadOnly={readOnly('RATINGS_REVIEWER')}
                isError={false}
                rows="2"
                text={pr.advancementStrategies.arrangement.comment}
                action={changeArrangementComment}
              />
            </Grid>
          </Grid>
          <PrTextField
            label={intl.formatMessage({
              id: 'prsheet.trainings'
            })}
            isReadOnly={readOnly('RATINGS_REVIEWER')}
            isError={false}
            rows="2"
            text={pr.advancementStrategies.trainings}
            action={changeTrainings}
          />
        </Grid>
        <Divider />
      </form>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AdvancementStrategies));
