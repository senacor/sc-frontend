import React, { Fragment, useContext, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { isEmployee, isSupervisor } from '../../helper/checkRole';
import { formatDateForFrontend } from '../../helper/date';
import InfoWidget from './InfoWidget';
import { ErrorContext, UserinfoContext } from '../App';
import { getSystemInfo } from '../../calls/admin';
import PrsInProgressDialog from './PrsInProgressDialog/PrsInProgressDialog';
import PrsTodoHrDialog from './PrsTodoHrDialog/PrsTodoHrDialog';
import ROUTES from '../../helper/routes';

// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getCountOfFormerEmployees } from '../../calls/employees';

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
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
  const errorContext = useContext(ErrorContext);
  const [systemInfo, setSystemInfo] = React.useState({});
  const numberOfPrsToReview = userinfo ? userinfo.numberOfPrsToReview : 0;
  const numberOfPrsToSupervise = userinfo ? userinfo.numberOfPrsToSupervise : 0;
  const [formerUsersCount, setFormerUsersCount] = React.useState('');

  let prsNotFilledByEmployee = userinfo ? userinfo.prsNotFilledByEmployee : 0;

  useEffect(
    () => {
      if (userroles[0] === 'ADMIN') {
        getSystemInfo(setSystemInfo, errorContext);
      }
    },
    [userroles]
  );

  if (userroles[0] === 'PERSONAL_DEV') {
    getCountOfFormerEmployees(setFormerUsersCount, errorContext);
  }
  console.log('for', formerUsersCount)

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

        {userroles[0] === 'PERSONAL_DEV' && (
          <div className={classes.rowContainer}>
            <PrsInProgressDialog prsInProgress={userinfo.prsInProgressForHr} />
            <PrsTodoHrDialog todoForHr={userinfo.prsInTodoForHr} />
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} variant="body1">
                  {intl.formatMessage({
                    id: 'dashboard.newformeremployees'
                  })}
                </Typography>
                <Typography color="textSecondary">
                  {formerUsersCount}
                </Typography>
              </CardContent>
            </Card>
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
            <br />
            <Typography variant="h5" className={classes.cardTitle}>
              {intl.formatMessage({
                id: 'dashboard.contactSupport'
              })}
            </Typography>
            <Typography
              className={classes.cardParagraph}
              variant="body1"
              color="textSecondary"
            >
              {`${intl.formatMessage({
                id: 'dashboard.contactText'
              })} `}
              <a href="tomas.hugec@senacor.com">
                Tomas Hugec (tomas.hugec@senacor.com)
              </a>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : null;
};

export default injectIntl(withStyles(styles)(Dashboard));
