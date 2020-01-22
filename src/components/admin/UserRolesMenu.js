import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Button,
  Grid,
  IconButton,
  List,
  Popover,
  withStyles
} from '@material-ui/core';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { setRoles } from '../../calls/admin';
import { useErrorContext } from '../../helper/contextHooks';

const styles = theme => ({
  okButton: {
    margin: '1em',
    marginTop: 0,
    width: '100%',
    color: theme.palette.secondary.white,
    backgroundColor: theme.palette.primary['400']
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const UserRolesMenu = props => {
  const { classes, intl } = props;
  const [selectedRoles, setSelectedRoles] = useState(props.selectedRoles);
  const [anchorEl, setAnchorEl] = useState(null);

  let error = useErrorContext();

  useEffect(
    () => {
      setSelectedRoles(props.selectedRoles);
    },
    [props.selectedRoles]
  );

  const handleClick = event => {
    setSelectedRoles(props.selectedRoles);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = role => {
    setSelectedRoles([role.name]);
  };

  const showContent = role => {
    return (
      <div key={role.id}>
        <ListItem
          dense
          button
          onClick={() => {
            handleToggle(role);
          }}
        >
          <Checkbox
            style={{ padding: 0 }}
            id={role.id}
            checked={selectedRoles.includes(role.name)}
            color={'primary'}
            checkedIcon={<Icon>check</Icon>}
            icon={<Icon />}
          />
          <ListItemText primary={role.name} />
        </ListItem>
      </div>
    );
  };

  const handleOk = () => {
    setRoles(props.employeeId, selectedRoles, error);
    props.updateEmployee(props.employeeId, selectedRoles);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <SupervisedUserCircle />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          handleClose();
        }}
      >
        <Grid container direction="column">
          <Grid item>
            <List>
              {props.allRoles.map(role => {
                return showContent(role);
              })}
            </List>
          </Grid>
          <Grid item className={classes.buttonContainer}>
            <Button className={classes.okButton} onClick={handleOk}>
              {intl.formatMessage({
                id: 'roles.save'
              })}
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};

export default injectIntl(withStyles(styles)(UserRolesMenu));
