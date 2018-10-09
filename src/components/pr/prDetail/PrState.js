import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import objectGet from 'object-get';

import { withStyles } from '@material-ui/core/styles/index';
import {
  getPrDetail,
  getUserroles,
  getUserinfo
} from '../../../reducers/selector';
import * as actions from '../../../actions';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrStatusStepper from './PrStateStepper';
import { isHr } from '../../../helper/checkRole';

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

  hasRoleInPrBasedOnUserName = (pr, userinfo) => roles => {
    let hasRoleInPr = false;
    roles.forEach(function(item) {
      if (objectGet(pr, `${item}.login`) === userinfo.userPrincipalName) {
        hasRoleInPr = true;
      }
    });
    return hasRoleInPr;
  };

  updateStepStructure = (pr, userinfo, prStatusesDone, releaseButtonClick) => {
    let hasRoleInPr = this.hasRoleInPrBasedOnUserName(pr, userinfo);
    let step1 = {
      mainStepLabel: 'Vorbereitung',
      substeps: {
        [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: {
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_EMPLOYEE],
          isCurrentUserActionPerformer: hasRoleInPr(['employee']),
          label: 'Mitarbeiter: ',
          rendering: {
            complete: 'Abgeschlossen',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
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
          isCurrentUserActionPerformer: hasRoleInPr(['supervisor', 'reviewer']),
          label: 'Beurteiler: ',
          rendering: {
            complete: 'Abgeschlossen',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
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
          isCurrentUserActionPerformer: hasRoleInPr([
            'supervisor',
            'reviewer',
            'employee'
          ]),
          label: 'Terminfindung',
          rendering: {
            complete: 'Alle Teilnehmer haben zugesagt',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: 'Nicht abgeschlossen'
          }
        }
      }
    };
    let step2 = {
      mainStepLabel: 'Gespräch',
      substeps: {
        [prStatusEnum.FINALIZED_REVIEWER]: {
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_REVIEWER],
          isCurrentUserActionPerformer: hasRoleInPr(['supervisor', 'reviewer']),
          label: 'Beurteiler: ',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
              <PrStatusActionButton
                label={'Freigabe'}
                releaseButtonClick={releaseButtonClick(
                  prStatusEnum.FINALIZED_REVIEWER
                )}
              />
            )
          }
        }
      }
    };
    let step3 = {
      mainStepLabel: 'Abschluss',
      substeps: {
        [prStatusEnum.FINALIZED_EMPLOYEE]: {
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_EMPLOYEE],
          isCurrentUserActionPerformer: hasRoleInPr(['employee']),
          label: 'Mitarbeiter:',
          rendering: {
            complete: 'Abgeschlossen',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
              <PrStatusActionButton
                label={'Freigabe'}
                releaseButtonClick={releaseButtonClick(
                  prStatusEnum.FINALIZED_EMPLOYEE
                )}
              />
            )
          }
        }
      }
    };
    let step4 = {
      mainStepLabel: 'Archivieren',
      substeps: {
        [prStatusEnum.ARCHIVED_HR]: {
          isCompleted: prStatusesDone[prStatusEnum.ARCHIVED_HR],
          label: 'HR: ',
          rendering: {
            complete: 'Archiviert',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
              <PrStatusActionButton
                label={'Freigabe'}
                releaseButtonClick={releaseButtonClick(
                  prStatusEnum.ARCHIVED_HR
                )}
              />
            )
          }
        }
      }
    };

    let userIsMemberOfHr = isHr(this.props.userroles);
    if (userIsMemberOfHr) {
      return [step1, step2, step3, step4];
    } else {
      return [step1, step2, step3];
    }
  };

  releaseButtonClick = status => event => {
    let pr = this.props.prById;
    if (!event.disabled) {
      this.props.addPrStatus(pr, status);
    }
  };

  render() {
    const { classes, prById, userinfo } = this.props;
    if (!prById) {
      return null;
    }
    const prStatusesDone = this.getCompletedSubsteps(prById.statuses);

    if (!prStatusesDone) {
      return null;
    }

    const stepStructure = this.updateStepStructure(
      prById,
      userinfo,
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
    userroles: getUserroles(state),
    userinfo: getUserinfo(state)
  }),
  {
    addPrStatus: actions.addPrStatus
  }
)(StyledComponent);
