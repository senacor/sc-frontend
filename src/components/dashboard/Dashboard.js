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
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { downloadPayrollReport } from '../../helper/downloadExcel';
import { CircularProgress } from '@material-ui/core';
import PlannedLeavingsDialog from './PlannedLeavings/PlannedLeavingsDialog';
import NewEmployeesDialog from './newEmployees/NewEmployeesDialog';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withRouter } from 'react-router-dom';
import { getPDInfo } from '../../calls/userinfo';

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
  noPaddingBottom: {
    '&:last-child': { paddingBottom: 0 }
  },
  cardTitle: {
    marginLeft: 3 * theme.spacing.unit
  },
  nocard: {
    flexGrow: 1,
    margin: 24,
    textDecoration: 'none',
    width: '100%'
  },
  pdCard: {
    margin: 24,
    textDecoration: 'none',
    width: 'auto',
    flexGrow: 1
  },
  dateCell: {
    marginTop: 2.5 * theme.spacing.unit,
    padding: 2 * theme.spacing.unit,
    paddingRight: 5 * theme.spacing.unit
  },
  secondDateCell: {
    marginTop: 2.5 * theme.spacing.unit,
    padding: 2 * theme.spacing.unit
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const Dashboard = ({ classes, intl, history }) => {
  const user = useUserinfoContext();
  const { userroles, userinfo } = user.context.value;
  const error = useErrorContext();
  const [systemInfo, setSystemInfo] = React.useState({});
  const [pdInfo, setPdInfo] = React.useState({
    lastReport: {},
    timeRangeFrom: '',
    timeRangeTo: '',
    lastFISsync: ''
  });
  const [isLoading, setIsLoading] = React.useState({});
  const numberOfScsToReview = userinfo ? userinfo.numberOfScsToReview : 0;
  const numberOfOpenedScs =
    userinfo && userinfo.openedScs ? userinfo.openedScs.length : 0;
  const plannedLeavings = userinfo ? userinfo.numberOfPlannedLeavings : 0;
  const scsToDelegate = userinfo ? userinfo.scsToDelegate : 0;
  const employeesWithoutSupervisorCount = userinfo
    ? userinfo.employeesWithoutSupervisorCount
    : 0;
  const fisPatchNeeded = userinfo ? userinfo.fisPatchNeeded : false;

  const lastReport = pdInfo.lastReport;
  const timeRangeFrom = pdInfo.timeRangeFrom;
  const timeRangeTo = pdInfo.timeRangeTo;
  const lastFISsync = pdInfo.lastFISsync;

  useEffect(
    () => {
      if (user.hasRoleAdmin()) {
        getSystemInfo(setSystemInfo, error);
      }
      if (user.hasRoleHr()) {
        getPDInfo(setPdInfo, setIsLoading, error);
      }
    },
    [userroles]
  );

  const downloadExcelReport = report => {
    downloadPayrollReport(report, error);
  };

  const handleOnFisNoteClicked = event => {
    event.stopPropagation();
    event.preventDefault();
    history.push(ROUTES.DATABASE_PATCHES);
  };

  const renderPDdashboard = () => {
    const intoCard = (title, content) => {
      return (
        <Card className={classes.pdCard}>
          <CardContent>
            <Typography variant="h6" className={classes.cardTitle}>
              {intl.formatMessage({
                id: title
              })}
            </Typography>
            <div
              className={`${classes.rowContainer} ${classes.noMarginBottom}`}
            >
              {content}
            </div>
          </CardContent>
        </Card>
      );
    };

    return (
      <Fragment>
        <div className={classes.flexRow}>
          {intoCard(
            'dashboard.timerange',
            <Fragment>
              <div className={classes.dateCell}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="date-von">
                    {intl.formatMessage({
                      id: 'dashboard.from'
                    })}
                  </InputLabel>
                  <OutlinedInput
                    id="date-von"
                    type={'text'}
                    value={timeRangeFrom}
                    readOnly
                    endAdornment={
                      <InputAdornment position="end">
                        <DateRangeIcon />
                      </InputAdornment>
                    }
                    labelWidth={30}
                  />
                </FormControl>
              </div>
              <div className={classes.secondDateCell}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="date-von">
                    {intl.formatMessage({
                      id: 'dashboard.to'
                    })}
                  </InputLabel>
                  <OutlinedInput
                    id="date-von"
                    type={'text'}
                    value={timeRangeTo}
                    readOnly
                    endAdornment={
                      <InputAdornment position="end">
                        <DateRangeIcon />
                      </InputAdornment>
                    }
                    labelWidth={30}
                  />
                </FormControl>
              </div>
            </Fragment>
          )}
          {intoCard(
            'dashboard.last.fissync',
            <InfoWidget
              value={lastFISsync}
              note={
                fisPatchNeeded
                  ? intl.formatMessage({
                      id: 'newemployeesdialog.pleasePatchData'
                    })
                  : ''
              }
              onNoteClicked={fisPatchNeeded ? handleOnFisNoteClicked : () => {}}
              linkTo={ROUTES.DATABASE_PATCHES}
              icon={'sync'}
            />
          )}
        </div>

        <div className={classes.flexRow}>
          {intoCard(
            'dashboard.allscs',
            <Fragment>
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
            </Fragment>
          )}
        </div>
        <div className={classes.flexRow}>
          {intoCard(
            'dashboard.employee.overview',
            <Fragment>
              <NewEmployeesDialog
                employeesWithoutSupervisorCount={
                  employeesWithoutSupervisorCount
                }
              />
              <PlannedLeavingsDialog
                numberOfPlannedLeavings={plannedLeavings}
              />
            </Fragment>
          )}
          {intoCard(
            'dashboard.lastpayrollreport',
            isLoading ? (
              <CircularProgress />
            ) : (
              <InfoWidget
                value={
                  lastReport.id
                    ? formatLocaleDateTime(
                        lastReport.date,
                        FRONTEND_DATE_FORMAT
                      )
                    : intl.formatMessage({ id: 'dashboard.noLastReport' })
                }
                onClick={
                  lastReport.id
                    ? () => downloadExcelReport(lastReport)
                    : () => {}
                }
                icon={'table_chart'}
              />
            )
          )}
        </div>
      </Fragment>
    );
  };

  return userinfo ? (
    <div className={classes.columnContainer}>
      <div className={`${classes.rowContainer} ${classes.noMarginBottom}`}>
        {/* Welcome page section */}
        <div className={classes.nocard}>
          <CardContent className={classes.noPaddingBottom}>
            <Typography variant="h5">
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
        </div>

        {user.hasNoRole() && (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" className={classes.cardTitle}>
                {intl.formatMessage({
                  id: 'dashboard.norole'
                })}
              </Typography>
              <Typography
                className={classes.cardParagraph}
                variant="body1"
                color="textSecondary"
              >
                {`${intl.formatMessage({
                  id: 'dashboard.noroledescription'
                })} `}
              </Typography>
            </CardContent>
          </Card>
        )}

        {numberOfOpenedScs > 0 && (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.sc.opened'
            })}
            value={numberOfOpenedScs}
            linkTo={`/scDetail/${userinfo.openedScs[0].id}`}
            icon={'bar_chart'}
          />
        )}
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

      {user.hasRoleHr() && renderPDdashboard()}

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

export default withRouter(injectIntl(withStyles(styles)(Dashboard)));
