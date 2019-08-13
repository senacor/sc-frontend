import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { NavLink } from 'react-router-dom';
import { isEmployee, isSupervisor } from '../../helper/checkRole';
import DefaultFilterService from '../../service/DefaultFilterService';
import { formatDateForFrontend } from '../../helper/date';
import InfoWidget from './InfoWidget';
import { injectIntl } from 'react-intl';
import { UserinfoContext } from '../App';

const styles = {
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
    margin: 20,
    marginBottom: 0,
    textDecoration: 'none'
  },
  thinItem: {
    paddingTop: 10,
    paddingBottom: 10
  }
};

const Dashboard = ({ resetFilterGroup, addFilter, classes, intl }) => {
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;

  const handleClick = payload => () => {
    resetFilterGroup(payload.filterGroup);
    addFilter(payload);
  };

  const defaultFilterService = new DefaultFilterService(userinfo.userId);

  const numberOfPrsToReview = userinfo ? userinfo.numberOfPrsToReview : 0;
  const numberOfPrsToSupervise = userinfo ? userinfo.numberOfPrsToSupervise : 0;

  let prsNotFilledByEmployee = userinfo ? userinfo.prsNotFilledByEmployee : 0;

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
              <Typography variant="h5" component="h2">
                {formatDateForFrontend(userinfo.deadlineOfNewestOpenPr)}
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
          <Card
            className={classes.card}
            component={NavLink}
            to={'/prs'}
            style={{ textDecoration: 'none' }}
            onClick={handleClick(defaultFilterService.prsAsReviewerFilter())}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {numberOfPrsToReview}
              </Typography>
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
            onClick={handleClick(defaultFilterService.prsToReviewFilter())}
            icon={'library_books'}
          />
        ) : null}

        {numberOfPrsToSupervise > 0 && isSupervisor(userroles) ? (
          <InfoWidget
            label={intl.formatMessage({
              id: 'dashboard.supervisor'
            })}
            value={numberOfPrsToSupervise}
            linkTo={'/prs'}
            onClick={handleClick(
              defaultFilterService.prsAsSupervisorAndInProgressFilter()
            )}
            icon={'library_books'}
          />
        ) : null}

        {isEmployee(userroles) && prsNotFilledByEmployee > 0 ? (
          <Card
            className={classes.card}
            component={NavLink}
            to={'/myPrs'}
            style={{ textDecoration: 'none' }}
            onClick={handleClick(defaultFilterService.ownIncompletePrsFilter())}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {prsNotFilledByEmployee}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                {intl.formatMessage({
                  id: 'dashboard.unprocessed'
                })}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <div className={classes.rowContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {intl.formatMessage({
                id: 'dashboard.beta'
              })}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
              {intl.formatMessage({
                id: 'dashboard.welcome'
              })}
              <br />
              <br />
              {`${intl.formatMessage({
                id: 'dashboard.testphase'
              })} `}
              <a href="mailto:Tuan-Si.Tran@senacor.com">
                Si Tran (Tuan-Si.Tran@senacor.com)
              </a>
              {` ${intl.formatMessage({
                id: 'dashboard.concern'
              })}`}
              <br />
              <br />
              {intl.formatMessage({
                id: 'dashboard.update'
              })}
              <br />
              <br />
              {intl.formatMessage({
                id: 'dashboard.testing'
              })}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : null;
};

export const StyledComponent = withStyles(styles)(Dashboard);
export default injectIntl(
  connect(
    state => ({}),
    { addFilter: actions.addFilter, resetFilterGroup: actions.resetFilterGroup }
  )(StyledComponent)
);
