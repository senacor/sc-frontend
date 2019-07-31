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

export const TableColumnSelector = props => {
  const getNumberOfSelectedContent = content => {
    let selectedItems = 0;
    content.forEach(entry => {
      if (entry.checked) {
        selectedItems = selectedItems + 1;
      }
    });
    return selectedItems;
  };

  const [selectedContent, setSelectedContent] = useState(props.selectedContent);
  const [selectedItems, setSelectedItems] = useState(
    getNumberOfSelectedContent(props.selectedContent)
  );

  const isAllSelected = () => {
    return selectedItems === selectedContent.length;
  };

  const handleToggleSelectAll = () => {
    if (isAllSelected()) {
      selectedContent.forEach(entry => {
        entry.checked = false;
      });
      setSelectedContent(selectedContent);
      setSelectedItems(0);
    } else {
      selectedContent.forEach(entry => {
        entry.checked = true;
      });
      setSelectedContent(selectedContent);
      setSelectedItems(selectedContent.length);
    }

    props.onChange(selectedContent);
  };

  const handleToggle = value => () => {
    const currentIndex = selectedContent.indexOf(value);

    if (value.checked === true) {
      selectedContent[currentIndex].checked = false;
      setSelectedItems(selectedItems - 1);
    } else {
      selectedContent[currentIndex].checked = true;
      setSelectedItems(selectedItems + 1);
    }
    // ??? //
    setSelectedContent(selectedContent);
    setSelectedItems(selectedItems);
    // ??? //
    props.onChange(selectedContent);
  };

  const showSelectAll = () => {
    return (
      <ListItem key={'selectAll'} dense button onClick={handleToggleSelectAll}>
        {
          <Checkbox
            className={props.classes.densed}
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
          className={props.classes.densed}
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
    <List className={props.classes.list}>
      {showSelectAll()}
      <Divider />
      {props.selectedContent.map(content => {
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
