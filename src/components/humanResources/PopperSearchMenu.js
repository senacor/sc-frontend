import React from 'react';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { getSubFilter } from '../../reducers/selector';
import { connect } from 'react-redux';

export class PopperSearchMenu extends React.Component {
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

  getIcon = subfilter => {
    return subfilter === '' ? 'search' : 'filter_list';
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const icon = this.getIcon(this.props.subfilter);

    return (
      <div>
        <IconButton onClick={this.handleClick}>
          <Icon>{icon}</Icon>
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
          <div>
            {React.cloneElement(this.props.children, {
              closeFilter: this.handleClose,
              ...this.props
            })}
          </div>
        </Popover>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    subfilter: getSubFilter(props.filterGroup, props.filterBy)(state)
  }),
  {}
)(PopperSearchMenu);
