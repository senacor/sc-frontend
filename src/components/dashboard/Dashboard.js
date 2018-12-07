import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import { getUserinfo, getUserroles } from '../../reducers/selector';
import * as actions from '../../actions';
import { NavLink } from 'react-router-dom';
import { isEmployee, isSupervisor } from '../../helper/checkRole';

let styles = {
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

class Dashboard extends Component {
  render() {
    const { classes, userroles } = this.props;
    let numberOfPrsToReview = this.props.userinfo
      ? this.props.userinfo.numberOfPrsToReview
      : 0;
    let numberOfPrsToSupervise = this.props.userinfo
      ? this.props.userinfo.numberOfPrsToSupervise
      : 0;
    let userId = this.props.userinfo.userId;
    let filterPrsToReview = {
      searchString: 'reviewerPreparationDone=false&reviewer=' + userId,
      values: ['nein']
    };
    let payloadPrsToReviewFilter = {
      filterGroup: 'REVIEWER',
      filterBy: 'reviewerPreparationDone',
      filter: filterPrsToReview
    };
    let filterOwnPrs = {
      searchString: 'employeePreparationDone=false',
      values: ['nein']
    };
    let payloadOwnPrsFilter = {
      filterGroup: 'EMPLOYEE',
      filterBy: 'employeePreparationDone',
      filter: filterOwnPrs
    };
    let prsNotFilledByReviewer = this.props.userinfo
      ? this.props.userinfo.prsNotFilledByReviewer
      : 0;
    let prsNotFilledByEmployee = this.props.userinfo
      ? this.props.userinfo.prsNotFilledByEmployee
      : 0;

    return this.props.userinfo ? (
      <div className={classes.columnContainer}>
        <div className={classes.rowContainer}>
          {numberOfPrsToReview > 0 && isEmployee(userroles) ? (
            <Card
              className={classes.card}
              component={NavLink}
              to={'/prs'}
              style={{ textDecoration: 'none' }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {numberOfPrsToReview}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  PRs mit mir als Bewerter insgesamt (inkl. Archiv)
                </Typography>
              </CardContent>
            </Card>
          ) : null}

          {numberOfPrsToSupervise > 0 && isSupervisor(userroles) ? (
            <Card
              className={classes.card}
              component={NavLink}
              to={'/prs'}
              style={{ textDecoration: 'none' }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {numberOfPrsToSupervise}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  PRs mit mir als Vorgesetzter insgesamt (inkl. Archiv)
                </Typography>
              </CardContent>
            </Card>
          ) : null}

          {prsNotFilledByReviewer > 0 ? (
            <Card
              className={classes.card}
              component={NavLink}
              to={'/prs'}
              style={{ textDecoration: 'none' }}
              onClick={() => this.props.addFilter(payloadPrsToReviewFilter)}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {prsNotFilledByReviewer}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  Unbearbeitete PRs mit mir als Bewerter
                </Typography>
              </CardContent>
            </Card>
          ) : null}

          {isEmployee(userroles) && prsNotFilledByEmployee > 0 ? (
            <Card
              className={classes.card}
              component={NavLink}
              to={'/myPrs'}
              style={{ textDecoration: 'none' }}
              onClick={() => this.props.addFilter(payloadOwnPrsFilter)}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {prsNotFilledByEmployee}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  Unbearbeitete eigene PRs
                </Typography>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <div className={classes.rowContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Achtung: Beta-Phase!
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                Willkommen im Performance-Review-Portal. Dies ist die erste
                Testphase. Wir haben nach bestem Wissen und Gewissen alle
                Funktionalitäten getestet. Bitte meldet alle dennoch
                auftretenden Auffälligkeiten an Tuan-Si.Tran@senacor.com, damit
                wir uns zeitnah darum kümmern können. Wir wünschen viel Spaß
                beim Testen!
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    ) : null;
  }
}

export const StyledComponent = withStyles(styles)(Dashboard);
export default connect(
  state => ({
    userinfo: getUserinfo(state),
    userroles: getUserroles(state)
  }),
  { addFilter: actions.addFilter }
)(StyledComponent);
