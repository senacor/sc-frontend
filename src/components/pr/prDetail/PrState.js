import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles/index';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrStatusStepper from './PrStateStepper';
import { isHr } from '../../../helper/checkRole';
import { hasRoleInPrBasedOnUserName } from '../../../helper/hasRoleInPr';
import { CheckRequiredClick } from '../../hoc/CheckRequiredClick';
import Typography from '@material-ui/core/Typography';
import { injectIntl } from 'react-intl';
import {
  ErrorContext,
  MeetingContext,
  PrContext,
  UserinfoContext
} from '../../App';
import { addPrStatus } from '../../../actions/calls/pr';

const styles = theme => ({
  paper: {
    backgroundColor: 'inherit',
    margin: 3 * theme.spacing.unit
  }
});

const PrState = ({
  classes,
  prById,
  employeeContributionRole,
  employeeContributionLeader,
  overallComment,
  intl
}) => {
  const { setValue: setPr } = useContext(PrContext.context);
  const errorContext = useContext(ErrorContext.context);
  const { value: meeting } = useContext(MeetingContext.context);
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
  overallComment = 'COMMENT TURNED OFF...';
  const mainStepIsDone = (prStatusesDone, stepId, stepStructure) => {
    if (prStatusesDone !== undefined) {
      return Object.values(stepStructure[stepId].substeps).every(
        substep => substep.isCompleted
      );
    }
    return false;
  };

  const calculateActiveStep = (prStatusesDone, stepStructure) => {
    return [...Array(stepStructure.length).keys()].filter(stepId =>
      mainStepIsDone(prStatusesDone, stepId, stepStructure)
    ).length;
  };

  const getCompletedSubsteps = prStatuses => {
    let isDoneStatusMap = {};
    for (let status in prStatusEnum) {
      isDoneStatusMap[prStatusEnum[status]] = isDone(
        prStatuses,
        prStatusEnum[status]
      );
    }
    return isDoneStatusMap;
  };

  const isDone = (prStatuses, status) => {
    if (prStatuses === undefined) {
      return false;
    } else {
      return prStatuses.includes(status);
    }
  };

  const updateStepStructure = (pr, userinfo, prStatusesDone, meeting) => {
    let userIsMemberOfHr = isHr(userroles);

    let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);
    let meetingInfoText = (status, statuses) => {
      if (
        statuses.includes(prStatusEnum.FINALIZED_REVIEWER) &&
        !(status === 'ACCEPTED')
      ) {
        return intl.formatMessage({
          id: 'prstate.offportalarranged'
        });
      } else {
        switch (status) {
          case 'ACCEPTED':
            return intl.formatMessage({
              id: 'prstate.agreed'
            });
          case 'DECLINED':
            if (userIsMemberOfHr) {
              return intl.formatMessage({
                id: 'prstate.cancelled'
              });
            }
            return intl.formatMessage({
              id: 'prstate.newtermin'
            });
          case 'NO_ANSWER':
            return intl.formatMessage({
              id: 'prstate.terminsent'
            });
          case 'NOT_REQUESTED':
            if (userIsMemberOfHr) {
              return intl.formatMessage({
                id: 'prstate.notermin'
              });
            }
            return intl.formatMessage({
              id: 'prstate.arrangetermin'
            });
          default:
            return intl.formatMessage({
              id: 'prstate.noinfo'
            });
        }
      }
    };
    let step1 = {
      mainStepLabel: intl.formatMessage({
        id: 'prstate.preparation'
      }),
      substeps: {
        [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: {
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_EMPLOYEE],
          isCurrentUserActionPerformer: hasRoleInPr(['employee']),
          label: `${intl.formatMessage({
            id: 'prstate.employee'
          })} `,
          rendering: {
            complete: intl.formatMessage({
              id: 'prstate.finished'
            }),
            incompleteForNonActionPerformer: intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.RELEASED_SHEET_EMPLOYEE
            )
          }
        },
        [prStatusEnum.RELEASED_SHEET_REVIEWER]: {
          isCompleted: prStatusesDone[prStatusEnum.RELEASED_SHEET_REVIEWER],
          isCurrentUserActionPerformer: hasRoleInPr(['supervisor', 'reviewer']),
          label: `${intl.formatMessage({
            id: 'prstate.reviewer'
          })} `,
          rendering: {
            complete: intl.formatMessage({
              id: 'prstate.finished'
            }),
            incompleteForNonActionPerformer: intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.RELEASED_SHEET_REVIEWER
            )
          }
        },
        [prStatusEnum.REQUESTED_DATE]: {
          isCompleted: true,
          label: `${intl.formatMessage({
            id: 'prstate.findtermin'
          })} `,
          rendering: {
            complete: meetingInfoText(meeting.status, pr.statusSet)
          }
        }
      }
    };
    let step2 = {
      mainStepLabel: intl.formatMessage({
        id: 'prstate.termin'
      }),
      substeps: {
        [prStatusEnum.FINALIZED_REVIEWER]: {
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_REVIEWER],
          isCurrentUserActionPerformer: hasRoleInPr(['supervisor', 'reviewer']),
          label: `${intl.formatMessage({
            id: 'prstate.reviewer'
          })} `,
          rendering: {
            complete: intl.formatMessage({
              id: 'prstate.finished'
            }),
            incompleteForNonActionPerformer: intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.FINALIZED_REVIEWER
            )
          }
        }
      }
    };
    let step3 = {
      mainStepLabel: intl.formatMessage({
        id: 'prstate.conclusion'
      }),
      substeps: {
        [prStatusEnum.FINALIZED_EMPLOYEE]: {
          isCompleted: prStatusesDone[prStatusEnum.FINALIZED_EMPLOYEE],
          isCurrentUserActionPerformer: hasRoleInPr(['employee']),
          label: `${intl.formatMessage({
            id: 'prstate.employee'
          })} `,
          rendering: {
            complete: intl.formatMessage({
              id: 'prstate.finished'
            }),
            incompleteForNonActionPerformer: intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: getIncompleteActionPerformerButton(
              pr,
              prStatusEnum.FINALIZED_EMPLOYEE
            )
          }
        }
      }
    };
    let step4 = {
      mainStepLabel: intl.formatMessage({
        id: 'prstate.postprocessing'
      }),
      substeps: {
        [prStatusEnum.ARCHIVED_HR]: {
          isCompleted: prStatusesDone[prStatusEnum.ARCHIVED_HR],
          isCurrentUserActionPerformer: isHr(userroles),
          label: `${intl.formatMessage({
            id: 'prstate.hr'
          })} `,
          rendering: {
            complete: intl.formatMessage({
              id: 'prstate.archived'
            }),
            incompleteForNonActionPerformer: intl.formatMessage({
              id: 'prstate.notfinished'
            }),
            incompleteForActionPerformer: getIncompleteActionPerformerButton(
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

  const checkRequiredFields = (
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

  const requiredFieldsEmpty = status => {
    let fieldFilled = checkRequiredFields(
      employeeContributionRole,
      employeeContributionLeader,
      overallComment,
      status
    );

    if (
      prStatusEnum.RELEASED_SHEET_EMPLOYEE === status &&
      false === fieldFilled.employee
    ) {
      return true;
    } else if (
      prStatusEnum.RELEASED_SHEET_REVIEWER === status &&
      false === fieldFilled.reviewer
    ) {
      return true;
    } else if (
      prStatusEnum.FINALIZED_REVIEWER === status &&
      false === fieldFilled.reviewer
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getIncompleteActionPerformerButton = (pr, status) => {
    let label =
      status === prStatusEnum.RELEASED_SHEET_REVIEWER ||
      status === prStatusEnum.RELEASED_SHEET_EMPLOYEE
        ? intl.formatMessage({
            id: 'prstate.release'
          })
        : intl.formatMessage({
            id: 'prstate.finish'
          });
    return (
      <CheckRequiredClick
        onClick={() => {
          addPrStatus(pr, status, setPr, errorContext);
        }}
        check={() => !requiredFieldsEmpty(status)}
        message={intl.formatMessage({
          id: 'prstate.fillrequired'
        })}
      >
        <PrStatusActionButton label={label} />
      </CheckRequiredClick>
    );
  };

  if (!(prById && meeting)) {
    return null;
  }
  const prStatusesDone = getCompletedSubsteps(prById.statusSet);

  if (!prStatusesDone) {
    return null;
  }

  const stepStructure = updateStepStructure(
    prById,
    userinfo,
    prStatusesDone,
    meeting
  );

  const activeStep = calculateActiveStep(prStatusesDone, stepStructure);

  //TODO: here change savingInfo based on saving/saved status sending draft
  // let savingInfo =
  //   savingThreads > 0
  //     ? intl.formatMessage({
  //         id: 'prstate.saving'
  //       })
  //     : intl.formatMessage({
  //         id: 'prstate.saved'
  //       });
  let savingInfo = intl.formatMessage({
    id: 'prstate.saving'
  });

  return (
    <Paper className={classes.paper}>
      <List>
        <ListItem>
          <ListItemText>
            {intl.formatMessage({
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
};

export default injectIntl(withStyles(styles)(PrState));
