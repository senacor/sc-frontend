import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import { getUserinfo, getUserroles } from '../../reducers/selector';
import * as actions from '../../actions';
import { NavLink } from 'react-router-dom';
import { isEmployee, isSupervisor } from '../../helper/checkRole';
import DefaultFilterService from '../../service/DefaultFilterService';
import { formatDateForFrontend } from '../../helper/date';
import InfoWidget from './InfoWidget';
import { injectIntl } from 'react-intl';

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
    flexGrow: '1',
    margin: '20px'
  },
  thinItem: {
    paddingTop: 10,
    paddingBottom: 10
  }
};

const Dashboard = props => {
  const handleClick = payload => () => {
    props.resetFilterGroup(payload.filterGroup);
    props.addFilter(payload);
  };

  const defaultFilterService = new DefaultFilterService(props.userinfo.userId);

  const numberOfPrsToReview = props.userinfo
    ? props.userinfo.numberOfPrsToReview
    : 0;
  const numberOfPrsToSupervise = props.userinfo
    ? props.userinfo.numberOfPrsToSupervise
    : 0;

  let prsNotFilledByEmployee = props.userinfo
    ? props.userinfo.prsNotFilledByEmployee
    : 0;

  return props.userinfo ? (
    <div className={props.classes.columnContainer}>
      <div className={props.classes.rowContainer}>
        {props.userinfo.idOfNewestOpenPr && isEmployee(props.userroles) ? (
          <Card
            className={props.classes.card}
            component={NavLink}
            to={'/prs/' + props.userinfo.idOfNewestOpenPr}
            style={{ textDecoration: 'none' }}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {formatDateForFrontend(props.userinfo.deadlineOfNewestOpenPr)}
              </Typography>
              <Typography className={props.classes.title} color="textSecondary">
                {props.intl.formatMessage({
                  id: 'dashboard.opened'
                })}
              </Typography>
            </CardContent>
          </Card>
        ) : null}

        {numberOfPrsToReview > 1 && isEmployee(props.userroles) ? (
          <Card
            className={props.classes.card}
            component={NavLink}
            to={'/prs'}
            style={{ textDecoration: 'none' }}
            onClick={handleClick(defaultFilterService.prsAsReviewerFilter())}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {numberOfPrsToReview}
              </Typography>
              <Typography className={props.classes.title} color="textSecondary">
                {props.intl.formatMessage({
                  id: 'dashboard.evaluator'
                })}
              </Typography>
            </CardContent>
          </Card>
        ) : null}

        {numberOfPrsToReview > 0 ? (
          <InfoWidget
            label={props.intl.formatMessage({
              id: 'dashboard.reviewer'
            })}
            value={numberOfPrsToReview}
            linkTo={'/prs'}
            onClick={handleClick(defaultFilterService.prsToReviewFilter())}
            icon={'library_books'}
          />
        ) : null}

        {numberOfPrsToSupervise > 0 && isSupervisor(props.userroles) ? (
          <InfoWidget
            label={props.intl.formatMessage({
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

        {isEmployee(props.userroles) && prsNotFilledByEmployee > 0 ? (
          <Card
            className={props.classes.card}
            component={NavLink}
            to={'/myPrs'}
            style={{ textDecoration: 'none' }}
            onClick={handleClick(defaultFilterService.ownIncompletePrsFilter())}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {prsNotFilledByEmployee}
              </Typography>
              <Typography className={props.classes.title} color="textSecondary">
                {props.intl.formatMessage({
                  id: 'dashboard.unprocessed'
                })}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <div className={props.classes.rowContainer}>
        <Card className={props.classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.intl.formatMessage({
                id: 'dashboard.beta'
              })}
            </Typography>
            <Typography className={props.classes.title} color="textSecondary">
              {props.intl.formatMessage({
                id: 'dashboard.welcome'
              })}
              <br />
              <br />
              {`${props.intl.formatMessage({
                id: 'dashboard.testphase'
              })} `}
              <a href="mailto:Tuan-Si.Tran@senacor.com">
                Si Tran (Tuan-Si.Tran@senacor.com)
              </a>
              {` ${props.intl.formatMessage({
                id: 'dashboard.concern'
              })}`}
              <br />
              <br />
              {props.intl.formatMessage({
                id: 'dashboard.update'
              })}
              <br />
              <br />
              {props.intl.formatMessage({
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
    state => ({
      userinfo: getUserinfo(state),
      userroles: getUserroles(state)
    }),
    { addFilter: actions.addFilter, resetFilterGroup: actions.resetFilterGroup }
  )(StyledComponent)
);
