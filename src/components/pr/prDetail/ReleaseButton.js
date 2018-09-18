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

/**
 * @return {null}
 */
function ReleaseButton(props) {
  let { classes } = props;
  return (
    <Button
      classes={{ sizeSmall: classes.sizeSmall }}
      size="small"
      className={classes.buttonDesktop}
      onClick={props.releaseButtonClick}
    >
      Freigabe
    </Button>
  );
}

export const StyledReleaseButton = withStyles(styles)(ReleaseButton);
export default ReleaseButton;
