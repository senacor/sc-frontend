import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Grid, IconButton, List, Popover, withStyles } from '@material-ui/core';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const UserRolesMenu = classes => {
  const getRoles = () => {
    return ['Admin', 'Consulting', 'Developer', 'Personal development', 'Supervisor', 'Other'];
  };

  const [selectedRoles, setSelectedRoles] = useState(getRoles());
  const [anchorEl, setAnchorEl] = useState(null);

  const getNumberOfSelectedRoles = roles => {
    let selectedRoles = 0;
    roles.forEach(role => {
      if (role.checked) {
        selectedRoles = selectedRoles + 1;
      }
    });
    return selectedRoles;
  };

  let numberOfSelectedRoles = getNumberOfSelectedRoles(selectedRoles);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = entry => {

  };

  const showContent = entry => {
    return (
      <div>
        <ListItem key={entry} dense button onClick={handleToggle(entry)}>
          <Checkbox
            // className={classes.densed}
            style={{padding: 0}}
            id={entry}
            color={'primary'}
            checkedIcon={<Icon>check</Icon>}
            icon={<Icon />}
          />
          <ListItemText primary={entry} />
        </ListItem>
      </div>
    )
  };

  //TODO: styles not working with className ???

  return (
    <div>
      <IconButton onClick={handleClick}><SupervisedUserCircle /></IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Grid container>
          <Grid item xs={12}>
          <List>
            {getRoles().map(entry => {
              return showContent(entry);
            })}
          </List>
          </Grid>
          <Grid item xs={9} />
          <Grid item xs={3}>
          <Button>
            OK
          </Button>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};

export default injectIntl(UserRolesMenu);
