import React, { useState } from 'react';
import { injectIntl } from "react-intl";
import FilterList from '@material-ui/icons/FilterList';
import { IconButton, Popover } from '@material-ui/core';

export const EmployeeFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = event => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  return (
    <div>
      <IconButton onClick={handleClick}><FilterList /></IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
      </Popover>
    </div>
  );
};

export default injectIntl(EmployeeFilter);
