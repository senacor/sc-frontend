import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import StepSlider from './StepSlider';
import Grid from '@material-ui/core/Grid/index';
import objectGet from 'object-get';
import * as actions from '../../actions';
import { translateContent } from '../translate/Translate';
import Typography from '@material-ui/core/Typography';

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
  },
  simpleBlack: {
    color: '#000000'
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
  buildTargetRoleInformation = () => {
    let targetRoleInformationOfEmployee =
      objectGet(this.props, 'prActive.prTargetRoleSet') || [];
    targetRoleInformationOfEmployee.sort(compareTargetRoles);

    const { prActive, classes, prFinalized, isActionPerformer } = this.props;
    let isDisabled = !isActionPerformer;

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
            <div className={classes.simpleBlack}>
              <Typography>
                {translateContent(targetRole.prTargetRoleName)}
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            className={classes.ratingTargetRole}
            id={'target-role-' + targetRole.prTargetRoleName}
          >
            <StepSlider
              key={targetRole.prTargetRoleName}
              isDisabled={isDisabled || prFinalized}
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
        <Grid container>{this.buildTargetRoleInformation()}</Grid>
      </ListItem>
    );
  }
}

export const StyledComponent = withStyles(styles)(TargetRole);
export default connect(
  state => ({
    prActive: state.prs[state.prDetailId]
  }),
  {
    changeRatingTargetRole: actions.changeRatingTargetRole
  }
)(StyledComponent);
