import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

class PersonToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showReviewer: props.showReviewer,
      showSupervisor: props.showSupervisor,
      showEmployee: props.showEmployee
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
        <Grid item>
          <Grid container alignItems="center" direction="row">
            <Typography variant="subheading" noWrap>
              Mitarbeiter
            </Typography>
            <Switch
              checked={this.state.showEmployee}
              onChange={() => {
                //does not run function immediately, just makes reference. Function is executed on click, not on reder
                this.handleToggle('showEmployee');
              }}
              color="primary"
            />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Typography variant="subheading">Bewerter</Typography>
            <Switch
              checked={this.state.showReviewer}
              onChange={() => {
                this.handleToggle('showReviewer');
              }}
              color="primary"
            />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Typography variant="subheading">Vorgesetzter</Typography>
            <Switch
              checked={this.state.showSupervisor}
              onChange={() => {
                this.handleToggle('showSupervisor');
              }}
              color="primary"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  handleToggle = showPerson => {
    this.setState(
      previousState => {
        return { [showPerson]: !previousState[showPerson] };
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };
}

PersonToggle.propTypes = {
  showReviewer: PropTypes.bool,
  showEmployee: PropTypes.bool,
  showSupervisor: PropTypes.bool
};
PersonToggle.defaultProps = {
  showReviewer: false,
  showEmployee: false,
  showSupervisor: false
};
export default PersonToggle;
