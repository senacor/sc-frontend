import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import StepSlider from './StepSlider';
import { isEmployee } from '../../helper/checkRole';
import { getUserroles } from '../../reducers/selector';
import Grid from '@material-ui/core/Grid/index';
import objectGet from 'object-get';
import * as actions from '../../actions';
import { translateContent } from '../translate/Translate';

const styles = theme => ({
  outerGrid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  ratingTargetRole: {
    color: theme.palette.primary['300'],
    justifyContent: 'flex-end'
  },
  targetRole: {
    color: theme.palette.primary['300'],
    alignItems: 'flex-end'
  }
});

const compareTargetRoles = (() => {
  const orderedTargetRoleNames = [
    'PLATTFORMGESTALTER',
    'IT_SOLUTION_LEADER',
    'TRANSFORMATION_MANAGER',
    'IT_LIEFERSTEUERER',
    'ARCHITECT',
    'TECHNICAL_EXPERT',
    'LEAD_DEVELOPER'
  ];

  return (objTargetRoleOne, objTargetRoleTwo) => {
    let priorityTargetRoleOne = orderedTargetRoleNames.indexOf(
      objTargetRoleOne.prTargetRoleName
    );
    let priorityTargetRoleTwo = orderedTargetRoleNames.indexOf(
      objTargetRoleTwo.prTargetRoleName
    );

    return priorityTargetRoleOne > priorityTargetRoleTwo ? 1 : -1;
  };
})();

class TargetRole extends Component {
  constructor(props) {
    super(props);
    this.buildTargetRoleInformation = this.buildTargetRoleInformation.bind(
      this
    );
  }

  buildTargetRoleInformation = () => {
    let targetRoleInformationOfEmployee =
      objectGet(this.props, 'prActive.prTargetRoleSet') || [];
    targetRoleInformationOfEmployee.sort(compareTargetRoles);

    const { prActive, isDisabled, classes } = this.props;

    return targetRoleInformationOfEmployee.map(targetRole => {
      return (
        <Grid
          key={targetRole.prTargetRoleName + '_Container'}
          container
          className={classes.outerGrid}
        >
          <Grid
            item
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            className={classes.targetRole}
          >
            <ListItemText
              secondary={translateContent(targetRole.prTargetRoleName)}
            />
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            className={classes.ratingTargetRole}
          >
            <StepSlider
              key={targetRole.prTargetRoleName}
              isDisabled={isDisabled}
              prActive={prActive}
              rating={targetRole.rating}
              targetRoleName={targetRole.prTargetRoleName}
            />
          </Grid>
        </Grid>
      );
    });
  };

  render() {
    return (
      <ListItem>
        <Grid container>
          {this.buildTargetRoleInformation()}
        </Grid>
      </ListItem>
    );
  }
}

export const StyledComponent = withStyles(styles)(TargetRole);
export default connect(
  state => ({
    prActive: state.prs[state.prDetailId],
    isDisabled: isEmployee(getUserroles(state)) === true
  }),
  {
    changeRatingTargetRole: actions.changeRatingTargetRole
  }
)(StyledComponent);
