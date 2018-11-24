import React, { Component } from 'react';
import PerformanceReviewsTable from './PerformanceReviewsTable';
import { connect } from 'react-redux';
import {
  getAllPrsForTable,
  getFilter,
  getFilterPossibilities,
  isLoadingAction
} from '../../reducers/selector';
import * as actions from '../../actions';
import withLoading from '../hoc/Loading';
import FILTER_GROUPS from './filterGroups';
import { getUserroles } from '../../reducers/selector';
import { isHr } from '../../helper/checkRole';
import PerformanceReviewsTableService from './PerformanceReviewsTableService';
import { LoadingEvents } from '../../helper/loadingEvents';

export class OverviewPerformanceReviews extends Component {
  getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewsTableService(
      FILTER_GROUPS.HR,
      this.props.filterPossibilities
    );

    return [
      prTableService.employee(),
      prTableService.deadline(),
      prTableService.occasion(),
      prTableService.projectCst(),
      prTableService.competence(),
      prTableService.level(),
      prTableService.supervisor(),
      prTableService.reviewer(),
      prTableService.result(),
      prTableService.employeePreparation(),
      prTableService.reviewerPreparation(),
      prTableService.meeting(),
      prTableService.finalState(),
      prTableService.hrDone()
    ];
  };

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchFilteredPrsForHumanResource(this.props.filter);
    }
  }

  render() {
    if (!this.props.filterPossibilities.levels) {
      return null;
    }

    let columns = this.getColumnDefinitions();
    let isHrMember = isHr(this.props.userroles);
    return (
      <PerformanceReviewsTable
        columnDefinition={columns}
        orderBy={1}
        data={this.props.data}
        filter={this.props.filter}
        isHr={isHrMember}
      />
    );
  }
}

export default connect(
  state => ({
    data: getAllPrsForTable(state),
    filter: getFilter(FILTER_GROUPS.HR)(state),
    userroles: getUserroles(state),
    isLoading: isLoadingAction(state, [
      LoadingEvents.FILTER_POSSIBILITIES,
      LoadingEvents.FETCH_OWN_PRS
    ]),
    filterPossibilities: getFilterPossibilities(state)
  }),
  {
    fetchFilteredPrsForHumanResource: actions.fetchFilteredPrsForHumanResource,
    getFilterPossibilities: actions.getFilterPossibilities
  }
)(
  withLoading(props => {
    props.getFilterPossibilities();
    props.fetchFilteredPrsForHumanResource(props.filter);
  })(OverviewPerformanceReviews)
);
