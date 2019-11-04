import React, { Fragment, useContext, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { formatDateForFrontend } from '../../helper/date';
import InfoWidget from '../utils/InfoWidget';
import { AuthorizationContext } from '../App';
import { getSystemInfo } from '../../calls/admin';
import PrsInProgressDialog from './PrsInProgressDialog/PrsInProgressDialog';
import PrsTodoHrDialog from './PrsTodoHrDialog/PrsTodoHrDialog';
import PrsDeclinedDialog from './PrsDeclined/PrsDeclinedDialog';
import ROUTES from '../../helper/routes';
import { getUserInfo } from '../../calls/userinfo';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';
// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ScsInProgressDialog from './ScsInProgressDialog/ScsInProgressDialog';
import ScsTodoHrDialog from './ScsTodoHrDialog/ScsTodoHrDialog';

const styles = theme => ({
  ...theme.styledComponents,
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  noMarginBottom: {
    marginBottom: 0
  }
});

const Dashboard = ({ classes, intl }) => {
  const user = useUserinfoContext();
  const { userroles, userinfo } = user.context.value;
  const authContext = useContext(AuthorizationContext.context);
  const error = useErrorContext();
  const [systemInfo, setSystemInfo] = React.useState({});
  const numberOfPrsToReview = userinfo ? userinfo.numberOfPrsToReview : 0;
  const numberOfScsToReview = userinfo ? userinfo.numberOfScsToReview : 0;
  const numberOfPrsToSupervise = userinfo ? userinfo.numberOfPrsToSupervise : 0;
  const { idOfNewestOpenPr } = userinfo;
  const formerUsersCount = userinfo
    ? userinfo.numberOfEmployeeInactiveThisMonth
    : 0;
  let prsNotFilledByEmployee = userinfo ? userinfo.prsNotFilledByEmployee : 0;

  useEffect(
    () => {
      if (user.hasRoleAdmin()) {
        getSystemInfo(setSystemInfo, error);
      }
    },
    [userroles]
  );

  const refreshDashboard = () => {
    getUserInfo(user.context, error, authContext);
  };

  return userinfo ? (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainer}>
        {idOfNewestOpenPr && user.hasRoleEmployee() && (
          <InfoWidget
            value={formatDateForFrontend(userinfo.deadlineOfNewestPr)}
            linkTo={`${ROUTES.PR_TO_REVIEW_TABLE}/${idOfNewestOpenPr}`}
            label={intl.formatMessage({
              id: 'dashboard.opened'
            })}
            icon={'perm_identity'}
          />
        )}

        {numberOfPrsToReview > 1 && user.hasRoleEmployee() && (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.evaluator'
            })}
            value={numberOfPrsToReview}
            linkTo={ROUTES.PR_TO_REVIEW_TABLE}
            icon={'supervisor_account'}
          />
        )}

        {numberOfPrsToReview > 0 && (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.reviewer'
            })}
            value={numberOfPrsToReview}
            linkTo={ROUTES.PR_TO_REVIEW_TABLE}
            icon={'library_books'}
          />
        )}

        {(numberOfPrsToSupervise > 0 && user.hasRoleSupervisor()) ||
        numberOfPrsToReview > 0 ? (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.supervisor'
            })}
            value={numberOfPrsToSupervise}
            linkTo={ROUTES.PR_TO_REVIEW_TABLE}
            icon={'library_books'}
          />
        ) : null}

        {numberOfScsToReview > 0 && (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.sc.evaluator'
            })}
            value={numberOfScsToReview}
            linkTo={ROUTES.SC_TO_REVIEW_TABLE}
            icon={'bar_chart'}
          />
        )}

        {user.hasRoleEmployee() && prsNotFilledByEmployee > 0 && (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.unprocessed'
            })}
            value={prsNotFilledByEmployee}
            linkTo={ROUTES.OWN_PR_TABLE}
            icon={'collections_bookmark'}
          />
        )}

        {user.hasRoleSupervisor() && (
          <PrsDeclinedDialog
            isHr={false}
            declinedPrs={userinfo.prsDeclinedByHr}
            refreshDashboard={refreshDashboard}
          />
        )}

        {user.hasRoleHr() && (
          <div className={classes.rowContainer}>
            <ScsInProgressDialog scsInProgress={userinfo.scsInProgressForHr} />
            <PrsInProgressDialog prsInProgress={userinfo.prsInProgressForHr} />
            <PrsTodoHrDialog todoForHr={userinfo.prsInTodoForHr} />
            <ScsTodoHrDialog todoForHr={userinfo.scsInTodoForHr} />
            <InfoWidget
              label={intl.formatMessage({
                id: 'dashboard.newformeremployees'
              })}
              value={formerUsersCount}
              linkTo={ROUTES.FORMER_EMPLOYEES}
              icon={'emoji_people'}
            />
            <PrsDeclinedDialog
              isHr={true}
              refreshDashboard={refreshDashboard}
              declinedPrs={userinfo.prsDeclinedBySupervisor}
            />
          </div>
        )}

        {/* Notification about administration mode, if userrole is admin */}
        {user.hasRoleAdmin() && Object.keys(systemInfo).length > 0 && (
          <Fragment>
            <InfoWidget
              label={intl.formatMessage({
                id: 'admin.errors'
              })}
              value={systemInfo.errorCount}
              linkTo={ROUTES.ADMIN_SYSTEM_PANEL}
              icon={'error_outline'}
            />
            <InfoWidget
              label={intl.formatMessage({
                id: 'admin.feedback'
              })}
              value={systemInfo.feedbackCount}
              linkTo={ROUTES.MAINTENANCE}
              icon={'feedback'}
            />
            <Card className={`${classes.card} ${classes.noMarginBottom}`}>
              <CardContent>
                <Typography className={classes.cardTitle} variant="h5">
                  {intl.formatMessage({
                    id: 'dashboard.administrationTitle'
                  })}
                </Typography>
                <Typography
                  className={classes.cardParagraph}
                  variant="body1"
                  color="textSecondary"
                >
                  {intl.formatMessage({
                    id: 'dashboard.administrationText'
                  })}
                </Typography>
              </CardContent>
            </Card>
          </Fragment>
        )}
        {/* Welcome page section */}
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" className={classes.cardTitle}>
              {intl.formatMessage({
                id: 'dashboard.welcome'
              })}
            </Typography>
            <Typography
              className={classes.cardParagraph}
              variant="body1"
              color="textSecondary"
            >
              {`${intl.formatMessage({
                id: 'dashboard.description'
              })} `}
              <br />
              {`${intl.formatMessage({
                id: 'dashboard.subdescription'
              })} `}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : null;
};

export default injectIntl(withStyles(styles)(Dashboard));
