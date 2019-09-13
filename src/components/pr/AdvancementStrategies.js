import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { injectIntl } from 'react-intl';

// Material UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PrTextField from './PrTextField';

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

const AdvancementStrategies = ({
  classes,
  intl,
  pr,
  readOnly,
  advancementStrategies
}) => {
  // const [opportunityWindow, setOpportunityWindow] = useState([]);
  // const [changeProject, setChangeProject] = useState([]);
  // const [changeRole, setChangeRole] = useState([]);
  // const [otherArrangements, setOtherArrangements] = useState([]);
  // const [trainings, setTrainings] = useState('');

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
              <TextField type="date" disabled={readOnly('RATINGS_REVIEWER')} />
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
              <TextField type="date" disabled={readOnly('RATINGS_REVIEWER')} />
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
              <TextField type="date" disabled={readOnly('RATINGS_REVIEWER')} />
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
              <TextField type="date" disabled={readOnly('RATINGS_REVIEWER')} />
            </Grid>
            <Grid item xs={12} className={classes.paddingBottom}>
              <PrTextField
                type="text"
                isReadOnly={readOnly('RATINGS_REVIEWER')}
                isError={false}
                rows="2"
              />
            </Grid>
          </Grid>
          <PrTextField
            label={intl.formatMessage({
              id: 'prsheet.trainings'
            })}
            // text={pr.advancementStrategies}
            isReadOnly={readOnly('RATINGS_REVIEWER')}
            isError={false}
            rows="2"
          />
        </Grid>
        <Divider />
      </form>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AdvancementStrategies));
