import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ObjectGet from 'object-get';

import { withStyles } from '@material-ui/core/styles/index';
import { createSelector } from 'reselect';
import { getPrDetail, getUserroles } from '../../../reducers/selector';
import * as actions from '../../../actions';
import { prStatusEnum } from '../../../helper/prStatus';
import withLoading from '../../hoc/Loading';
import { StyledReleaseButton } from './ReleaseButton';

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
  },
  gridOffset: {
    paddingLeft: theme.spacing.unit
  },
  mainStepLabel: {
    color: theme.palette.primary['400']
  },
  stepLabelRoot: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  stepperRoot: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  stepConnectorRoot: {
    paddingTop: '10px'
  }
});

function isDone(prStatuses, status) {
  if (prStatuses === undefined) {
    return false;
  } else {
    return prStatuses.includes(status);
  }
}

function mainStepIsDone(prStatusesDone, stepId, stepStructure) {
  if (prStatusesDone !== undefined) {
    return Object.values(stepStructure[stepId].substeps).every(
      substep => substep.isCompleted
    );
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

const updateStepStructure = (prStatusesDone, releaseButtonClick) => {
  return [
    {
      mainStepLabel: 'Vorbereitung',
      substeps: {
        [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: {
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_EMPLOYEE],
          label: 'Mitarbeiter: ',
          rendering: {
            complete: 'Abgeschlossen',
            incomplete: <div>Nicht abgeschlossen</div>
          }
        },
        [prStatusEnum.RELEASED_SHEET_REVIEWER]: {
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_REVIEWER],
          label: 'Beurteiler: ',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incomplete: (
              <StyledReleaseButton
                releaseButtonClick={releaseButtonClick(
                  prStatusEnum.RELEASED_SHEET_REVIEWER
                )}
              />
            )
          }
        },
        [prStatusEnum.FIXED_DATE]: {
          isCompleted: prStatusesDone[prStatusEnum.FIXED_DATE],
          label: 'Terminfindung',
          rendering: {
            complete: <div>Alle Teilnehmer haben zugesagt</div>,
            incomplete: <div>Nicht abgeschlossen</div>
          }
        }
      }
    },
    {
      mainStepLabel: 'Abschließen (Beurteiler)',
      substeps: {
        [prStatusEnum.FINALIZED_REVIEWER]: {
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_REVIEWER],
          label: 'Beurteiler: ',
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
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_EMPLOYEE],
          label: 'Mitarbeiter:',
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
          isCompleted: prStatusesDone[prStatusEnum.ARCHIVED_HR],
          label: 'HR: ',
          rendering: {
            complete: <div>Archiviert</div>,
            incomplete: <div>Nicht archiviert</div>
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

  releaseButtonClick = status => event => {
    let pr = this.props.prById;
    if (!event.disabled) {
      this.props.addPrStatus(pr, status);
    }
  };

  getExtraStepContent(substeps) {
    let { classes } = this.props;
    console.table(substeps);
    return Object.values(substeps).map((substep, index) => {
      return (
        <Grid
          key={`SubStepGrid_${index}`}
          container
          alignItems="center"
          spacing={12}
        >
          <Grid item lg={12} md={6} sm={8} xs={8}>
            <Typography>{substep.label}</Typography>
          </Grid>
          <Grid
            className={classes.gridOffset}
            item
            lg={12}
            md={6}
            sm={4}
            xs={4}
          >
            {substep.isCompleted
              ? substep.rendering.complete
              : substep.rendering.incomplete}
          </Grid>
        </Grid>
      );
    });
  }

  render() {
    const { classes, prStatusesDone } = this.props;

    if (!prStatusesDone) {
      return null;
    }

    const stepStructure = updateStepStructure(
      prStatusesDone,
      this.releaseButtonClick
    );

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
                  mainStepIsDone(prStatusesDone, stepId, stepStructure)
                ).length
              }
              onChange={() => {}}
              classes={{ root: classes.stepperRoot }}
              connector={
                <StepConnector classes={{ root: classes.stepConnectorRoot }} />
              }
            >
              {stepStructure.map(mainStep => {
                return (
                  <Step key={mainStep.mainStepLabel}>
                    <StepLabel classes={{ root: classes.stepLabelRoot }}>
                      <Typography
                        variant="subheading"
                        gutterBottom
                        className={classes.mainStepLabel}
                      >
                        {mainStep.mainStepLabel}
                      </Typography>
                      {this.getExtraStepContent(mainStep.substeps)}
                    </StepLabel>
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
