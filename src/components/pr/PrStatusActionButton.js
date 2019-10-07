import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  buttonDesktop: {
    position: 'relative',
    backgroundColor: theme.palette.primary['400'],
    color: theme.palette.secondary.white,
    margin: 2 * theme.spacing.unit
  },
  sizeSmall: {}
});

const PrStatusActionButton = props => {
  let {
    classes,
    label,
    inputClass,
    disabled,
    releaseButtonClick,
    ...otherProps
  } = props;
  let finalClass = inputClass ? inputClass : classes.buttonDesktop;
  return (
    <Button
      classes={{ sizeSmall: classes.sizeSmall }}
      size="small"
      className={finalClass}
      onClick={releaseButtonClick}
      disabled={disabled}
      {...otherProps}
    >
      {label}
    </Button>
  );
};

export default withStyles(styles)(PrStatusActionButton);