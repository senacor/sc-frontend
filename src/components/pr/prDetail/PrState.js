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
  getPrEmployeeContributions,
  getMeeting,
  getSavingThreads
} from '../../../reducers/selector';
import * as actions from '../../../actions';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrStatusStepper from './PrStateStepper';
import { isHr } from '../../../helper/checkRole';
import { changeRequiredFields } from '../../../actions/sheet';
import { hasRoleInPrBasedOnUserName } from '../../../helper/hasRoleInPr';
import { CheckRequiredClick } from '../../hoc/CheckRequiredClick';
import Typography from '@material-ui/core/Typography';
import { injectIntl } from 'react-intl';

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

  updateStepStructure = (pr, userinfo, prStatusesDone, meeting) => {
    let userIsMemberOfHr = isHr(this.props.userroles);

    let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);
    let meetingInfoText = (status, statuses) => {
      if (
        statuses.includes(prStatusEnum.FINALIZED_REVIEWER) &&
        !(status === 'ACCEPTED')
      ) {
        return this.props.intl.formatMessage({
          id: 'prstate.offportalarranged'
        });
      } else {
        switch (status) {
          case 'ACCEPTED':
            return this.props.intl.formatMessage({
              id: 'prstate.agreed'
            });
          case 'DECLINED':
            if (userIsMemberOfHr) {
              return this.props.intl.formatMessage({
                id: 'prstate.cancelled'
              });
            }
            return this.props.intl.formatMessage({
              id: 'prstate.newtermin'
            });
          case 'NO_ANSWER':
            return this.props.intl.formatMessage({
              id: 'prstate.terminsent'
            });
          case 'NOT_REQUESTED':
            if (userIsMemberOfHr) {
              return this.props.intl.formatMessage({
                id: 'prstate.notermin'
              });
            }
            return this.props.intl.formatMessage({
              id: 'prstate.arrangetermin'
            });
          default:
            return this.props.intl.formatMessage({
              id: 'prstate.noinfo'
            });
        }
      }
    };
    let step1 = {
      mainStepLabel: this.props.intl.formatMessage({
        id: 'prstate.preparation'
      }),
      substeps: {
        [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: {
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_EMPLOYEE],
          isCurrentUserActionPerformer: hasRoleInPr(['employee']),
          label: `${this.props.intl.formatMessage({
            id: 'prstate.employee'
          })} `,
          rendering: {
            complete: this.props.intl.formatMessage({
              id: 'prstate.finished'
            }),
            incompleteForNonActionPerformer: this.props.intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.RELEASED_SHEET_EMPLOYEE
            )
          }
        },
        [prStatusEnum.RELEASED_SHEET_REVIEWER]: {
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_REVIEWER],
          isCurrentUserActionPerformer: hasRoleInPr(['supervisor', 'reviewer']),
          label: `${this.props.intl.formatMessage({
            id: 'prstate.reviewer'
          })} `,
          rendering: {
            complete: this.props.intl.formatMessage({
              id: 'prstate.finished'
            }),
            incompleteForNonActionPerformer: this.props.intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.RELEASED_SHEET_REVIEWER
            )
          }
        },
        [prStatusEnum.REQUESTED_DATE]: {
          isCompleted: true,
          label: `${this.props.intl.formatMessage({
            id: 'prstate.findtermin'
          })} `,
          rendering: {
            complete: meetingInfoText(meeting.status, pr.statuses)
          }
        }
      }
    };
    let step2 = {
      mainStepLabel: this.props.intl.formatMessage({
        id: 'prstate.termin'
      }),
      substeps: {
        [prStatusEnum.FINALIZED_REVIEWER]: {
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_REVIEWER],
          isCurrentUserActionPerformer: hasRoleInPr(['supervisor', 'reviewer']),
          label: `${this.props.intl.formatMessage({
            id: 'prstate.reviewer'
          })} `,
          rendering: {
            complete: this.props.intl.formatMessage({
              id: 'prstate.finished'
            }),
            incompleteForNonActionPerformer: this.props.intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.FINALIZED_REVIEWER
            )
          }
        }
      }
    };
    let step3 = {
      mainStepLabel: this.props.intl.formatMessage({
        id: 'prstate.conclusion'
      }),
      substeps: {
        [prStatusEnum.FINALIZED_EMPLOYEE]: {
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_EMPLOYEE],
          isCurrentUserActionPerformer: hasRoleInPr(['employee']),
          label: `${this.props.intl.formatMessage({
            id: 'prstate.employee'
          })} `,
          rendering: {
            complete: this.props.intl.formatMessage({
              id: 'prstate.finished'
            }),
            incompleteForNonActionPerformer: this.props.intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.FINALIZED_EMPLOYEE
            )
          }
        }
      }
    };
    let step4 = {
      mainStepLabel: this.props.intl.formatMessage({
        id: 'prstate.postprocessing'
      }),
      substeps: {
        [prStatusEnum.ARCHIVED_HR]: {
          isCompleted: prStatusesDone[prStatusEnum.ARCHIVED_HR],
          isCurrentUserActionPerformer: isHr(this.props.userroles),
          label: `${this.props.intl.formatMessage({
            id: 'prstate.hr'
          })} `,
          rendering: {
            complete: this.props.intl.formatMessage({
              id: 'prstate.archived'
            }),
            incompleteForNonActionPerformer: this.props.intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: this.getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.ARCHIVED_HR
            )
          }
        }
      }
    };

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
    let label =
      status === prStatusEnum.RELEASED_SHEET_REVIEWER ||
      status === prStatusEnum.RELEASED_SHEET_EMPLOYEE
        ? this.props.intl.formatMessage({
            id: 'prstate.release'
          })
        : this.props.intl.formatMessage({
            id: 'prstate.finish'
          });
    return (
      <CheckRequiredClick
        onClick={() => {
          this.props.addPrStatus(pr, status);
        }}
        check={() => !this.requiredFieldsEmpty(status)}
        message={this.props.intl.formatMessage({
          id: 'prstate.fillrequired'
        })}
      >
        <PrStatusActionButton label={label} />
      </CheckRequiredClick>
    );
  };

  render() {
    const { classes, prById, userinfo, meeting } = this.props;

    if (!(prById && meeting)) {
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
      meeting
    );

    const activeStep = this.calculateActiveStep(prStatusesDone, stepStructure);

    let savingInfo =
      this.props.savingThreads > 0
        ? '...speichert...'
        : 'Alle Änderungen gespeichert.';

    return (
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <ListItemText>
              {this.props.intl.formatMessage({
                id: 'prstate.progress'
              })}
            </ListItemText>
            <Typography>{savingInfo}</Typography>
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
export default injectIntl(
  connect(
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
      requiredFields: getRequiredFields(state),
      meeting: getMeeting(state),
      savingThreads: getSavingThreads(state)
    }),
    {
      checkRequired: changeRequiredFields,
      addPrStatus: actions.addPrStatus
    }
  )(StyledComponent)
);
