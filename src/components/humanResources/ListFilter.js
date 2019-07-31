import React, { useState } from 'react';
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

export const ListFilter = props => {
  const defaultFilter = Object.assign(
    {},
    { searchString: '', values: '' },
    props.filter
  );
  const [checked, setChecked] = useState(
    defaultFilter.values === ''
      ? Object.keys(props.content)
      : defaultFilter.values
  );
  const [isAllSelected, setIsAllSelected] = useState(
    checked.length === Object.keys(props.content).length
  );

  const clearFilter = () => {
    const payload = {
      filterGroup: props.filterGroup,
      filterBy: props.filterBy
    };
    props.deleteFilter(payload);
  };

  const isFilterSet = checked => {
    return !(
      checked.length === Object.keys(props.content).length ||
      checked.length === 0
    );
  };

  const handleToggleSelectAll = () => {
    clearFilter();
    const newAllSelect = !isAllSelected;
    let newChecked;

    if (newAllSelect === true) {
      newChecked = Object.keys(props.content);
    } else {
      newChecked = [];
    }

    setChecked(newChecked);
    setIsAllSelected(newAllSelect);
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
      setChecked(newChecked);
      setIsAllSelected(false);
      setFilter(newChecked);
    } else {
      clearFilter();
      setChecked(Object.keys(props.content));
      setIsAllSelected(true);
    }
  };

  const setFilter = checked => {
    let searchString = `${props.filterBy}=`;
    searchString += checked
      .map(value => {
        return props.content[value];
      })
      .join(`&${props.filterBy}=`);

    const filter = {
      searchString,
      values: checked
    };
    const payload = {
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
    <List>
      {showSelectAll()}
      <Divider />
      {Object.keys(props.content).map(showContent)}
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
