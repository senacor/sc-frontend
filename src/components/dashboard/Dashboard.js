import React, { Fragment, useContext, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { isEmployee, isSupervisor } from '../../helper/checkRole';
import { formatDateForFrontend } from '../../helper/date';
import InfoWidget from '../utils/InfoWidget';
import { AuthorizationContext, ErrorContext, UserinfoContext } from '../App';
import { getSystemInfo } from '../../calls/admin';
import PrsInProgressDialog from './PrsInProgressDialog/PrsInProgressDialog';
import PrsTodoHrDialog from './PrsTodoHrDialog/PrsTodoHrDialog';
import PrsDeclinedDialog from './PrsDeclined/PrsDeclinedDialog';
import ROUTES from '../../helper/routes';
// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getUserInfo } from '../../calls/userinfo';

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
  const userinfoContext = useContext(UserinfoContext.context);
  const { userroles, userinfo } = userinfoContext.value;
  const authContext = useContext(AuthorizationContext.context);
  const errorContext = useContext(ErrorContext.context);
  const [systemInfo, setSystemInfo] = React.useState({});
  const numberOfPrsToReview = userinfo ? userinfo.numberOfPrsToReview : 0;
  const numberOfPrsToSupervise = userinfo ? userinfo.numberOfPrsToSupervise : 0;
  const formerUsersCount = userinfo
    ? userinfo.numberOfEmployeeInactiveThisMonth
    : 0;

  let prsNotFilledByEmployee = userinfo ? userinfo.prsNotFilledByEmployee : 0;

  useEffect(
    () => {
      if (userroles[0] === 'ADMIN') {
        getSystemInfo(setSystemInfo, errorContext);
      }
    },
    [userroles]
  );

  const refreshDashboard = () => {
    getUserInfo(userinfoContext, errorContext, authContext);
  };

  return userinfo ? (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainer}>
        {userinfo.idOfNewestOpenPr && isEmployee(userroles) && (
          <InfoWidget
            value={formatDateForFrontend(userinfo.deadlineOfNewestPr)}
            linkTo={`${ROUTES.PR_TO_REVIEW_TABLE}/${userinfo.idOfNewestOpenPr}`}
            label={intl.formatMessage({
              id: 'dashboard.opened'
            })}
            icon={'perm_identity'}
          />
        )}

        {numberOfPrsToReview > 1 && isEmployee(userroles) && (
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

        {(numberOfPrsToSupervise > 0 && isSupervisor(userroles)) ||
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

        {isEmployee(userroles) && prsNotFilledByEmployee > 0 && (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.unprocessed'
            })}
            value={prsNotFilledByEmployee}
            linkTo={ROUTES.OWN_PR_TABLE}
            icon={'collections_bookmark'}
          />
        )}

        {isSupervisor(userroles) && (
          <PrsDeclinedDialog
            isHr={false}
            declinedPrs={userinfo.prsDeclinedByHr}
            refreshDashboard={refreshDashboard}
          />
        )}

        {userroles[0] === 'PERSONAL_DEV' && (
          <div className={classes.rowContainer}>
            <PrsInProgressDialog prsInProgress={userinfo.prsInProgressForHr} />
            <PrsTodoHrDialog todoForHr={userinfo.prsInTodoForHr} />
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
        {userroles[0] === 'ADMIN' && Object.keys(systemInfo).length > 0 && (
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
