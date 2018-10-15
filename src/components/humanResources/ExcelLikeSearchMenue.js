import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class ExcelLikeSearchMenue extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { content } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton onClick={this.handleClick}>
          <Icon>search</Icon>
        </IconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {content}
        </Popover>
      </div>
    );
  }
}

ExcelLikeSearchMenue.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExcelLikeSearchMenue);
