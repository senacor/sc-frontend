import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
  buttonDesktop: {
    position: 'relative',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '2%'
  },
  sizeSmall: {}
});

function PrStatusActionButton(props) {
  let { classes, label, inputClass, link, to, component } = props;
  let finalClass = inputClass ? inputClass : classes.buttonDesktop;
  return link ? (
    <Button
      classes={{ sizeSmall: classes.sizeSmall }}
      size="small"
      className={finalClass}
      onClick={props.releaseButtonClick}
      component={component}
      to={to}
    >
      {label}
    </Button>
  ) : (
    <Button
      classes={{ sizeSmall: classes.sizeSmall }}
      size="small"
      className={finalClass}
      onClick={props.releaseButtonClick}
    >
      {label}
    </Button>
  );
}

export default withStyles(styles)(PrStatusActionButton);
