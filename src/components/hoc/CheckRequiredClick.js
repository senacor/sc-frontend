import React from 'react';
import { SimpleErrorDialog } from '../pr/SimpleErrorDialog';
import PropTypes from 'prop-types';

export class CheckRequiredClick extends React.Component {
  state = {
    open: false
  };

  handleOpen = event => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = event => {
    if (this.props.check()) {
      this.props.onClick(event);
    } else {
      if (!event.disabled) {
        this.handleOpen(event);
      }
    }
  };

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          releaseButtonClick: this.handleClick
        })}
        <SimpleErrorDialog
          onClose={this.handleClose}
          open={this.state.open}
          message={this.props.message}
        />
      </div>
    );
  }
}

CheckRequiredClick.propTypes = {
  onClick: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
