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
  let { classes, label } = props;
  return (
    <Button
      classes={{ sizeSmall: classes.sizeSmall }}
      size="small"
      className={classes.buttonDesktop}
      onClick={props.releaseButtonClick}
    >
      {label}
    </Button>
  );
}

export default withStyles(styles)(PrStatusActionButton);
