import React, { useState } from 'react';
import { StyledComponent as SimpleErrorDialog } from '../pr/SimpleErrorDialog';
import PropTypes from 'prop-types';

export const CheckRequiredClick = ({
  check,
  onClick,
  inputClass,
  children,
  message
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = event => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = event => {
    if (check()) {
      onClick(event);
    } else {
      if (!event.disabled) {
        handleOpen(event);
      }
    }
  };

  return (
    <div className={inputClass}>
      {React.cloneElement(children, {
        releaseButtonClick: handleClick
      })}
      <SimpleErrorDialog onClose={handleClose} open={open} message={message} />
    </div>
  );
};

CheckRequiredClick.propTypes = {
  onClick: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
