import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import StepSlider from './StepSlider';
import Grid from '@material-ui/core/Grid/index';
import objectGet from 'object-get';
import Typography from '@material-ui/core/Typography';
import { injectIntl } from 'react-intl';

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
    color: '#000000',
    marginBottom: '3%'
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

const TargetRole = props => {
  const {
    prActive,
    classes,
    readOnly,
    isActionPerformer,
    openEditing,
    intl
  } = props;

  const buildTargetRoleInformation = () => {
    let targetRoleInformationOfEmployee =
      objectGet(props, 'prActive.prTargetRoleSet') || [];
    targetRoleInformationOfEmployee.sort(compareTargetRoles);

    let isDisabled = !isActionPerformer;

    return targetRoleInformationOfEmployee.map(targetRole => {
      return (
        <Grid
          key={targetRole.prTargetRoleName + '_Container'}
          container
          className={classes.outerGrid}
        >
          <Grid item xs={8} className={classes.targetRole}>
            <div className={classes.simpleBlack}>
              <Typography>
                {intl.formatMessage({
                  id: `${targetRole.prTargetRoleName}`
                })}
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            xs={4}
            className={classes.ratingTargetRole}
            id={'target-role-' + targetRole.prTargetRoleName}
          >
            <StepSlider
              key={targetRole.prTargetRoleName}
              isDisabled={isDisabled || (readOnly && !openEditing)}
              prActive={prActive}
              rating={isActionPerformer || readOnly ? targetRole.rating : 2}
              targetRoleName={targetRole.prTargetRoleName}
            />
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <ListItem>
      <Grid container>{buildTargetRoleInformation()}</Grid>
    </ListItem>
  );
};

export const StyledComponent = withStyles(styles)(TargetRole);
export default injectIntl(
  connect(state => ({
    prActive: state.prs[state.prDetailId]
  }))(StyledComponent)
);
