import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import TextField from '@material-ui/core/TextField/TextField';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Icon from '@material-ui/core/Icon/Icon';
import { withStyles } from '@material-ui/core';

import cloneDeep from '../../helper/cloneDeep';

let styles = theme => ({
  error: {
    font: 'small',
    color: theme.palette.secondary.darkRed
  }
});

export const DateFilter = ({
  filter,
  setFilter,
  filterBy,
  closeFilter,
  intl,
  classes
}) => {
  const defaultFilter = Object.assign(
    {},
    { searchString: '', values: '' },
    filter[filterBy]
  );

  const [values, setValues] = useState(defaultFilter.values);
  const [error, setError] = useState(false);

  const showError = () => {
    setError(true);
  };

  const isValidFilter = values => {
    return moment(values.From).isBefore(moment(values.To));
  };

  const applyFilter = values => {
    let searchString = Object.keys(values)
      .map(key => {
        return `${filterBy}${key}=${values[key]}`;
      })
      .join('&');

    const newFilter = cloneDeep(filter);
    newFilter[filterBy] = {
      searchString,
      values: values
    };

    if (searchString === '') {
      delete newFilter[filterBy];
      setFilter(newFilter);
    } else if (!isValidFilter(values)) {
      return false;
    } else {
      setFilter(newFilter);
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
    if (applyFilter(values)) {
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

export default injectIntl(withStyles(styles)(DateFilter));
