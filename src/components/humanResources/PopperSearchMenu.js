import React, { useState } from 'react';
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

export const PopperSearchMenu = props => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = event => {
    setAnchorEl(null);
  };

  const getIcon = subfilter => {
    const classes = props.classes;

    return subfilter === '' ? (
      <Icon className={classes.iconFilterUnset}>filter_list</Icon>
    ) : (
      <Icon className={classes.iconFilterSet}>filter_list</Icon>
    );
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <IconButton onClick={handleClick}>{getIcon(props.subfilter)}</IconButton>
      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <div>
          {React.cloneElement(props.children, {
            closeFilter: handleClose,
            filterBy: props.filterBy,
            filterGroup: props.filterGroup
          })}
        </div>
      </Popover>
    </div>
  );
};

export const StyledComponent = withStyles(styles)(PopperSearchMenu);
export default connect(
  (state, props) => ({
    subfilter: getSubFilter(props.filterGroup, props.filterBy)(state)
  }),
  {}
)(StyledComponent);
