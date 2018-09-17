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
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import ObjectGet from 'object-get';

import { withStyles } from '@material-ui/core/styles/index';
import { isEmployee } from '../../../helper/checkRole';
import { createSelector } from 'reselect';
import { getPrDetail, getUserroles } from '../../../reducers/selector';
import * as actions from '../../../actions';
import { prStatusEnum } from '../../../helper/prStatus';
import withLoading from '../../hoc/Loading';

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
  buttonDesktopSchedulingDone: {
    position: 'relative',
    marginRight: '1%',
    backgroundColor: theme.palette.primary['A700'],
    color: '#FFF',
    marginBottom: '2%'
  }
});

function isDone(prStatuses, status) {
  if (prStatuses === undefined) {
    return false;
  } else {
    return prStatuses.includes(status);
  }
}

function mainStepIsDone(prStatusesDone, stepId) {
  if (prStatusesDone !== undefined) {
    return Object.values(
      updateStepStructure(prStatusesDone)[stepId].substeps
    ).every(substep => substep.isCompleted);
  }
  return false;
}

const getCompletedSubsteps = () => {
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

const updateStepStructure = prStatusesDone => {
  console.log(prStatusEnum);
  return [
    {
      mainStepLabel: 'Vorbereitung',
      substeps: {
        [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: {
          description: 'RELEASED_SHEET_EMPLOYEE',
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_EMPLOYEE],
          label: 'Mitarbeiter',
          rendering: {
            complete: 'Abgeschlossen',
            incomplete: <div>Nicht abgeschlossen</div>
          }
        },
        [prStatusEnum.RELEASED_SHEET_REVIEWER]: {
          description: 'RELEASED_SHEET_REVIEWER',
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_REVIEWER],
          label: 'Beurteiler',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incomplete: <div>Nicht abgeschlossen</div>
          }
        },
        [prStatusEnum.FIXED_DATE]: {
          description: 'FIXED_DATE',
          isCompleted: prStatusesDone[prStatusEnum.FIXED_DATE],
          label: 'Mitarbeiter',
          rendering: {
            complete: <Icon>done</Icon>,
            incomplete: <Icon>done</Icon>
          }
        }
      }
    },
    {
      mainStepLabel: 'Abschließen (Beurteiler)',
      substeps: {
        [prStatusEnum.FINALIZED_REVIEWER]: {
          description: 'FINALIZED_REVIEWER',
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_REVIEWER],
          label: 'Beurteiler',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incomplete: <div>Nicht abgeschlossen</div>
          }
        }
      }
    },
    {
      mainStepLabel: 'Abschließen (Mitarbeiter)',
      substeps: {
        [prStatusEnum.FINALIZED_EMPLOYEE]: {
          description: 'FINALIZED_EMPLOYEE',
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_EMPLOYEE],
          label: 'Mitarbeiter ',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incomplete: <div>Nicht abgeschlossen</div>
          }
        }
      }
    },
    {
      mainStepLabel: 'Archivieren (HR)',
      substeps: {
        [prStatusEnum.ARCHIVED_HR]: {
          description: 'ARCHIVED_HR',
          isCompleted: prStatusesDone[prStatusEnum.ARCHIVED_HR],
          label: 'HR',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incomplete: <div>Nicht abgeschlossen</div>
          }
        }
      }
    }
  ];
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

  getExtraStepContent(substeps) {
    let forEmployee = isEmployee(this.props.userroles);
    let { classes } = this.props;

    Object.values(substeps).map((substep, index) => {
      console.log(
        'Index: ' +
          index +
          ', ' +
          substep.description +
          ', ' +
          'isCompleted: ' +
          substep.isCompleted +
          ', ' +
          substep.label +
          ' ' +
          substep.rendering.complete
      );
      return (
        <Grid
          key={`SubStepGrid_${index}`}
          container
          alignItems="center"
          spacing={8}
        >
          <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
            <Grid container direction="row">
              <Grid item lg={8} md={6} sm={8} xs={8}>
                <Typography>{substep.label}</Typography>
              </Grid>
              <Grid item lg={4} md={6} sm={4} xs={4}>
                {console.log('Substep rendern.')}
                {console.log(
                  'Substep rendern: IsCompleted: ' + substep.isCompleted
                )}
                {console.log(
                  'Substep rendern: IsCompleted: ' + substep.rendering.complete
                )}
                <Typography>
                  Test
                  {substep.isCompleted
                    ? substep.rendering.complete
                    : substep.rendering.incomplete}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/*{(forEmployee && isReleasedByEmployee) ||*/}
          {/*(!forEmployee && isReleasedByReviewer) ? (*/}
          {/*<Grid item xl={6} lg={12} md={12} sm={12} xs={12}>*/}
          {/*<Button*/}
          {/*disabled={done}*/}
          {/*className={*/}
          {/*done ? classes.buttonDesktopDisabled : classes.buttonDesktop*/}
          {/*}*/}
          {/*onClick={this.changeStateOnButtonClick(status)}*/}
          {/*>*/}
          {/*PR freigeben*/}
          {/*</Button>*/}
          {/*</Grid>*/}
          {/*) : null}*/}

          {/*{forEmployee && meetingIsScheduled ? (*/}
          {/*<Grid item xl={6} lg={12} md={12} sm={12} xs={12}>*/}
          {/*<Link*/}
          {/*to={`/prs/${this.props.prById.id}/scheduling`}*/}
          {/*style={{ textDecoration: 'none' }}*/}
          {/*>*/}
          {/*<Button*/}
          {/*id="scheduling"*/}
          {/*className={*/}
          {/*done*/}
          {/*? classes.buttonDesktopSchedulingDone*/}
          {/*: classes.buttonDesktop*/}
          {/*}*/}
          {/*>*/}
          {/*{done ? 'Termindetails' : 'Termin finden'}*/}
          {/*</Button>*/}
          {/*</Link>*/}
          {/*</Grid>*/}
          {/*) : null}*/}
        </Grid>
      );
    });
  }

  render() {
    const { classes, prStatusesDone } = this.props;

    if (!prStatusesDone) {
      return null;
    }

    const stepStructure = updateStepStructure(prStatusesDone);

    return (
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <ListItemText>Fortschritt des Reviewprozesses</ListItemText>
          </ListItem>
          <ListItem>
            <Stepper
              orientation="horizontal"
              className={classes.stepper}
              activeStep={
                [...Array(stepStructure.length).keys()].filter(stepId =>
                  mainStepIsDone(prStatusesDone, stepId)
                ).length
              }
              onChange={() => {}}
            >
              {stepStructure.map(mainStep => {
                console.log('MainStep: ' + mainStep.mainStepLabel);
                return (
                  <Step key={mainStep.mainStepLabel}>
                    <StepLabel>{mainStep.mainStepLabel}</StepLabel>
                    <StepContent TransitionProps={{ in: true }}>
                      {this.getExtraStepContent(mainStep.substeps)}
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
    prStatusesDone: getCompletedSubsteps()(state),
    userroles: getUserroles(state)
  }),
  {
    addPrStatus: actions.addPrStatus,
    fetchPrById: actions.fetchPrById
  }
)(
  withLoading(props => {
    return props.fetchPrById(1);
  })(StyledComponent)
);
