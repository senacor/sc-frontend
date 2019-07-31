import React, { Component } from 'react';
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

export class EmployeeFilter extends Component {
  constructor(props) {
    super(props);

    let filter = Object.assign(
      {},
      { searchString: '', values: '' },
      this.props.filter
    );

    this.state = {
      employeeName: filter.values,
      filter: filter
    };
  }

  selectEmployee = employee => {
    if (employee) {
      let filter = {
        searchString: `${this.props.filterBy}=${employee.id}`,
        values: `${employee.firstName} ${employee.lastName}`
      };
      let payload = {
        filterGroup: this.props.filterGroup,
        filterBy: this.props.filterBy,
        filter: filter
      };
      this.props.addFilter(payload);
      this.props.closeFilter();
    }
  };

  onDelete = () => {
    let payload = {
      filterGroup: this.props.filterGroup,
      filterBy: this.props.filterBy
    };
    this.props.deleteFilter(payload);
    this.props.closeFilter();
  };

  render() {
    const { intl } = this.props;
    return (
      <EmployeeSearch
        employeeSearchValue={this.state.employeeName}
        selectEmployee={this.selectEmployee}
        inputElement={(value, onChange) => (
          <TextField
            id="outlined-adornment-filter"
            variant="outlined"
            label={intl.formatMessage({
              id: 'employeefilter.name'
            })}
            value={value}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Icon id="adornmentIcon" onClick={this.onDelete}>
                      clear
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
  }
}

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
