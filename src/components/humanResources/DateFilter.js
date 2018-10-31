import React, { Component } from 'react';
import * as actions from '../../actions';
import { getSubFilter } from '../../reducers/selector';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import TextField from '@material-ui/core/TextField/TextField';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Icon from '@material-ui/core/Icon/Icon';

export class DateFilter extends Component {
  constructor(props) {
    super(props);
    const filter = Object.assign(
      {},
      { searchString: '', values: '' },
      this.props.filter
    );

    this.state = {
      filter: filter,
      values: filter.values
    };
  }

  setFilter = values => {
    let searchString = Object.keys(values)
      .map(function(key) {
        return `${this.props.filterBy}${key}=${values[key]}`;
      }, this)
      .join('&');

    let filter = {
      searchString,
      values: values
    };
    let payload = {
      filterGroup: this.props.filterGroup,
      filterBy: this.props.filterBy,

      filter: filter
    };

    if (searchString === '') {
      this.props.deleteFilter(payload);
    } else {
      this.props.addFilter(payload);
    }
  };

  onChange = key => event => {
    let newValues = Object.assign({}, this.state.values, {
      [key]: event.target.value
    });
    if (newValues[key] === '') {
      delete newValues[key];
    }

    this.setState({ values: newValues });
  };

  execute = () => {
    this.setFilter(this.state.values);
    this.props.closeFilter();
  };

  render() {
    let { values } = this.state;
    return (
      <List>
        <ListItem>
          <TextField
            id="startDate"
            label="von"
            type="date"
            defaultValue={values.From}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.onChange('From')}
          />
          <TextField
            id="endDate"
            label="bis"
            type="date"
            defaultValue={values.To}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.onChange('To')}
          />
          <IconButton
            id="forwardButton"
            aria-label="forward"
            onClick={this.execute}
          >
            <Icon>forward</Icon>
          </IconButton>
        </ListItem>
      </List>
    );
  }
}

DateFilter.propTypes = {
  filterGroup: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired
};

export default connect(
  (state, props) => ({
    filter: getSubFilter(props.filterGroup, props.filterBy)(state)
  }),
  {
    addFilter: actions.addFilter,
    deleteFilter: actions.deleteFilter
  }
)(DateFilter);
