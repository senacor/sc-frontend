import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const styles = {
  root: {
    width: '90%',
    marginTop: '6%',
    marginBottom: '-6%'
  }
};

class StepSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating
    };
  }

  handleChange = (event, prActive, targetRoleName, value) => {
    event.preventDefault();
    this.props.changeRatingTargetRole(prActive.id, targetRoleName, value);
  };

  render() {
    const {
      classes,
      isDisabled,
      prActive,
      rating,
      targetRoleName
    } = this.props;

    return (
      <Slider
        disabled={isDisabled}
        className={classes.root}
        value={rating}
        min={1}
        max={3}
        step={1}
        onChange={(event, value) =>
          this.handleChange(event, prActive, targetRoleName, value)
        }
      />
    );
  }
}

StepSlider.propTypes = {
  disabled: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
};

StepSlider.defaultProps = {
  disabled: false,
  value: 2,
  min: 1,
  max: 3,
  step: 1
};

export const StyledComponent = withStyles(styles)(StepSlider);
export default connect(
  null,
  { changeRatingTargetRole: actions.changeRatingTargetRole }
)(StyledComponent);