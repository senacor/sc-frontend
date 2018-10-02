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

    return (
      <div className={classes.containerVertical}>
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

            <div className={classes.containerListItem}>
              <PrFinalCommentEmployee
                prById={prById}
                prFinalized={this.isFinalizedForEmployee()}
                prVisible={
                  isEmployee(this.props.userroles) || this.isVisibleToReviewer()
                }
              />
            </div>
          </List>
        </List>
        <Divider />
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
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Wirkung beim Kunden" />
          </ListItem>
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
        <List>
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
        </List>
        <Divider />
        <List>
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
        <Divider />
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
