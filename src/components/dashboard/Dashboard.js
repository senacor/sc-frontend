import React, { Fragment, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import InfoWidget from '../utils/InfoWidget';
import { getSystemInfo } from '../../calls/admin';
import ROUTES from '../../helper/routes';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';
// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ScsInProgressDialog from './ScsInProgressDialog/ScsInProgressDialog';
import ScsToDelegateDialog from './ScsToDelegate/ScsToDelegateDialog';

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
  const error = useErrorContext();
  const [systemInfo, setSystemInfo] = React.useState({});
  const numberOfScsToReview = userinfo ? userinfo.numberOfScsToReview : 0;
  const formerUsersCount = userinfo
    ? userinfo.numberOfEmployeeInactiveThisMonth
    : 0;

  useEffect(
    () => {
      if (user.hasRoleAdmin()) {
        getSystemInfo(setSystemInfo, error);
      }
    },
    [userroles]
  );

  return userinfo ? (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainer}>
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

        {user.hasRoleHr() && (
          <Fragment>
            <ScsInProgressDialog scsInProgress={userinfo.scsInProgressForHr} />
            <InfoWidget
              label={intl.formatMessage({
                id: 'dashboard.newformeremployees'
              })}
              value={formerUsersCount}
              linkTo={ROUTES.FORMER_EMPLOYEES}
              icon={'emoji_people'}
            />
          </Fragment>
        )}

        {user.hasRoleSupervisor() && <ScsToDelegateDialog />}

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
