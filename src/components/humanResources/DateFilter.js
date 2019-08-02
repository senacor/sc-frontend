import React, { useState } from 'react';
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
import { injectIntl } from 'react-intl';

let styles = {
  error: {
    font: 'small',
    color: '#ff0000'
  }
};

export const DateFilter = ({
  filter,
  filterBy,
  filterGroup,
  deleteFilter,
  addFilter,
  closeFilter,
  intl,
  classes
}) => {
  const defaultFilter = Object.assign(
    {},
    { searchString: '', values: '' },
    filter
  );

  const [values, setValues] = useState(defaultFilter.values);
  const [error, setError] = useState(false);

  const showError = () => {
    setError(true);
  };

  const isValidFilter = values => {
    return moment(values.From).isBefore(moment(values.To));
  };

  const setFilter = values => {
    let searchString = Object.keys(values)
      .map(key => {
        return `${filterBy}${key}=${values[key]}`;
      })
      .join('&');

    const filter = {
      searchString,
      values: values
    };
    const payload = {
      filterGroup: filterGroup,
      filterBy: filterBy,
      filter: filter
    };

    if (searchString === '') {
      deleteFilter(payload);
    } else if (!isValidFilter(values)) {
      return false;
    } else {
      addFilter(payload);
    }
    return true;
  };

  const onChange = key => event => {
    let newValues = Object.assign({}, values, {
      [key]: event.target.value
    });
    if (newValues[key] === '') {
      delete newValues[key];
    }

    setValues(newValues);
    setError(false);
  };

  const execute = () => {
    if (setFilter(values)) {
      closeFilter();
    } else {
      showError();
    }
  };

  return (
    <List>
      <ListItem>
        <TextField
          id="startDate"
          label={intl.formatMessage({
            id: 'datefilter.from'
          })}
          type="date"
          defaultValue={values.From}
          placeholder={'JJJJ-MM-TT'}
          InputLabelProps={{
            shrink: true
          }}
          onChange={onChange('From')}
        />
        <TextField
          id="endDate"
          label={intl.formatMessage({
            id: 'datefilter.to'
          })}
          type="date"
          defaultValue={values.To}
          placeholder={'JJJJ-MM-TT'}
          InputLabelProps={{
            shrink: true
          }}
          onChange={onChange('To')}
        />
        <IconButton
          id="forwardButton"
          aria-label={intl.formatMessage({
            id: 'datefilter.forward'
          })}
          onClick={execute}
        >
          <Icon>forward</Icon>
        </IconButton>
      </ListItem>
      <ListItem className={classes.error}>
        {error === true ? (
          <div>
            {intl.formatMessage({
              id: 'datefilter.invalid'
            })}
          </div>
        ) : null}
      </ListItem>
    </List>
  );
};

DateFilter.propTypes = {
  filterGroup: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired
};

export const StyledComponent = withStyles(styles)(DateFilter);
export default injectIntl(
  connect(
    (state, props) => ({
      filter: getSubFilter(props.filterGroup, props.filterBy)(state)
    }),
    {
      addFilter: actions.addFilter,
      deleteFilter: actions.deleteFilter
    }
  )(StyledComponent)
);
