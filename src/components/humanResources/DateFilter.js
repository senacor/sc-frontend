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
import moment from 'moment';
import { withStyles } from '@material-ui/core';

let styles = {
  error: {
    font: 'small',
    color: '#ff0000'
  }
};

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
      values: filter.values,
      error: false
    };
  }

  showError = () => {
    this.setState({ error: true });
  };

  isValidFilter = values => {
    return moment(values.From).isBefore(moment(values.To));
  };

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
    } else if (!this.isValidFilter(values)) {
      return false;
    } else {
      this.props.addFilter(payload);
    }
    return true;
  };

  onChange = key => event => {
    let newValues = Object.assign({}, this.state.values, {
      [key]: event.target.value
    });
    if (newValues[key] === '') {
      delete newValues[key];
    }

    this.setState({ values: newValues, error: false });
  };

  execute = () => {
    if (this.setFilter(this.state.values)) {
      this.props.closeFilter();
    } else {
      this.showError();
    }
  };

  render() {
    const { classes } = this.props;
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
        <ListItem className={classes.error}>
          {this.state.error === true ? (
            <div>Falsche Eingabe: von nach bis</div>
          ) : null}
        </ListItem>
      </List>
    );
  }
}

DateFilter.propTypes = {
  filterGroup: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired
};

export const StyledComponent = withStyles(styles)(DateFilter);
export default connect(
  (state, props) => ({
    filter: getSubFilter(props.filterGroup, props.filterBy)(state)
  }),
  {
    addFilter: actions.addFilter,
    deleteFilter: actions.deleteFilter
  }
)(StyledComponent);
