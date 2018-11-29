import React, { Component } from 'react';
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
  }
};

export class TableColumnSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedContent: props.selectedContent,
      selectedItems: this.getNumberOfSelectedContent(props.selectedContent)
    };
  }

  getNumberOfSelectedContent = content => {
    let selectedItems = 0;
    content.forEach(entry => {
      if (entry.checked) {
        selectedItems = selectedItems + 1;
      }
    });
    return selectedItems;
  };

  isAllSelected = () => {
    return this.state.selectedItems === this.state.selectedContent.length;
  };

  handleToggleSelectAll = () => {
    let { selectedContent } = this.state;
    if (this.isAllSelected()) {
      selectedContent.forEach(entry => {
        entry.checked = false;
      });
      this.setState({
        selectedContent: selectedContent,
        selectedItems: 0
      });
    } else {
      selectedContent.forEach(entry => {
        entry.checked = true;
      });

      this.setState({
        selectedContent: selectedContent,
        selectedItems: selectedContent.length
      });
    }

    this.props.onChange(selectedContent);
  };

  handleToggle = value => () => {
    let { selectedContent, selectedItems } = this.state;
    const currentIndex = selectedContent.indexOf(value);

    if (value.checked === true) {
      selectedContent[currentIndex].checked = false;
      selectedItems = selectedItems - 1;
    } else {
      selectedContent[currentIndex].checked = true;
      selectedItems = selectedItems + 1;
    }
    this.setState({
      selectedContent: selectedContent,
      selectedItems: selectedItems
    });
    this.props.onChange(selectedContent);
  };

  showSelectAll = () => {
    return (
      <ListItem
        key={'selectAll'}
        dense
        button
        onClick={this.handleToggleSelectAll}
      >
        {
          <Checkbox
            id={'selectAll'}
            checked={this.isAllSelected()}
            color={'primary'}
            checkedIcon={<Icon>check</Icon>}
            icon={<Icon />}
          />
        }
        <ListItemText primary={'selectAll'} />
      </ListItem>
    );
  };
  showContent = value => {
    return (
      <ListItem
        key={value.label}
        dense
        button
        onClick={this.handleToggle(value)}
      >
        <Checkbox
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

  render() {
    const { classes, selectedContent } = this.props;
    return (
      <List className={classes.list}>
        {this.showSelectAll()}
        <Divider />
        {selectedContent.map(content => {
          return this.showContent(content);
        })}
      </List>
    );
  }
}

TableColumnSelector.propTypes = {
  selectedContent: PropTypes.array.isRequired
};
export const StyledComponent = withStyles(styles)(TableColumnSelector);
export default StyledComponent;
