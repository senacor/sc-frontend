import React from 'react';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { getSubFilter } from '../../reducers/selector';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  iconFilterSet: {
    color: theme.palette.primary['500'],
    margin: '0px'
  },
  iconFilterUnset: {
    color: '#dddddd',
    margin: '0px'
  }
});

export class PopperSearchMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
    event.stopPropagation();
  };

  handleClose = event => {
    this.setState({
      anchorEl: null
    });
    if (event) {
      event.stopPropagation();
    }
  };

  getIcon = subfilter => {
    const classes = this.props.classes;

    return subfilter === '' ? (
      <Icon className={classes.iconFilterUnset}>filter_list</Icon>
    ) : (
      <Icon className={classes.iconFilterSet}>filter_list</Icon>
    );
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton onClick={this.handleClick}>
          {this.getIcon(this.props.subfilter)}
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
          onClick={event => event.stopPropagation()}
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
export const StyledComponent = withStyles(styles)(PopperSearchMenu);

export default connect(
  (state, props) => ({
    subfilter: getSubFilter(props.filterGroup, props.filterBy)(state)
  }),
  {}
)(StyledComponent);
