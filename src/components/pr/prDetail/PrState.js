import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles/index';
import {
  getPrDetail,
  getUserroles,
  getUserinfo,
  getRequiredFields,
  getPrRatings,
  getPrEmployeeContributions
} from '../../../reducers/selector';
import * as actions from '../../../actions';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrStatusStepper from './PrStateStepper';
import { isHr } from '../../../helper/checkRole';
import { changeRequiredFields } from '../../../actions/sheet';
import { hasRoleInPrBasedOnUserName } from '../../../helper/hasRoleInPr';
import { CheckRequiredClick } from '../../hoc/CheckRequiredClick';

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

  updateStepStructure = (pr, userinfo, prStatusesDone) => {
    let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);
    let requestedDate = prStatusesDone[prStatusEnum.REQUESTED_DATE];
    let fixedDate = prStatusesDone[prStatusEnum.FIXED_DATE];
    let requestDateLabel = fixedDate ? null : 'Terminfindung';
    let fixedDateLabel = fixedDate ? 'Terminfindung' : null;
    let dateRequestedText = requestedDate ? 'Terminvorschlag verschickt' : null;
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
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.RELEASED_SHEET_EMPLOYEE
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
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.RELEASED_SHEET_REVIEWER
            )
          }
        },
        [prStatusEnum.REQUESTED_DATE]: {
          isCompleted: prStatusesDone[prStatusEnum.REQUESTED_DATE],
          isCurrentUserActionPerformer: hasRoleInPr([
            'employee',
            'reviewer',
            'supervisor'
          ]),
          label: requestDateLabel,
          rendering: {
            complete: null,
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: 'Bitte einen Termin vereinbaren'
          }
        },
        [prStatusEnum.FIXED_DATE]: {
          isCompleted: prStatusesDone[prStatusEnum.FIXED_DATE],
          isCurrentUserActionPerformer: hasRoleInPr([
            'reviewer',
            'supervisor',
            'employee'
          ]),
          label: fixedDateLabel,
          rendering: {
            complete: 'Abgeschlossen',
            incompleteForNonActionPerformer: dateRequestedText,
            incompleteForActionPerformer: dateRequestedText
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
            complete: 'Abgeschlossen',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.FINALIZED_REVIEWER
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
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.FINALIZED_EMPLOYEE
            )
          }
        }
      }
    };
    let step4 = {
      mainStepLabel: 'PR-Nachbearbeitung',
      substeps: {
        [prStatusEnum.ARCHIVED_HR]: {
          isCompleted: prStatusesDone[prStatusEnum.ARCHIVED_HR],
          isCurrentUserActionPerformer: isHr(this.props.userroles),
          label: 'HR: ',
          rendering: {
            complete: 'Archiviert',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.ARCHIVED_HR
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

  checkRequiredFields = (
    employeeContributionRole,
    employeeContributionLeader,
    overallComment,
    status
  ) => {
    let filledEmployee =
      employeeContributionRole !== null &&
      employeeContributionLeader !== null &&
      employeeContributionRole !== '' &&
      employeeContributionLeader !== '';
    let filledReviewer = overallComment !== null && overallComment !== '';

    let required = { employee: true, reviewer: true };
    switch (status) {
      case prStatusEnum.RELEASED_SHEET_EMPLOYEE:
        return Object.assign({}, required, {
          employee: filledEmployee
        });
      case prStatusEnum.RELEASED_SHEET_REVIEWER:
        return Object.assign({}, required, {
          reviewer: filledReviewer
        });
      case prStatusEnum.FINALIZED_REVIEWER:
        return Object.assign({}, required, {
          reviewer: filledReviewer
        });
      default:
        return required;
    }
  };

  requiredFieldsEmpty = status => {
    let {
      employeeContributionRole,
      employeeContributionLeader,
      overallComment
    } = this.props;

    let fieldFilled = this.checkRequiredFields(
      employeeContributionRole,
      employeeContributionLeader,
      overallComment,
      status
    );

    if (
      prStatusEnum.RELEASED_SHEET_EMPLOYEE === status &&
      false === fieldFilled.employee
    ) {
      this.props.checkRequired(fieldFilled);
      return true;
    } else if (
      prStatusEnum.RELEASED_SHEET_REVIEWER === status &&
      false === fieldFilled.reviewer
    ) {
      this.props.checkRequired(fieldFilled);
      return true;
    } else if (
      prStatusEnum.FINALIZED_REVIEWER === status &&
      false === fieldFilled.reviewer
    ) {
      this.props.checkRequired(fieldFilled);
      return true;
    } else {
      return false;
    }
  };

  getIncompleteActionPerformerButton = (pr, status) => {
    return (
      <CheckRequiredClick
        onClick={() => {
          this.props.addPrStatus(pr, status);
        }}
        check={() => !this.requiredFieldsEmpty(status)}
        message={'Bitte alle Pflichtfelder ausfüllen.'}
      >
        <PrStatusActionButton label={'Freigabe'} />
      </CheckRequiredClick>
    );
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
      prStatusesDone
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
    userinfo: getUserinfo(state),
    overallComment: getPrRatings('FULFILLMENT_OF_REQUIREMENT')(state).comment,
    employeeContributionRole: getPrEmployeeContributions(
      'ROLE_AND_PROJECT_ENVIRONMENT'
    )(state).text,
    employeeContributionLeader: getPrEmployeeContributions(
      'INFLUENCE_OF_LEADER_AND_ENVIRONMENT'
    )(state).text,
    requiredFields: getRequiredFields(state)
  }),
  {
    checkRequired: changeRequiredFields,
    addPrStatus: actions.addPrStatus
  }
)(StyledComponent);
