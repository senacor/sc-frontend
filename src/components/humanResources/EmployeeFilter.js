import React, { Component } from 'react';
import * as actions from '../../actions';
import EmployeeSearch from '../employeeSearch/EmployeeSearch';
import { getFilter } from '../../reducers/selector';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EmployeeFilter extends Component {
  constructor(props) {
    super(props);

    let filter;
    let emptyFilter = {
      [this.props.filterBy]: { searchString: '', values: '' }
    };
    if (!this.props.filter || !this.props.filter[this.props.filterGroup]) {
      filter = emptyFilter;
    } else {
      filter = Object.assign(
        {},
        emptyFilter,
        this.props.filter[this.props.filterGroup]
      );
    }

    this.state = {
      employeeName: filter[this.props.filterBy].values,
      filter: filter
    };
  }

  selectEmployee = employee => {
    if (employee) {
      let filter = this.state.filter;
      filter[this.props.filterBy] = {
        searchString: `${this.props.filterBy}=${employee.id}`,
        values: `${employee.firstName} ${employee.lastName}`
      };
      let payload = {
        filterGroup: this.props.filterGroup,
        filter: filter
      };
      this.props.fetchFilteredPrsForHumanResource(payload);
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
  state => ({
    filter: getFilter(state)
  }),
  {
    fetchFilteredPrsForHumanResource: actions.fetchFilteredPrsForHumanResource
  }
)(EmployeeFilter);
