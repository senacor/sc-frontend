import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {
  getAllPrsForTable,
  getFilter,
  getUserPrincipalName,
  getFilterPossibilities
} from '../../reducers/selector';
import PerformanceReviewTable from '../humanResources/PerformanceReviewTable';
import FILTER_GROUPS from '../humanResources/filterGroups';
import { LoadingEvents } from '../../helper/loadingEvents';
import PerformanceReviewTableService from '../humanResources/PerformanceReviewTableService';
import withLoadingAction from '../hoc/LoadingWithAction';

export class PrOverviewReviewer extends React.Component {
  getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewTableService(
      FILTER_GROUPS.REVIEWER,
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
      prTableService.reviewer(this.props.username),
      prTableService.result(),
      prTableService.employeePreparation(),
      prTableService.reviewerPreparation(),
      prTableService.meeting(),
      prTableService.finalState()
    ];
  };

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchFilteredPrs(this.props.filter, FILTER_GROUPS.REVIEWER);
    }
  }
  render() {
    if (!this.props.filterPossibilities.levels) {
      return null;
    }
    const columns = this.getColumnDefinitions();
    return (
      <PerformanceReviewTable
        columnDefinition={columns}
        orderBy={1}
        data={this.props.data}
      />
    );
  }
}

export default connect(
  state => ({
    data: getAllPrsForTable(state),
    username: getUserPrincipalName(state),
    filter: getFilter(FILTER_GROUPS.REVIEWER)(state),
    filterPossibilities: getFilterPossibilities(state)
  }),
  {
    fetchFilteredPrs: actions.fetchFilteredPrs,
    getFilterPossibilities: actions.getFilterPossibilities
  }
)(
  withLoadingAction(props => {
    props.getFilterPossibilities();
    props.fetchFilteredPrs(props.filter, FILTER_GROUPS.REVIEWER);
  })([LoadingEvents.FETCH_OWN_PRS, LoadingEvents.FILTER_POSSIBILITIES])(
    PrOverviewReviewer
  )
);
