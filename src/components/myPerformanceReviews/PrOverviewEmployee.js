import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import {
  getAllPrsForTable,
  getFilter,
  getFilterPossibilities,
  isLoadingAction
} from '../../reducers/selector';
import PerformanceReviewsTable from '../humanResources/PerformanceReviewsTable';
import RequestPerformanceReview from './RequestPerformanceReview';
import FILTER_GROUPS from '../humanResources/filterGroups';
import PerformanceReviewsTableService from '../humanResources/PerformanceReviewsTableService';
import { LoadingEvents } from '../../helper/loadingEvents';

export class PrOverviewEmployee extends React.Component {
  getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewsTableService(
      FILTER_GROUPS.EMPLOYEE,
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
      prTableService.finalState()
    ];
  };

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchFilteredPrs(this.props.filter, FILTER_GROUPS.EMPLOYEE);
    }
  }

  render() {
    if (!this.props.filterPossibilities.levels) {
      return null;
    }

    const columns = this.getColumnDefinitions();
    return (
      <div>
        <RequestPerformanceReview />
        <PerformanceReviewsTable
          columnDefinition={columns}
          orderBy={1}
          data={this.props.data}
        />
      </div>
    );
  }
}
export default connect(
  state => ({
    isLoading: isLoadingAction(state, [
      LoadingEvents.FILTER_POSSIBILITIES,
      LoadingEvents.FETCH_OWN_PRS
    ]),
    filterPossibilities: getFilterPossibilities(state),
    data: getAllPrsForTable(state),
    filter: getFilter(FILTER_GROUPS.EMPLOYEE)(state)
  }),
  {
    fetchFilteredPrs: actions.fetchFilteredPrs,
    getFilterPossibilities: actions.getFilterPossibilities
  }
)(
  withLoading(props => {
    props.getFilterPossibilities();
    props.fetchFilteredPrs(props.filter, FILTER_GROUPS.EMPLOYEE);
  })(PrOverviewEmployee)
);
