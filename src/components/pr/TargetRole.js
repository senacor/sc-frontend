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

const getSortedTargetRoleSet = targetRoleSet => {
  const targetRolesOrdered = [
    'PLATTFORMGESTALTER',
    'IT_SOLUTION_LEADER',
    'TRANSFORMATION_MANAGER',
    'IT_LIEFERSTEUERER',
    'ARCHITECT',
    'TECHNICAL_EXPERT',
    'LEAD_DEVELOPER'
  ];

  return targetRoleSet.sort((objTargetRoleOne, objTargetRoleTwo) => {
    let priorityTargetRoleOne = targetRolesOrdered.indexOf(
      objTargetRoleOne.prTargetRoleName
    );
    let priorityTargetRoleTwo = targetRolesOrdered.indexOf(
      objTargetRoleTwo.prTargetRoleName
    );

    return priorityTargetRoleOne > priorityTargetRoleTwo ? 1 : -1;
  });
};

export class TargetRole extends Component {
  constructor(props) {
    super(props);
  }

  renderTargetRoleInformation = () => {
    let targetRoleInformationOfEmployee = objectGet(
      this.props,
      'prById.prTargetRoleSet'
    );
    let sortedTargetRoleInformationOfEmployee = getSortedTargetRoleSet(
      targetRoleInformationOfEmployee
    );

    const { prById, classes } = this.props;

    return sortedTargetRoleInformationOfEmployee.map((targetRole, index) => {
      let targetRoleName = targetRole.prTargetRoleName;

      return (
        <Grid container className={classes.outerGrid}>
          <Grid
            item
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            className={classes.targetRole}
          >
            <ListItemText secondary={translateContent(targetRoleName)} />
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
              prById={prById}
              targetRoleName={targetRole.prTargetRoleName}
              rating={targetRole.rating}
              key={targetRole.prTargetRoleName}
              id={index}
            />
          </Grid>
        </Grid>
      );
    });
  };

  render() {
    if (isEmployee(this.props.userroles)) {
      return null;
    }

    const { classes } = this.props;
    return (
      <ListItem>
        <Grid container className={classes.root}>
          {this.renderTargetRoleInformation()}
        </Grid>
      </ListItem>
    );
  }
}

export const StyledComponent = withStyles(styles)(TargetRole);
export default connect(
  (state, props) => ({
    userroles: getUserroles(state),
    prById: props.prById
  }),
  {
    changeRatingTargetRole: actions.changeRatingTargetRole
  }
)(StyledComponent);
