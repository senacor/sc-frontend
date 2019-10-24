import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { injectIntl } from 'react-intl';

import { MeetingContext, UserinfoContext } from '../App';
import { prStatusEnum } from '../../helper/prStatus';
import PrStatusStepper from './PrStateStepper';
import {
  isPersonalDev,
  hasRoleInPrBasedOnUserName
} from '../../helper/checkRole';
import ButtonsBelowSheet from './ButtonsBelowSheet';
import { useErrorContext } from '../../helper/contextHooks';

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.secondary.white,
    margin: 3 * theme.spacing.unit
  },
  spacing: {
    padding: 3 * theme.spacing.unit
  },
  title: {
    fontSize: 20
  }
});

const PrState = ({ classes, prById, intl }) => {
  const error = useErrorContext();
  const { value: meeting } = useContext(MeetingContext.context);
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
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
    let userIsMemberOfHr = isPersonalDev(userroles);

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
            incompleteForActionPerformer: submitPRButton(
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
            incompleteForActionPerformer: submitPRButton(
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
            incompleteForActionPerformer: submitPRButton(
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
            incompleteForActionPerformer: submitPRButton(pr)
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
          isCurrentUserActionPerformer: isPersonalDev(userroles),
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
            incompleteForActionPerformer: submitPRButton(pr)
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

  const submitPRButton = pr => {
    return <ButtonsBelowSheet pr={pr} error={error} />;
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

  return (
    <Paper className={classes.paper}>
      <div className={classes.spacing}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="body1" className={classes.title}>
              {intl.formatMessage({
                id: 'prstate.progress'
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrStatusStepper
              stepStructure={stepStructure}
              activeStep={activeStep}
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(PrState));
