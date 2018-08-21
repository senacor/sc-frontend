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
import { isEmployee } from '../../helper/checkRole';
import { createSelector } from 'reselect';
import { getPrDetail, getUserroles } from '../../reducers/selector';
import { addPrStatus } from '../../actions/status';
import { translationMap } from '../translate/Translate';

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

export const prStatusEnum = {
  RELEASED_SHEET_REVIEWER: 'FILLED_SHEET_REVIEWER',
  RELEASED_SHEET_EMPLOYEE: 'FILLED_SHEET_EMPLOYEE',
  FIXED_DATE: 'ALL_DATES_ACCEPTED',
  FINALIZED_REVIEWER: 'MODIFICATIONS_ACCEPTED_REVIEWER',
  FINALIZED_EMPLOYEE: 'MODIFICATIONS_ACCEPTED_EMPLOYEE',
  ARCHIVED_HR: 'COMPLETED_PR'
};

const progressStructure = [
  {
    text: 'Vorbereitung PR',
    statuses: [
      prStatusEnum.RELEASED_SHEET_EMPLOYEE,
      prStatusEnum.RELEASED_SHEET_REVIEWER,
      prStatusEnum.FIXED_DATE
    ]
  },
  {
    text: 'PR abschließen (Beurteiler)',
    statuses: [prStatusEnum.FINALIZED_REVIEWER]
  },
  {
    text: 'PR abschließen (Mitarbeiter)',
    statuses: [prStatusEnum.FINALIZED_EMPLOYEE]
  },
  {
    text: 'PR archivieren (HR)',
    statuses: [prStatusEnum.ARCHIVED_HR]
  }
];

function isDone(prStatuses, status) {
  if (prStatuses === undefined) {
    return false;
  } else {
    return prStatuses.includes(status);
  }
}

function mainStepIsDone(prStatusesDone, stepId) {
  if (prStatusesDone !== undefined) {
    let finishedSubTasks = progressStructure[stepId].statuses.map(
      status => prStatusesDone[status]
    );
    if (!finishedSubTasks.includes(undefined)) {
      return !finishedSubTasks.includes(false);
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const getFinishedMilestones = () => {
  return createSelector(
    [state1 => state1.prs, state2 => state2.prDetailId],
    (prs, prDetailId) => {
      if (prs[prDetailId] === undefined) {
        return undefined;
      } else {
        let prStatuses = ObjectGet(prs[prDetailId], 'statuses');
        let isDoneStatusMap = {};
        for (let status in prStatusEnum) {
          isDoneStatusMap[prStatusEnum[status]] = isDone(
            prStatuses,
            prStatusEnum[status]
          );
        }
        return isDoneStatusMap;
      }
    }
  );
};

class PrState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeStateOnButtonClick = status => event => {
    let pr = this.props.prById;
    if (!event.disabled) {
      this.props.addPrStatus(pr, status);
    }
  };

  getExtraStepContent(status) {
    let isStatusDoneMap = this.props.prStatusesDone;
    let forEmployee = isEmployee(this.props.userroles);
    let isReleasedByEmployee = status === prStatusEnum.RELEASED_SHEET_EMPLOYEE;
    let isReleasedByReviewer = status === prStatusEnum.RELEASED_SHEET_REVIEWER;
    let supervisorfinalizesPr = status === prStatusEnum.FINALIZED_REVIEWER;
    let { classes } = this.props;
    switch (status) {
      case prStatusEnum.RELEASED_SHEET_EMPLOYEE:
      case prStatusEnum.RELEASED_SHEET_REVIEWER:
      case prStatusEnum.FIXED_DATE:
        let done =
          isStatusDoneMap === undefined
            ? false
            : ObjectGet(isStatusDoneMap, status);
        return (
          <Grid
            key={`SubStepGrid_${status}`}
            container
            alignItems="center"
            spacing={8}
          >
            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
              <Grid container direction="row">
                <Grid item lg={8} md={6} sm={8} xs={8}>
                  <Typography>{translationMap[status]}</Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={4} xs={4}>
                  {done ? <Icon>done</Icon> : null}
                </Grid>
              </Grid>
            </Grid>
            {(forEmployee && isReleasedByEmployee) ||
            (!forEmployee && isReleasedByReviewer) ? (
              <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                <Button
                  disabled={done}
                  className={
                    done ? classes.buttonDesktopDisabled : classes.buttonDesktop
                  }
                  onClick={this.changeStateOnButtonClick(status)}
                >
                  PR freigeben
                </Button>
              </Grid>
            ) : null}
          </Grid>
        );
      case prStatusEnum.FINALIZED_REVIEWER:
        return (
          <div>
            {!forEmployee && supervisorfinalizesPr ? (
              <Button
                disabled={done}
                className={
                  done ? classes.buttonDesktopDisabled : classes.buttonDesktop
                }
                onClick={this.changeStateOnButtonClick(status)}
              >
                Abschließen
              </Button>
            ) : null}
          </div>
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
              activeStep={
                [...Array(progressStructure.length).keys()].filter(stepId =>
                  mainStepIsDone(this.props.prStatusesDone, stepId)
                ).length
              }
              onChange={() => {}}
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

export const StyledComponent = withStyles(styles)(PrState);
export default connect(
  state => ({
    prById: getPrDetail()(state),
    prStatusesDone: getFinishedMilestones()(state),
    userroles: getUserroles(state)
  }),
  {
    addPrStatus
  }
)(StyledComponent);
