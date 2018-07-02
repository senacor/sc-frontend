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
import Button from '@material-ui/core/Button';
import { isEmployee, isSupervisor } from '../../helper/checkRole';
import * as actions from '../../actions';

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
  constructor(props) {
    super(props);
    this.state = {
      prById: this.props.prById,
      visibilityToEmployee:
        this.props.prById.prVisibilityEntry.visibilityToEmployee === 'VISIBLE',
      visibilityToReviewer:
        this.props.prById.prVisibilityEntry.visibilityToReviewer === 'VISIBLE'
    };
  }

  handleClick = () => {
    if (
      (isSupervisor(this.props.userroles) &&
        !this.state.visibilityToEmployee) ||
      (isEmployee(this.props.userroles) && !this.state.visibilityToReviewer)
    ) {
      this.props.setVisibilityById(
        this.state.prById,
        isSupervisor(this.props.userroles)
          ? true
          : this.state.visibilityToEmployee,
        isEmployee(this.props.userroles)
          ? true
          : this.state.visibilityToReviewer
      );
      this.setState({
        visibilityToEmployee:
          isSupervisor(this.props.userroles) || this.state.visibilityToEmployee,
        visibilityToReviewer:
          isEmployee(this.props.userroles) || this.state.visibilityToReviewer
      });
    }
  };

  render() {
    const { prById, classes } = this.props;

    return (
      <div className={classes.containerVertical}>
        <List>
          <ListItem>
            <ListItemText primary="Mitarbeiterrolle" />
          </ListItem>
          <List disablePadding>
            <PrSheetEmployee
              prById={prById}
              prVisible={
                isEmployee(this.props.userroles) ||
                this.state.visibilityToReviewer
              }
              category="INFLUENCE_OF_LEADER_AND_ENVIRONMENT"
            />
            <PrSheetEmployee
              prById={prById}
              prVisible={
                isEmployee(this.props.userroles) ||
                this.state.visibilityToReviewer
              }
              category="ROLE_AND_PROJECT_ENVIRONMENT"
            />
          </List>
          {isEmployee(this.props.userroles) ? (
            <List>
              <ListItem>
                <Button
                  className={
                    this.state.visibilityToReviewer
                      ? classes.buttonDesktopDisabled
                      : classes.buttonDesktop
                  }
                  disabled={this.state.visibilityToReviewer}
                  onClick={this.handleClick}
                >
                  PR Freigeben
                </Button>
              </ListItem>
            </List>
          ) : (
            ''
          )}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Leistungen im Projekt" />
          </ListItem>
          <List disablePadding>
            <PrComment
              prById={prById}
              prVisible={
                isSupervisor(this.props.userroles) ||
                this.state.visibilityToEmployee
              }
              category="PROBLEM_ANALYSIS"
            />
            <PrComment
              prById={prById}
              prVisible={
                isSupervisor(this.props.userroles) ||
                this.state.visibilityToEmployee
              }
              category="WORK_RESULTS"
            />
            <PrComment
              prById={prById}
              prVisible={
                isSupervisor(this.props.userroles) ||
                this.state.visibilityToEmployee
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
            prVisible={
              isSupervisor(this.props.userroles) ||
              this.state.visibilityToEmployee
            }
            category="CUSTOMER_INTERACTION"
          />
          <PrComment
            prById={prById}
            prVisible={
              isSupervisor(this.props.userroles) ||
              this.state.visibilityToEmployee
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
              prVisible={
                isSupervisor(this.props.userroles) ||
                this.state.visibilityToEmployee
              }
              category="TEAMWORK"
            />
            <PrComment
              prById={prById}
              prVisible={
                isSupervisor(this.props.userroles) ||
                this.state.visibilityToEmployee
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
              prVisible={
                isSupervisor(this.props.userroles) ||
                this.state.visibilityToEmployee
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
              prVisible={
                isSupervisor(this.props.userroles) ||
                this.state.visibilityToEmployee
              }
            />
          </List>
        </List>
        <Divider />
        {!isEmployee(this.props.userroles) ? (
          <List>
            <ListItem>
              <Button
                className={
                  this.state.visibilityToEmployee
                    ? classes.buttonDesktopDisabled
                    : classes.buttonDesktop
                }
                disabled={this.state.visibilityToReviewer}
                onClick={this.handleClick}
              >
                PR Freigeben
              </Button>
            </ListItem>
          </List>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrSheet);
export default connect(
  state => ({
    userroles: state.userroles
  }),
  {
    setVisibilityById: actions.setVisibilityById
  }
)(StyledComponent);
