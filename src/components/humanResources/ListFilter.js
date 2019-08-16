import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import cloneDeep from '../../helper/cloneDeep';

export const ListFilter = ({ setFilter, filterBy, content, filter, closeFilter }) => {
  const defaultFilter = Object.assign(
    {},
    { searchString: '', values: '' },
    filter[filterBy]
  );
  const defaultChecked =
    defaultFilter.values === '' ? Object.keys(content) : defaultFilter.values;

  const [checked, setChecked] = useState(defaultChecked);
  const [isAllSelected, setIsAllSelected] = useState(
    defaultChecked.length === Object.keys(content).length
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      applyFilter();
    }
  };

  const isFilterSet = checked => {
    return !(
      checked.length === Object.keys(content).length ||
      isFilterEmpty(checked)
    );
  };

  const isFilterEmpty = checked => {
    return checked.length === 0;
  };

  const handleToggleSelectAll = () => {
    const newAllSelect = !isAllSelected;
    let newChecked;

    if (newAllSelect === true) {
      newChecked = Object.keys(content);
    } else {
      newChecked = [];
    }
    setIsAllSelected(newAllSelect);
    setChecked(newChecked);

    const filterList = document.getElementById('filterList');
    if (filterList) {
      filterList.focus();
    }
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (isFilterSet(newChecked)) {
      // something is set in filter, but not everything
      setChecked(newChecked);
      setIsAllSelected(false);
    } else if (isFilterEmpty(newChecked)) {
      // nothing is set in filter
      setChecked(newChecked);
      setIsAllSelected(false);
    } else {
      // everything is set in filter
      setChecked(Object.keys(content));
      setIsAllSelected(true);
    }

    const filterList = document.getElementById('filterList');
    if (filterList) {
      filterList.focus();
    }
  };

  const applyFilter = () => {
    let searchString = `${filterBy}=`;
    searchString += checked
      .map(value => {
        return content[value];
      })
      .join(`&${filterBy}=`);

    const newFilter = cloneDeep(filter);
    newFilter[filterBy] = {
      searchString,
      values: checked
    };
    setFilter(newFilter);
    closeFilter();
  };

  const showSelectAll = () => {
    return (
      <ListItem key={'selectAll'} dense button onClick={handleToggleSelectAll}>
        <Checkbox
          id={'selectAll'}
          checked={isAllSelected}
          color={'primary'}
          checkedIcon={<Icon>check</Icon>}
          icon={<Icon />}
        />
        <ListItemText primary={'selectAll'} />
      </ListItem>
    );
  };

  const showContent = value => {
    return (
      <ListItem key={value} dense button onClick={handleToggle(value)}>
        <Checkbox
          id={value}
          checked={checked.indexOf(value) !== -1}
          color={'primary'}
          checkedIcon={<Icon>check</Icon>}
          icon={<Icon />}
        />
        <ListItemText primary={value} />
      </ListItem>
    );
  };

  return (
    <List id={'filterList'} onKeyPress={handleKeyPress}>
      {showSelectAll()}
      <Divider />
      {Object.keys(content).map(showContent)}
      <Divider />
      <Button
        onClick={applyFilter}
        style={{
          backgroundColor: '#26646D',
          color: '#FFFFFF',
          float: 'right'
        }}
      >
        OK
      </Button>
    </List>
  );
};
