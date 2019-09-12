import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Grid, IconButton, List, Popover } from '@material-ui/core';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { setRoles } from '../../actions/calls/role';
import { ErrorContext } from '../App';

const UserRolesMenu = props => {
  const [selectedRoles, setSelectedRoles] = useState(props.selectedRoles);
  const [anchorEl, setAnchorEl] = useState(null);

  let errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    setSelectedRoles(props.selectedRoles)
  }, [props.selectedRoles]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = role => {
    if (selectedRoles.includes(role.name)) {
      // unassigning role
      const selectedRolesWithoutParamRole = selectedRoles.filter(r => r !== role.name);
      setSelectedRoles(selectedRolesWithoutParamRole);
    } else {
      // assigning role
      setSelectedRoles([...selectedRoles, role.name]);
    }
  };

  const showContent = role => {
    return (
      <div>
        <ListItem key={role.id} dense button onClick={() => {handleToggle(role)}}>
          <Checkbox
            // className={classes.densed}
            style={{padding: 0}}
            id={role.id}
            checked={selectedRoles.includes(role.name)}
            color={'primary'}
            checkedIcon={<Icon>check</Icon>}
            icon={<Icon />}
          />
          <ListItemText primary={role.name} />
        </ListItem>
      </div>
    )
  };

  const handleOk = () => {
    setRoles(props.employeeId, selectedRoles, errorContext);
    props.updateEmployee(props.employeeId, selectedRoles);
    handleClose();
  };

  //TODO: styles not working with className ???

  return (
    <div>
      <IconButton onClick={handleClick}><SupervisedUserCircle /></IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {handleClose()}}
      >
        <Grid container>
          <Grid item xs={12}>
            <List>
              {props.allRoles.map(role => {
                return showContent(role);
              })}
            </List>
          </Grid>
          <Grid item xs={9} />
          <Grid item xs={3}>
            <Button onClick={handleOk}>
              OK
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};

export default injectIntl(UserRolesMenu);
