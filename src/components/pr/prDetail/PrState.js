import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles/index';
import { getPrDetail, getUserroles } from '../../../reducers/selector';
import * as actions from '../../../actions';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrStatusStepper from './PrStateStepper';

const styles = theme => ({
  paper: {
    backgroundColor: 'inherit',
    marginBottom: 2 * theme.spacing.unit
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

class PrState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mainStepIsDone = (prStatusesDone, stepId, stepStructure) => {
    if (prStatusesDone !== undefined) {
      return Object.values(stepStructure[stepId].substeps).every(
        substep => substep.isCompleted
      );
    }
    return false;
  };

  calculateActiveStep = (prStatusesDone, stepStructure) => {
    return [...Array(stepStructure.length).keys()].filter(stepId =>
      this.mainStepIsDone(prStatusesDone, stepId, stepStructure)
    ).length;
  };

  getCompletedSubsteps = prStatuses => {
    let isDoneStatusMap = {};
    for (let status in prStatusEnum) {
      isDoneStatusMap[prStatusEnum[status]] = this.isDone(
        prStatuses,
        prStatusEnum[status]
      );
    }
    return isDoneStatusMap;
  };

  isDone = (prStatuses, status) => {
    if (prStatuses === undefined) {
      return false;
    } else {
      return prStatuses.includes(status);
    }
  };

  updateStepStructure = (prStatusesDone, releaseButtonClick) => {
    return [
      {
        mainStepLabel: 'Vorbereitung',
        substeps: {
          [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: {
            isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_EMPLOYEE],
            label: 'Mitarbeiter: ',
            rendering: {
              complete: 'Abgeschlossen',
              incomplete: (
                <PrStatusActionButton
                  label={'Freigabe'}
                  releaseButtonClick={releaseButtonClick(
                    prStatusEnum.RELEASED_SHEET_EMPLOYEE
                  )}
                />
              )
            }
          },
          [prStatusEnum.RELEASED_SHEET_REVIEWER]: {
            isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_REVIEWER],
            label: 'Beurteiler: ',
            rendering: {
              complete: 'Abgeschlossen',
              incomplete: (
                <PrStatusActionButton
                  label={'Freigabe'}
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
              complete: 'Alle Teilnehmer haben zugesagt',
              incomplete: 'Nicht abgeschlossen'
            }
          }
        }
      },
      {
        mainStepLabel: 'Gespräch',
        substeps: {
          [prStatusEnum.FINALIZED_REVIEWER]: {
            isCompleted: prStatusesDone[prStatusEnum.FINALIZED_REVIEWER],
            label: 'Beurteiler: ',
            rendering: {
              complete: <div>Abgeschlossen</div>,
              incomplete: (
                <PrStatusActionButton
                  label={'Abschließen'}
                  releaseButtonClick={releaseButtonClick(
                    prStatusEnum.FINALIZED_REVIEWER
                  )}
                />
              )
            }
          }
        }
      },
      {
        mainStepLabel: 'Abschluss',
        substeps: {
          [prStatusEnum.FINALIZED_EMPLOYEE]: {
            isCompleted: prStatusesDone[prStatusEnum.FINALIZED_EMPLOYEE],
            label: 'Mitarbeiter:',
            rendering: {
              complete: 'Abgeschlossen',
              incomplete: 'Nicht abgeschlossen'
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
              complete: 'Archiviert',
              incomplete: 'Nicht archiviert'
            }
          }
        }
      }
    ];
  };

  releaseButtonClick = status => event => {
    let pr = this.props.prById;
    if (!event.disabled) {
      this.props.addPrStatus(pr, status);
    }
  };

  render() {
    const { classes, prById } = this.props;
    if (!prById) {
      return null;
    }
    const prStatusesDone = this.getCompletedSubsteps(prById.statuses);

    if (!prStatusesDone) {
      return null;
    }

    const stepStructure = this.updateStepStructure(
      prStatusesDone,
      this.releaseButtonClick
    );

    const activeStep = this.calculateActiveStep(prStatusesDone, stepStructure);

    return (
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <ListItemText>Fortschritt des Reviewprozesses</ListItemText>
          </ListItem>
          <ListItem>
            <PrStatusStepper
              stepStructure={stepStructure}
              activeStep={activeStep}
            />
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
    userroles: getUserroles(state)
  }),
  {
    addPrStatus: actions.addPrStatus
  }
)(StyledComponent);
