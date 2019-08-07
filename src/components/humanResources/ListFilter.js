import React, { useEffect, useState } from 'react';
import * as actions from '../../actions';
import { getSubFilter } from '../../reducers/selector';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import Divider from '@material-ui/core/Divider/Divider';
import Icon from '@material-ui/core/Icon/Icon';
import { Button } from '@material-ui/core';

export const ListFilter = props => {
  const defaultFilter = Object.assign(
    {},
    { searchString: '', values: '' },
    props.filter
  );
  const defaultChecked =
    defaultFilter.values === ''
      ? Object.keys(props.content)
      : defaultFilter.values;

  //const [filter, setFilter] = useState(defaultFilter);
  const [checked, setChecked] = useState(defaultChecked);
  const [isAllSelected, setIsAllSelected] = useState(
    defaultChecked.length === Object.keys(props.content).length
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
      checked.length === Object.keys(props.content).length ||
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
      newChecked = Object.keys(props.content);
    } else {
      newChecked = [];
    }
    setIsAllSelected(newAllSelect);
    setChecked(newChecked);

    const button = document.getElementById('filterButton');
    if (button) {
      button.focus();
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
      setChecked(Object.keys(props.content));
      setIsAllSelected(true);
    }

    const button = document.getElementById('filterButton');
    if (button) {
      button.focus();
    }
  };

  const applyFilter = () => {
    let searchString = `${props.filterBy}=`;
    searchString += checked
      .map(value => {
        return props.content[value];
      })
      .join(`&${props.filterBy}=`);

    let filter = {
      searchString,
      values: checked
    };
    let payload = {
      filterGroup: props.filterGroup,
      filterBy: props.filterBy,
      filter: filter
    };
    props.addFilter(payload);
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
    <List onKeyPress={handleKeyPress}>
      {showSelectAll()}
      <Divider />
      {Object.keys(props.content).map(showContent)}
      <Divider />
      <Button
        onClick={applyFilter}
        id={'filterButton'}
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

ListFilter.propTypes = {
  filterGroup: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
};

export default connect(
  (state, props) => ({
    filter: getSubFilter(props.filterGroup, props.filterBy)(state)
  }),
  {
    addFilter: actions.addFilter,
    deleteFilter: actions.deleteFilter
  }
)(ListFilter);
