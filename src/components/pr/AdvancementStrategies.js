import React, { Fragment } from 'react';
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
  convertLocalDateTime,
  isValidDate,
  FRONTEND_LOCALE_DATE_TIME_FORMAT
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

const AdvancementStrategies = ({ classes, intl, advStrategies, readOnly }) => {
  const changeArrangementComment = value => {
    advStrategies.arrangement.comment = value;
  };

  const changeTrainings = value => {
    advStrategies.trainings = value;
  };

  const changeOppWindowDate = value => {
    if (isValidDate) {
      advStrategies.opportunityWindow = convertLocalDateTime(value);
    }
  };

  const changeProjectDate = value => {
    if (isValidDate) {
      advStrategies.changeProject = convertLocalDateTime(value);
    }
  };

  const changeRoleDate = value => {
    if (isValidDate) {
      advStrategies.changeRole = convertLocalDateTime(value);
    }
  };

  const changeArrangementDate = value => {
    if (isValidDate) {
      advStrategies.arrangement.date = convertLocalDateTime(value);
    }
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
                    advStrategies.opportunityWindow,
                    FRONTEND_LOCALE_DATE_TIME_FORMAT
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
                    advStrategies.changeProject,
                    FRONTEND_LOCALE_DATE_TIME_FORMAT
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
                  formatLocaleDateTime(
                    advStrategies.changeRole,
                    FRONTEND_LOCALE_DATE_TIME_FORMAT
                  ) || ''
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
                defaultValue={
                  formatLocaleDateTime(
                    advStrategies.arrangement.date,
                    FRONTEND_LOCALE_DATE_TIME_FORMAT
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
                text={advStrategies.arrangement.comment}
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
            text={advStrategies.trainings}
            action={changeTrainings}
          />
        </Grid>
        <Divider />
      </form>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AdvancementStrategies));
