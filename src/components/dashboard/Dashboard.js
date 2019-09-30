import React, { Fragment, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';

import { isEmployee, isSupervisor } from '../../helper/checkRole';
import { formatDateForFrontend } from '../../helper/date';
import InfoWidget from './InfoWidget';
import { ErrorContext, UserinfoContext } from '../App';
import { Grid } from '@material-ui/core';
import { getSystemInfo } from '../../calls/admin';

const styles = theme => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    flexGrow: 1,
    margin: 3 * theme.spacing.unit,
    marginBottom: 0,
    textDecoration: 'none'
  },
  title: {
    marginBottom: 2 * theme.spacing.unit
  },
  paragraph: {
    marginBottom: 2 * theme.spacing.unit
  }
});

const Dashboard = ({ classes, intl }) => {
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
  const errorContext = useContext(ErrorContext);
  const [systemInfo, setSystemInfo] = React.useState({});
  const numberOfPrsToReview = userinfo ? userinfo.numberOfPrsToReview : 0;
  const numberOfPrsToSupervise = userinfo ? userinfo.numberOfPrsToSupervise : 0;

  let prsNotFilledByEmployee = userinfo ? userinfo.prsNotFilledByEmployee : 0;

  React.useEffect(
    () => {
      if (userroles[0] === 'ADMIN') {
        getSystemInfo(setSystemInfo, errorContext);
      }
    },
    [userroles]
  );

  return userinfo ? (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainer}>
        {userinfo.idOfNewestOpenPr && isEmployee(userroles) ? (
          <Card
            className={classes.card}
            component={NavLink}
            to={'/prs/' + userinfo.idOfNewestOpenPr}
          >
            <CardContent>
              <Typography variant="h5">
                {formatDateForFrontend(userinfo.deadlineOfNewestPr)}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                {intl.formatMessage({
                  id: 'dashboard.opened'
                })}
              </Typography>
            </CardContent>
          </Card>
        ) : null}

        {numberOfPrsToReview > 1 && isEmployee(userroles) ? (
          <Card className={classes.card} component={NavLink} to={'/prs'}>
            <CardContent>
              <Typography variant="h5">{numberOfPrsToReview}</Typography>
              <Typography className={classes.title} color="textSecondary">
                {intl.formatMessage({
                  id: 'dashboard.evaluator'
                })}
              </Typography>
            </CardContent>
          </Card>
        ) : null}

        {numberOfPrsToReview > 0 ? (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.reviewer'
            })}
            value={numberOfPrsToReview}
            linkTo={'/prs'}
            icon={'library_books'}
          />
        ) : null}

        {(numberOfPrsToSupervise > 0 && isSupervisor(userroles)) ||
        numberOfPrsToReview > 0 ? (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.supervisor'
            })}
            value={numberOfPrsToSupervise}
            linkTo={'/prs'}
            icon={'library_books'}
          />
        ) : null}

        {isEmployee(userroles) && prsNotFilledByEmployee > 0 ? (
          <Card className={classes.card} component={NavLink} to={'/myPrs'}>
            <CardContent>
              <Typography variant="h5">{prsNotFilledByEmployee}</Typography>
              <Typography className={classes.title} color="textSecondary">
                {intl.formatMessage({
                  id: 'dashboard.unprocessed'
                })}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </div>

      {/* Notification about administration mode, if userrole is admin */}
      {userroles[0] === 'ADMIN' && Object.keys(systemInfo).length > 0 && (
        <Fragment>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} variant="h5">
                {intl.formatMessage({
                  id: 'dashboard.administrationTitle'
                })}
              </Typography>
              <Typography color="textSecondary">
                {intl.formatMessage({
                  id: 'dashboard.administrationText'
                })}
              </Typography>
            </CardContent>
          </Card>
          <Grid container>
            <Card className={classes.card} component={NavLink} to={'/system'}>
              <CardContent>
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="textSecondary"
                >
                  {intl.formatMessage({
                    id: 'admin.errors'
                  })}
                </Typography>
                <Typography variant="h5">{systemInfo.errorCount}</Typography>
              </CardContent>
            </Card>
            <Card
              className={classes.card}
              component={NavLink}
              to={'/dashboard'}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="textSecondary"
                >
                  {intl.formatMessage({
                    id: 'admin.feedback'
                  })}
                </Typography>
                <Typography variant="h5">{systemInfo.feedbackCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Fragment>
      )}

      {/* Welcome page section */}
      <div className={classes.rowContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" className={classes.title}>
              {intl.formatMessage({
                id: 'dashboard.welcome'
              })}
            </Typography>
            <Typography className={classes.paragraph} color="textSecondary">
              {`${intl.formatMessage({
                id: 'dashboard.description'
              })} `}
              <br />
              {`${intl.formatMessage({
                id: 'dashboard.subdescription'
              })} `}
            </Typography>
            <br />
            <Typography variant="h6" className={classes.title}>
              {intl.formatMessage({
                id: 'dashboard.contactSupport'
              })}
            </Typography>
            <Typography className={classes.paragraph} color="textSecondary">
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
