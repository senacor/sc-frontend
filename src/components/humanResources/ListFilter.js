import React, { Component } from 'react';
import * as actions from '../../actions';
import { getSubFilter } from '../../reducers/selector';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';

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

  clearFilter = () => {
    let payload = {
      filterGroup: this.props.filterGroup,
      filterBy: this.props.filterBy
    };
    this.props.deleteFilter(payload);
  };

  isFilterSet = checked => {
    return !(
      checked.length === Object.keys(this.props.content).length ||
      checked.length === 0
    );
  };

  handleToggleSelectAll = () => {
    this.clearFilter();
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
      this.setState({
        checked: newChecked,
        isAllSelected: false
      });
      this.setFilter(newChecked);
    } else {
      this.clearFilter();
      this.setState({
        checked: Object.keys(this.props.content),
        isAllSelected: true
      });
    }
  };

  setFilter = checked => {
    let searchString = `${this.props.filterBy}=`;
    searchString += checked
      .map(value => {
        return this.props.content[value];
      })
      .join(`&${this.props.filterBy}=`);

    let filter = {
      searchString,
      values: checked
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
      <ListItem key={'selectAll'} dense button>
        <Checkbox
          id={'selectAll'}
          onChange={this.handleToggleSelectAll}
          checked={this.state.isAllSelected}
          color={'primary'}
        />
        <ListItemText primary={'selectAll'} />
      </ListItem>
    );
  };
  showContent = value => {
    return (
      <ListItem key={value} dense button>
        <Checkbox
          id={value}
          onChange={this.handleToggle(value)}
          checked={this.state.checked.indexOf(value) !== -1}
          color={'primary'}
        />
        <ListItemText primary={value} />
      </ListItem>
    );
  };

  render() {
    return (
      <List>
        {this.showSelectAll()}
        {Object.keys(this.props.content).map(this.showContent, this)}
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
