import React from 'react';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { withStyles } from '@material-ui/core';

const styles = theme => {
  return {
    listItemRoot: {
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: 0.5 * theme.spacing.unit,
      paddingBottom: 0.5 * theme.spacing.unit
    },
    listItemPrimary: {
      fontSize: '0.875rem'
    }
  };
};

const PrSubstepItem = props => {
  const { classes, substep } = props;
  return (
    <ListItem
      classes={{
        root: classes.listItemRoot
      }}
    >
      <ListItemText
        classes={{
          primary: classes.listItemPrimary
        }}
        primary={substep.label}
        secondary={
          substep.isCompleted
            ? substep.rendering.complete
            : substep.isCurrentUserActionPerformer
            ? substep.rendering.incompleteForActionPerformer
            : substep.rendering.incompleteForNonActionPerformer
        }
      />
    </ListItem>
  );
};

export default withStyles(styles)(PrSubstepItem);
