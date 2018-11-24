import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {
  getAllPrsForTable,
  getFilter,
  getUserPrincipalName,
  getFilterPossibilities
} from '../../reducers/selector';
import PerformanceReviewsTable from '../humanResources/PerformanceReviewsTable';
import TABLE_PRS_ELEMENTS from './tablePrsElements';
import FILTER_GROUPS from '../humanResources/filterGroups';
import { LoadingEvents } from '../../helper/loadingEvents';
import PerformanceReviewsTableService from '../humanResources/PerformanceReviewsTableService';
import withLoadingAction from '../hoc/LoadingWithAction';

export class PrOverviewReviewer extends React.Component {
  getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewsTableService(
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

  prAlreadyDelegated = pr => {
    return pr.supervisor.login !== pr.reviewer.login;
  };

  prDelegable = pr => {
    return (
      pr.supervisor.login === this.props.username &&
      pr[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] === false
    );
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
      <PerformanceReviewsTable
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
