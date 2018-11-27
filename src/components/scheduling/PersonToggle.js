import React from 'react';
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

export class PersonToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAttendee: props.showAttendee
    };
  }

  findSwitchBase = (attendee, classes) => {
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

  findSwitchBaseOff = (attendee, classes) => {
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

  render() {
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
            {this.props.displayRole}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {this.props.displayName}
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <Switch
            className="employeeSwitch"
            checked={this.state.showAttendee}
            onChange={() => {
              this.handleToggle();
            }}
            classes={{
              switchBase: this.findSwitchBaseOff(
                this.props.attendee,
                this.props.classes
              ),
              iconChecked: this.findSwitchBase(
                this.props.attendee,
                this.props.classes
              ),
              bar: this.props.classes.bar
            }}
            color={'primary'}
          />
        </Grid>
      </Grid>
    );
  }

  handleToggle = () => {
    const { showAttendee } = this.state;
    this.setState({ showAttendee: !showAttendee });
    this.props.onChange(!showAttendee);
  };
}

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