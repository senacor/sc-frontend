import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    width: '90%'
  }
});

class StepSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, targetRoleName, rating, id) => {
    event.preventDefault();
    const prById = this.props.prById;
    this.setState({ rating });
    this.props.changeRatingTargetRole(prById, targetRoleName, rating);
  };

  render() {
    const { targetRoleName, id, classes } = this.props;
    const { rating } = this.state;

    return (
      <Slider
        className={classes.root}
        value={rating}
        min={1}
        max={3}
        step={1}
        onChange={(event, value) =>
          this.handleChange(event, targetRoleName, value, id)
        }
      />
    );
  }
}

StepSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export const StyledComponent = withStyles(styles)(StepSlider);
export default connect(
  null,
  { changeRatingTargetRole: actions.changeRatingTargetRole }
)(StyledComponent);
