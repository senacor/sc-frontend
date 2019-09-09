import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import {IconButton, List, Popover, withStyles} from '@material-ui/core';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';

const styles = theme => ({
  spacing: {
    margin: theme.spacing.unit
  }
});

const UserRolesMenu = () => {
  const getRoles = () => {
    return ['Admin', 'Consulting', 'Developer', 'Personal development', 'Supervisor', 'Other'];
  };

  const [selectedRoles, setSelectedRoles] = useState(getRoles());
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <IconButton onClick={handleClick}><SupervisedUserCircle /></IconButton>
    <Popover
  open={Boolean(anchorEl)}
  anchorEl={anchorEl}
  onClose={handleClose}
    >
    <List>
    {getRoles().map(entry => {
        return entry;
})}
</List>
  </Popover>
  </div>
);
};

export default injectIntl(withStyles(styles)(UserRolesMenu));
