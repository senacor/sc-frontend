import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { injectIntl } from 'react-intl';

// Material UI
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  paddingBottom: {
    paddingBottom: 3 * theme.spacing.unit
  },
  opportunityCheckbox: {
    margin: 'auto 0px'
  },
  opportunityGridItem: {
    margin: theme.spacing.unit
  }
});

const EmployeeOpportunity = ({ classes, intl, pr, readOnly }) => {
  const employeeOpportunityData = [
    {
      id: 'opportunityWindow',
      dateId: 'opportunityWindowDate',
      label: intl.formatMessage({
        id: 'prsheet.opportunityWindow'
      })
    },
    {
      id: 'changeProject',
      dateId: 'changeProjectDate',
      label: intl.formatMessage({
        id: 'prsheet.changeProject'
      })
    },
    {
      id: 'changeRole',
      dateId: 'changeRoleDate',
      label: intl.formatMessage({
        id: 'prsheet.changeRole'
      })
    },
    {
      id: 'other',
      dateId: 'otherDate',
      label: intl.formatMessage({
        id: 'prsheet.otherArrangements'
      })
    },
    {
      id: 'trainings',
      dateId: 'trainingsDate',
      label: intl.formatMessage({
        id: 'prsheet.trainings'
      })
    }
  ];

  return (
    <form className={classes.paddingBottom}>
      <Grid container className={classes.paddingBottom}>
        {employeeOpportunityData.map((opp, index) => {
          console.log(opp);
          return (
            <Grid item xs={12} key={index}>
              <Grid container className={classes.opportunityGridItem}>
                <Grid item xs={6} className={classes.opportunityCheckbox}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={opp.id}
                          disabled={readOnly('RATINGS_REVIEWER')}
                        />
                      }
                      label={opp.label}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={opp.dateId}
                    name={opp.dateId}
                    type="date"
                    disabled={readOnly('RATINGS_REVIEWER')}
                  />
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Divider />
    </form>
  );
};

export default injectIntl(withStyles(styles)(EmployeeOpportunity));
