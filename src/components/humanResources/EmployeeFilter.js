import React, { Component } from 'react';
import * as actions from '../../actions';
import EmployeeSearch from '../employeeSearch/EmployeeSearch';
import { getSubFilter } from '../../reducers/selector';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    }
  };

  render() {
    return (
      <EmployeeSearch
        employeeSearchValue={this.state.employeeName}
        selectEmployee={this.selectEmployee}
      />
    );
  }
}

EmployeeFilter.propTypes = {
  filterGroup: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired
};

export default connect(
  (state, props) => ({
    filter: getSubFilter(props.filterGroup, props.filterBy)(state)
  }),
  {
    addFilter: actions.addFilter
  }
)(EmployeeFilter);
