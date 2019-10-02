import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
  checked: {},
  center: {
    textAlign: 'center'
  },
  radio: {
    '&$checked': {
      color: theme.palette.primary[400]
    }
  },
  simpleBlack: {
    color: theme.palette.primary[900],
    marginBottom: '3%'
  }
});

const TargetRole = ({ classes, intl, targetRoles, action, isReadOnly }) => {
  const [plattformGestalter, setPlattformGestalter] = useState(
    targetRoles.plattformGestalter
  );
  const [itSolutionLeader, setItSolutionLeader] = useState(
    targetRoles.itSolutionLeader
  );
  const [transformationManager, setTransformationManager] = useState(
    targetRoles.transformationManager
  );
  const [itLiefersteuerer, setItLiefersteuerer] = useState(
    targetRoles.itLiefersteuerer
  );
  const [architect, setArchitect] = useState(targetRoles.architect);
  const [technicalExpert, setTechnicalExpert] = useState(
    targetRoles.technicalExpert
  );
  const [leadDeveloper, setLeadDeveloper] = useState(targetRoles.leadDeveloper);

  const determineTaragetRole = targetRole => {
    switch (targetRole) {
      case 'plattformGestalter':
        return plattformGestalter;
      case 'itSolutionLeader':
        return itSolutionLeader;
      case 'transformationManager':
        return transformationManager;
      case 'itLiefersteuerer':
        return itLiefersteuerer;
      case 'architect':
        return architect;
      case 'technicalExpert':
        return technicalExpert;
      case 'leadDeveloper':
        return leadDeveloper;
      default:
        break;
    }
  };

  const handleChange = (event, targetRole) => {
    let value = Number(event.target.value);
    switch (targetRole) {
      case 'plattformGestalter':
        setPlattformGestalter(value);
        break;
      case 'itSolutionLeader':
        setItSolutionLeader(value);
        break;
      case 'transformationManager':
        setTransformationManager(value);
        break;
      case 'itLiefersteuerer':
        setItLiefersteuerer(value);
        break;
      case 'architect':
        setArchitect(value);
        break;
      case 'technicalExpert':
        setTechnicalExpert(value);
        break;
      case 'leadDeveloper':
        setLeadDeveloper(value);
        break;
      default:
        break;
    }
    action(targetRole, event.target.value);
  };

  return (
    <Grid container spacing={16}>
      <Grid item xs={8} />
      <Grid item xs={4}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography
              variant={'caption'}
              color={'textSecondary'}
              className={classes.center}
            >
              {intl.formatMessage({
                id: 'proverallassessment.capability'
              })}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant={'caption'}
              color={'textSecondary'}
              className={classes.center}
            >
              {intl.formatMessage({
                id: 'proverallassessment.low'
              })}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant={'caption'}
              color={'textSecondary'}
              className={classes.center}
            >
              {intl.formatMessage({
                id: 'proverallassessment.neutral'
              })}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant={'caption'}
              color={'textSecondary'}
              className={classes.center}
            >
              {intl.formatMessage({
                id: 'proverallassessment.high'
              })}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {Object.keys(targetRoles).map(targetRole => {
          return (
            <Grid container spacing={16} key={targetRole}>
              <Grid item xs={8}>
                <div className={classes.simpleBlack}>
                  <Typography>
                    {intl.formatMessage({
                      id: `${targetRole}`
                    })}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={16}>
                  <Grid item xs={4} className={classes.center}>
                    <Radio
                      checked={determineTaragetRole(targetRole) === 1}
                      value={1}
                      disabled={isReadOnly('RATINGS_REVIEWER')}
                      onChange={event => handleChange(event, targetRole)}
                      classes={
                        !isReadOnly('RATINGS_REVIEWER') && {
                          root: classes.radio,
                          checked: classes.checked
                        }
                      }
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.center}>
                    <Radio
                      checked={determineTaragetRole(targetRole) === 2}
                      value={2}
                      disabled={isReadOnly('RATINGS_REVIEWER')}
                      onChange={event => handleChange(event, targetRole)}
                      classes={
                        !isReadOnly('RATINGS_REVIEWER') && {
                          root: classes.radio,
                          checked: classes.checked
                        }
                      }
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.center}>
                    <Radio
                      checked={determineTaragetRole(targetRole) === 3}
                      value={3}
                      disabled={isReadOnly('RATINGS_REVIEWER')}
                      onChange={event => handleChange(event, targetRole)}
                      classes={
                        !isReadOnly('RATINGS_REVIEWER') && {
                          root: classes.radio,
                          checked: classes.checked
                        }
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(TargetRole));
