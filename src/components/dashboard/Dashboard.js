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
import ScsDialog from './ScsInProgressDialog/ScsDialog';
import ScsToDelegateDialog from './ScsToDelegate/ScsToDelegateDialog';
import { getLastPayrollReport } from '../../calls/payrollReports';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { downloadPayrollReport } from '../../helper/downloadExcel';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  ...theme.styledComponents,
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  noMarginBottom: {
    marginBottom: 0
  },
  allScsText: {
    marginLeft: 3 * theme.spacing.unit
  }
});

const Dashboard = ({ classes, intl }) => {
  const user = useUserinfoContext();
  const { userroles, userinfo } = user.context.value;
  const error = useErrorContext();
  const [systemInfo, setSystemInfo] = React.useState({});
  const [lastReport, setLastReport] = React.useState({});
  const [isLoading, setIsLoading] = React.useState({});
  const numberOfScsToReview = userinfo ? userinfo.numberOfScsToReview : 0;
  const formerUsersCount = userinfo
    ? userinfo.numberOfEmployeeInactiveThisMonth
    : 0;
  const scsToDelegate = userinfo ? userinfo.scsToDelegate : 0;

  useEffect(
    () => {
      if (user.hasRoleAdmin()) {
        getSystemInfo(setSystemInfo, error);
      }
      if (user.hasRoleHr()) {
        getLastPayrollReport(setLastReport, setIsLoading, error);
      }
    },
    [userroles]
  );

  const downloadExcelReport = report => {
    downloadPayrollReport(report, error);
  };

  return userinfo ? (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainer}>
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
      </div>

      {user.hasRoleHr() && (
        <Fragment>
          <div className={`${classes.rowContainer} ${classes.noMarginBottom}`}>
            <Typography variant="h6" className={classes.allScsText}>
              {intl.formatMessage({
                id: 'dashboard.allscs'
              })}
            </Typography>
          </div>
          <div className={classes.rowContainer}>
            <ScsDialog
              status={'INITIALIZATION'}
              numberOfScs={userinfo.numbersByStatuses.scsInitialization}
            />
            <ScsDialog
              status={'IN_PROGRESS'}
              numberOfScs={userinfo.numbersByStatuses.scsInProgress}
            />
            <ScsDialog
              status={'READY_TO_CLOSE'}
              numberOfScs={userinfo.numbersByStatuses.scsReady}
            />
            <ScsDialog
              status={'DONE'}
              numberOfScs={userinfo.numbersByStatuses.scsClosed}
            />
            <ScsDialog
              status={'ARCHIVED'}
              numberOfScs={userinfo.numbersByStatuses.scsArchived}
            />
          </div>
          <div className={classes.rowContainer}>
            <InfoWidget
              label={intl.formatMessage({
                id: 'dashboard.newemployees'
              })}
              // TODO value: number of employees with employee_status === 'NEW'
              value={userinfo.numberOfNewEmployees}
              // TODO linkTo: clarify
              // linkTo={}
              icon={'people'}
            />
            <InfoWidget
              label={intl.formatMessage({
                id: 'dashboard.newformeremployees'
              })}
              value={formerUsersCount}
              linkTo={ROUTES.FORMER_EMPLOYEES}
              icon={'emoji_people'}
            />
          </div>
          <div className={classes.rowContainer}>
            {isLoading ? <CircularProgress /> :
              <InfoWidget
                label={intl.formatMessage({
                  id: 'dashboard.lastpayrollreport'
                })}
                value={lastReport.id ? formatLocaleDateTime(lastReport.date, FRONTEND_DATE_FORMAT) : intl.formatMessage({ id: 'dashboard.noLastReport' })}
                onClick={lastReport.id ? () => downloadExcelReport(lastReport) : () => { }}
                icon={'table_chart'}
              />
            }
          </div>
        </Fragment>
      )}

      <div className={classes.rowContainer}>
        {user.hasRoleSupervisor() && scsToDelegate > 0 && (
          <ScsToDelegateDialog />
        )}
      </div>
      <div className={classes.rowContainer}>
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
      </div>
    </div>
  ) : null;
};

export default injectIntl(withStyles(styles)(Dashboard));
