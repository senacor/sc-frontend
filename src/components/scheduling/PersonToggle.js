import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  colorSwitchBaseReviewer: {
    color: '#004953'
  },
  colorSwitchBaseEmployee: {
    color: '#3D8E99'
  },
  colorSwitchBaseSupervisor: {
    color: '#00FF90'
  },
  colorSwitchBaseReviewerOff: {
    color: 'rgba(0, 73, 83, 0.62)'
  },
  colorSwitchBaseEmployeeOff: {
    color: 'rgba(61, 142, 153, 0.62)'
  },
  colorSwitchBaseSupervisorOff: {
    color: 'rgba(0, 255, 144, 0.62)'
  },
  bar: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  }
});

export const PersonToggle = props => {
  const [showAttendee, setShowAttendee] = useState(props.showAttendee);

  const findSwitchBase = (attendee, classes) => {
    switch (attendee) {
      case 'employee':
        return classes.colorSwitchBaseEmployee;
      case 'reviewer':
        return classes.colorSwitchBaseReviewer;
      case 'supervisor':
        return classes.colorSwitchBaseSupervisor;
      default:
        return classes.colorSwitchBaseEmployee;
    }
  };

  const findSwitchBaseOff = (attendee, classes) => {
    switch (attendee) {
      case 'employee':
        return classes.colorSwitchBaseEmployeeOff;
      case 'reviewer':
        return classes.colorSwitchBaseReviewerOff;
      case 'supervisor':
        return classes.colorSwitchBaseSupervisorOff;
      default:
        return classes.colorSwitchBaseEmployeeOff;
    }
  };

  const handleToggle = () => {
    setShowAttendee(!showAttendee);
    props.onChange(!showAttendee);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      alignContent="space-between"
      spacing={24}
    >
      <Grid item xs={8} sm={4} md={2} lg={2} xl={2}>
        <Typography variant="caption" color="textSecondary">
          {props.displayRole}
        </Typography>
        <Typography variant="subtitle1" noWrap>
          {props.displayName}
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <Switch
          className="employeeSwitch"
          checked={showAttendee}
          onChange={() => {
            handleToggle();
          }}
          classes={{
            switchBase: findSwitchBaseOff(props.attendee, props.classes),
            iconChecked: findSwitchBase(props.attendee, props.classes),
            bar: props.classes.bar
          }}
          color={'primary'}
        />
      </Grid>
    </Grid>
  );
};

PersonToggle.propTypes = {
  displayName: PropTypes.string.isRequired,
  displayRole: PropTypes.string,
  showAttendee: PropTypes.bool,
  color: PropTypes.string,
  attendee: PropTypes.string
};

PersonToggle.defaultProps = {
  displayRole: '',
  showAttendee: true
};

export default withStyles(styles)(PersonToggle);
