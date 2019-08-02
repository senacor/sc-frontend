import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import Divider from '@material-ui/core/Divider/Divider';
import Icon from '@material-ui/core/Icon/Icon';
import { withStyles } from '@material-ui/core';

const styles = {
  list: {
    width: '100%',
    maxHeight: '300px'
  },
  densed: {
    padding: '0px'
  }
};

export const TableColumnSelector = ({ selectedContent, onChange, classes }) => {
  const getNumberOfSelectedContent = content => {
    let selectedItems = 0;
    content.forEach(entry => {
      if (entry.checked) {
        selectedItems = selectedItems + 1;
      }
    });
    return selectedItems;
  };

  const [selectedCont, setSelectedCont] = useState(selectedContent);
  const [selectedItems, setSelectedItems] = useState(
    getNumberOfSelectedContent(selectedCont)
  );

  const isAllSelected = () => {
    return selectedItems === selectedCont.length;
  };

  const handleToggleSelectAll = () => {
    if (isAllSelected()) {
      selectedCont.forEach(entry => {
        entry.checked = false;
      });
      setSelectedCont(selectedCont);
      setSelectedItems(0);
    } else {
      selectedCont.forEach(entry => {
        entry.checked = true;
      });
      setSelectedCont(selectedCont);
      setSelectedItems(selectedCont.length);
    }

    onChange(selectedCont);
  };

  const handleToggle = value => () => {
    const currentIndex = selectedCont.indexOf(value);

    if (value.checked === true) {
      selectedCont[currentIndex].checked = false;
      setSelectedItems(selectedItems - 1);
    } else {
      selectedCont[currentIndex].checked = true;
      setSelectedItems(selectedItems + 1);
    }
    // ??? //
    setSelectedCont(selectedCont);
    setSelectedItems(selectedItems);
    // ??? //
    onChange(selectedCont);
  };

  const showSelectAll = () => {
    return (
      <ListItem key={'selectAll'} dense button onClick={handleToggleSelectAll}>
        {
          <Checkbox
            className={classes.densed}
            id={'selectAll'}
            checked={isAllSelected()}
            color={'primary'}
            checkedIcon={<Icon>check</Icon>}
            icon={<Icon />}
          />
        }
        <ListItemText primary={'selectAll'} />
      </ListItem>
    );
  };

  const showContent = value => {
    return (
      <ListItem key={value.label} dense button onClick={handleToggle(value)}>
        <Checkbox
          className={classes.densed}
          id={value.label}
          checked={value.checked}
          color={'primary'}
          checkedIcon={<Icon>check</Icon>}
          icon={<Icon />}
        />
        <ListItemText primary={value.label} />
      </ListItem>
    );
  };

  return (
    <List className={classes.list}>
      {showSelectAll()}
      <Divider />
      {selectedCont.map(content => {
        return showContent(content);
      })}
    </List>
  );
};

TableColumnSelector.propTypes = {
  selectedContent: PropTypes.array.isRequired
};
export const StyledComponent = withStyles(styles)(TableColumnSelector);
export default StyledComponent;
