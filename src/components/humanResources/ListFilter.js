import React, { Component } from 'react';
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
import {Button} from "@material-ui/core";

export class ListFilter extends Component {
  constructor(props) {
    super(props);

    const filter = Object.assign(
      {},
      { searchString: '', values: '' },
      this.props.filter
    );
    const checked =
      filter.values === '' ? Object.keys(props.content) : filter.values;
    this.state = {
      filter: filter,
      checked: checked,
      isAllSelected: checked.length === Object.keys(props.content).length
    };
  }

  isFilterSet = checked => {
    return !(checked.length === Object.keys(this.props.content).length ||
              checked.length === 0);
  };

  isFilterEmpty = checked => {
    return checked.length === 0;
  }

  handleToggleSelectAll = () => {
    const newAllSelect = !this.state.isAllSelected;
    let newChecked;

    if (newAllSelect === true) {
      newChecked = Object.keys(this.props.content);
    } else {
      newChecked = [];
    }
    this.setState({
      isAllSelected: newAllSelect,
      checked: newChecked
    });
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (this.isFilterSet(newChecked)) {
      // something is set in filter, but not everything
      this.setState({
        checked: newChecked,
        isAllSelected: false
      });
    } else if (this.isFilterEmpty(newChecked)) {
      // nothing is set in filter
      console.log('new', newChecked)
      this.setState({
        checked: newChecked,
        isAllSelected: false
      });
    } else {
      // everything is set in filter
      this.setState({
        checked: Object.keys(this.props.content),
        isAllSelected: true
      });
    }
  };

  setFilter = () => {
    let searchString = `${this.props.filterBy}=`;
    searchString += this.state.checked
      .map(value => {
        return this.props.content[value];
      })
      .join(`&${this.props.filterBy}=`);

    let filter = {
      searchString,
      values: this.state.checked
    };
    let payload = {
      filterGroup: this.props.filterGroup,
      filterBy: this.props.filterBy,

      filter: filter
    };
    this.props.addFilter(payload);
  };

  showSelectAll = () => {
    return (
      <ListItem
        key={'selectAll'}
        dense
        button
        onClick={this.handleToggleSelectAll}
      >
        <Checkbox
          id={'selectAll'}
          checked={this.state.isAllSelected}
          color={'primary'}
          checkedIcon={<Icon>check</Icon>}
          icon={<Icon />}
        />
        <ListItemText primary={'selectAll'} />
      </ListItem>
    );
  };
  showContent = value => {
    return (
      <ListItem key={value} dense button onClick={this.handleToggle(value)}>
        <Checkbox
          id={value}
          checked={this.state.checked.indexOf(value) !== -1}
          color={'primary'}
          checkedIcon={<Icon>check</Icon>}
          icon={<Icon />}
        />
        <ListItemText primary={value} />
      </ListItem>
    );
  };

  render() {
    return (
      <List>
        {this.showSelectAll()}
        <Divider />
        {Object.keys(this.props.content).map(this.showContent, this)}
        <Divider />
        <Button onClick={this.setFilter}
                style={{backgroundColor: '#06A781', float: 'right'}}
        >
          OK
        </Button>
      </List>

    );
  }
}

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
