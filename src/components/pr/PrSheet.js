import React from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import PrComment from './PrComment';
import PrOverallAssessment from './PrOverallAssessment';
import PrSheetEmployee from './PrSheetEmployee';
import { withStyles } from '@material-ui/core/styles/index';
import { isEmployee, isSupervisor } from '../../helper/checkRole';
import * as actions from '../../actions';
import * as visibilityTypes from '../../helper/prVisibility';
import * as finalizationTypes from '../../helper/prFinalization';
import objectGet from 'object-get';
import { getPrDetail, getUserroles } from '../../reducers/selector';
import PrFinalCommentEmployee from './PrFinalCommentEmployee';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid/Grid';

const styles = theme => ({
  containerVertical: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  nested: {
    paddingLeft: '30px'
  },
  rightAlignText: {
    textAlign: 'right'
  },
  buttonDesktop: {
    position: 'relative',
    marginRight: '1%',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '2%'
  },
  buttonDesktopDisabled: {
    position: 'relative',
    marginRight: '1%',
    backgroundColor: theme.palette.primary['50'],
    color: '#FFF',
    marginBottom: '2%'
  }
});

class PrSheet extends React.Component {
  isVisibleToEmployee = () => {
    return (
      objectGet(this.props, 'prById.prVisibilityEntry.visibilityToEmployee') ===
      visibilityTypes.VISIBLE
    );
  };

  isVisibleToReviewer = () => {
    return (
      objectGet(this.props, 'prById.prVisibilityEntry.visibilityToReviewer') ===
      visibilityTypes.VISIBLE
    );
  };

  isFinalizedForReviewer = () => {
    return (
      objectGet(
        this.props,
        'prById.prFinalizationStatus.finalizationStatusOfReviewer'
      ) === finalizationTypes.FINALIZED
    );
  };

  isFinalizedForEmployee = () => {
    return (
      objectGet(
        this.props,
        'prById.prFinalizationStatus.finalizationStatusOfEmployee'
      ) === finalizationTypes.FINALIZED
    );
  };

  render() {
    const { prById, classes } = this.props;

    if (!prById) {
      return null;
    }

    let step1employee = () => {
      return (
        <List>
          <ListItem>
            <ListItemText primary="Mitarbeiterrolle" />
          </ListItem>
          <List disablePadding>
            <PrSheetEmployee
              prById={prById}
              prFinalized={this.isFinalizedForEmployee()}
              prVisible={
                isEmployee(this.props.userroles) || this.isVisibleToReviewer()
              }
              category="ROLE_AND_PROJECT_ENVIRONMENT"
            />
            <PrSheetEmployee
              prById={prById}
              prFinalized={this.isFinalizedForEmployee()}
              prVisible={
                isEmployee(this.props.userroles) || this.isVisibleToReviewer()
              }
              category="INFLUENCE_OF_LEADER_AND_ENVIRONMENT"
            />
          </List>
        </List>
      );
    };

    let overallReviewer = () => {
      return (
        <List>
          <ListItem>
            <ListItemText primary="Gesamtschätzung und Entwicklungsbedarfe" />
          </ListItem>
          <List disablePadding>
            <PrOverallAssessment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
            />
          </List>
        </List>
      );
    };

    let finalEmployee = () => {
      return (
        <List>
          <List disablePadding>
            <div className={classes.containerListItem}>
              <PrFinalCommentEmployee
                prById={prById}
                readOnly={
                  isSupervisor(this.props.userroles) ||
                  this.isFinalizedForEmployee()
                }
              />
            </div>
          </List>
        </List>
      );
    };

    let detailReviewer = () => {
      return (
        <List>
          <ListItem>
            <ListItemText primary="Leistungen im Projekt" />
          </ListItem>
          <List disablePadding>
            <PrComment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
              category="PROBLEM_ANALYSIS"
            />
            <PrComment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
              category="WORK_RESULTS"
            />
            <PrComment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
              category="WORKING_MANNER"
            />
          </List>
          <Divider />
          <ListItem>
            <ListItemText primary="Wirkung beim Kunden" />
          </ListItem>
          <List disablePadding>
            <PrComment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
              category="CUSTOMER_INTERACTION"
            />
            <PrComment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
              category="CUSTOMER_RETENTION"
            />
          </List>
          <Divider />
          <ListItem>
            <ListItemText primary="Wirkung im Team" />
          </ListItem>
          <List disablePadding>
            <PrComment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
              category="TEAMWORK"
            />
            <PrComment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
              category="LEADERSHIP"
            />
          </List>
          <Divider />
          <ListItem>
            <ListItemText primary="Wirkung im Unternehmen" />
          </ListItem>
          <List disablePadding>
            <PrComment
              prById={prById}
              prFinalized={this.isFinalizedForReviewer()}
              prVisible={
                isSupervisor(this.props.userroles) || this.isVisibleToEmployee()
              }
              category="CONTRIBUTION_TO_COMPANY_DEVELOPMENT"
            />
          </List>
        </List>
      );
    };

    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            {step1employee()}
            <Divider />
            <Hidden lgUp>
              {detailReviewer()}
              <Divider />
            </Hidden>
            {overallReviewer()}
            <Divider />
            {finalEmployee()}
          </Grid>
          <Hidden mdDown>
            <Grid item lg={6} xl={6}>
              {detailReviewer()}
            </Grid>
          </Hidden>
        </Grid>
        <Divider />
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrSheet);
export default connect(
  state => ({
    prById: getPrDetail()(state),
    userroles: getUserroles(state)
  }),
  {
    setVisibilityById: actions.setVisibilityById
  }
)(StyledComponent);
