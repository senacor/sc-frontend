import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  colorSwitchBaseReviewer: {
    color: theme.palette.primary['500']
  },
  colorSwitchBaseEmployee: {
    color: theme.palette.primary['400']
  },
  colorSwitchBaseSupervisor: {
    color: theme.palette.secondary.green
  },
  colorSwitchBaseReviewerOff: {
    color: theme.palette.primary['500']
  },
  colorSwitchBaseEmployeeOff: {
    color: theme.palette.primary['400']
  },
  colorSwitchBaseSupervisorOff: {
    color: theme.palette.secondary.green
  },
  bar: {
    backgroundColor: theme.palette.secondary.grey
  }
});

export const PersonToggle = ({
  showAttendee,
  onChange,
  displayRole,
  displayName,
  attendee,
  classes
}) => {
  const [showAtt, setShowAtt] = useState(showAttendee);

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
    setShowAtt(!showAtt);
    onChange(!showAtt);
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
          {displayRole}
        </Typography>
        <Typography variant="subtitle1" noWrap>
          {displayName}
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <Switch
          className="employeeSwitch"
          checked={showAtt}
          onChange={() => {
            handleToggle();
          }}
          classes={{
            switchBase: findSwitchBaseOff(attendee, classes),
            iconChecked: findSwitchBase(attendee, classes),
            bar: classes.bar
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
