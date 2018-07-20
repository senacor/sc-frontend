import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import ObjectGet from 'object-get';

import { withStyles } from '@material-ui/core/styles/index';
import { isEmployee, isSupervisor } from '../../helper/checkRole';
import { createSelector } from 'reselect';
import { getPrDetail, getUserroles } from '../../reducers/selector';
import * as actions from '../../actions';

const styles = theme => ({
  paper: {
    backgroundColor: 'inherit'
  },

  stepper: {
    backgroundColor: 'inherit',
    padding: '0',
    width: '100%'
  },
  typography: {
    color: '#FFF',
    marginLeft: '30px',
    marginTop: '20px',
    fontSize: '15px'
  },
  buttonDesktop: {
    position: 'relative',
    marginRight: '1%',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '2%'
  },
  buttonDesktopDisabled: {
    position: 'relative',
    marginRight: '1%',
    backgroundColor: theme.palette.primary['50'],
    color: '#FFF',
    marginBottom: '2%'
  }
});

export const statusText = {
  FILLED_SHEET_EMPLOYEE: 'Freigabe Mitarbeiter',
  FILLED_SHEET_REVIEWER: 'Freigabe Beurteiler',
  ACCEPTED_DATE_REVIEWER: 'Termin akzeptiert',
  MODIFICATIONS_ACCEPTED_EMPLOYEE: 'Änderungen Mitarbeiter',
  MODIFICATIONS_ACCEPTED_REVIEWER: 'Änderungen Beurteiler'
};

const progressStructure = [
  {
    text: 'Vorbereitung PR',
    statuses: [
      'FILLED_SHEET_EMPLOYEE',
      'FILLED_SHEET_REVIEWER',
      'ACCEPTED_DATE_REVIEWER'
    ]
  },
  {
    text: 'PR abgeschlossen (Beurteiler)',
    statuses: ['MODIFICATIONS_ACCEPTED_REVIEWER']
  },
  {
    text: 'PR abgeschlossen (Mitarbeiter)',
    statuses: ['MODIFICATIONS_ACCEPTED_EMPLOYEE']
  },
  {
    text: 'PR archiviert (HR)',
    statuses: []
  }
];

function isDone(prStatuses, status) {
  if (prStatuses === undefined) {
    return false;
  } else {
    return prStatuses.includes(status);
  }
}

const getFinishedMilestones = all_statuses => {
  return createSelector(
    [state1 => state1.prs, state2 => state2.prDetailId],
    (prs, prDetailId) => {
      if (prs[prDetailId] === undefined) {
        return undefined;
      } else {
        let prStatuses = ObjectGet(prs[prDetailId], 'prStatusEntries');
        return Object.getOwnPropertyNames(all_statuses).reduce(function(
          previousObject,
          nextObject
        ) {
          previousObject[nextObject] = isDone(prStatuses, nextObject);
          return previousObject;
        },
        {});
      }
    }
  );
};

class PrState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeVisibility = () => {
    let pr = this.props.prById;
    if (isEmployee(this.props.userroles)) {
      this.props.setVisibilityById(
        pr,
        pr.prVisibilityEntry.visibilityToEmployee === 'VISIBLE',
        true
      );
    } else {
      if (isSupervisor(this.props.userroles)) {
        this.props.setVisibilityById(
          pr,
          true,
          pr.prVisibilityEntry.visibilityToReviewer === 'VISIBLE'
        );
      }
    }
  };

  getExtraStepContent(status) {
    let isStatusDoneMap = this.props.prStatusesDone;
    let forEmployee = isEmployee(this.props.userroles);
    let { classes } = this.props;
    switch (status) {
      case 'FILLED_SHEET_EMPLOYEE':
      case 'FILLED_SHEET_REVIEWER':
      case 'ACCEPTED_DATE_REVIEWER':
        let done =
          isStatusDoneMap === undefined
            ? false
            : ObjectGet(isStatusDoneMap, status);
        return (
          <Grid container alignItems="center" spacing={6}>
            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
              <Grid container direction="row">
                <Grid item lg={8} md={6} sm={8} xs={8}>
                  <Typography>{statusText[status]}</Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={4} xs={4}>
                  {done ? <Icon>done</Icon> : null}
                </Grid>
              </Grid>
            </Grid>
            {(forEmployee && status === 'FILLED_SHEET_EMPLOYEE') ||
            (!forEmployee && status === 'FILLED_SHEET_REVIEWER') ? (
              <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                <Button
                  disabled={done}
                  className={
                    done ? classes.buttonDesktopDisabled : classes.buttonDesktop
                  }
                  onClick={this.changeVisibility}
                >
                  PR freigeben
                </Button>
              </Grid>
            ) : null}
          </Grid>
        );
      default:
        return null;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <ListItemText>Fortschritt des Reviewprozesses</ListItemText>
          </ListItem>
          <ListItem>
            <Stepper
              orientation="vertical"
              className={classes.stepper}
              activeStep={0}
            >
              {progressStructure.map(progressStep => {
                return (
                  <Step key={progressStep.text}>
                    <StepLabel>{progressStep.text}</StepLabel>
                    <StepContent>
                      {progressStep.statuses.map(status => {
                        return this.getExtraStepContent(status);
                      })}
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export const Styledcomponent = withStyles(styles)(PrState);
export default connect(
  state => ({
    prById: getPrDetail()(state),
    prStatusesDone: getFinishedMilestones(statusText)(state),
    userroles: getUserroles(state)
  }),
  {
    setVisibilityById: actions.setVisibilityById
  }
)(Styledcomponent);
