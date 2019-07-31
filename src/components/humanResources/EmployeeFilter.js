import React from 'react';
import * as actions from '../../actions';
import EmployeeSearch from '../employeeSearch/EmployeeSearch';
import { getSubFilter } from '../../reducers/selector';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField/TextField';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import { injectIntl } from 'react-intl';

export const EmployeeFilter = props => {
  const defaultFilter = Object.assign(
    {},
    { searchString: '', values: '' },
    props.filter
  );
  const employeeName = defaultFilter.values;

  const selectEmployee = employee => {
    if (employee) {
      let filter = {
        searchString: `${props.filterBy}=${employee.id}`,
        values: `${employee.firstName} ${employee.lastName}`
      };
      let payload = {
        filterGroup: props.filterGroup,
        filterBy: props.filterBy,
        filter: filter
      };
      props.addFilter(payload);
      props.closeFilter();
    }
  };

  const onDelete = () => {
    let payload = {
      filterGroup: props.filterGroup,
      filterBy: props.filterBy
    };
    props.deleteFilter(payload);
    props.closeFilter();
  };

  return (
    <EmployeeSearch
      employeeSearchValue={employeeName}
      selectEmployee={selectEmployee}
      inputElement={(value, onChange) => (
        <TextField
          id="outlined-adornment-filter"
          variant="outlined"
          label={props.intl.formatMessage({
            id: 'employeefilter.name'
          })}
          value={value}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Icon id="adornmentIcon" onClick={onDelete}>
                    {props.intl.formatMessage({
                      id: 'employeefilter.delete'
                    })}
                  </Icon>
                </IconButton>
              </InputAdornment>
            ),
            name: 'employeeSearchValue'
          }}
        />
      )}
    />
  );
};

EmployeeFilter.propTypes = {
  filterGroup: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired
};

export default injectIntl(
  connect(
    (state, props) => ({
      filter: getSubFilter(props.filterGroup, props.filterBy)(state)
    }),
    {
      addFilter: actions.addFilter,
      deleteFilter: actions.deleteFilter
    }
  )(EmployeeFilter)
);
