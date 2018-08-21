import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

class PersonToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAttendee: props.showAttendee
    };
  }

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
          <Typography variant="subheading" noWrap>
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
            color="primary"
          />
        </Grid>
      </Grid>
    );
  }

  handleToggle = () => {
    const { showAttendee } = this.state;
    this.setState({ showAttendee: !showAttendee });
    this.props.onChange();
  };
}

PersonToggle.propTypes = {
  displayName: PropTypes.string.isRequired,
  displayRole: PropTypes.string,
  showAttendee: PropTypes.bool
};

PersonToggle.defaultProps = {
  displayRole: '',
  showAttendee: false
};

export default PersonToggle;
