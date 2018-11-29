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
import Paper from '@material-ui/core/Paper/Paper';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';

export class PrOverviewReviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsToView: null
    };
  }

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

  getSelectorContent = () => {
    let columns = this.getColumnDefinitions();
    let result = [];

    columns.forEach(column => {
      result.push({ label: column.label, value: column });
    });

    return result;
  };

  handleChange = content => {
    this.setState({ columnsToView: content });
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
    const { columnsToView } = this.state;
    const columns = columnsToView ? columnsToView : this.getColumnDefinitions();
    return (
      <Paper>
        <TableColumnSelectorMenu
          onChange={this.handleChange}
          content={this.getSelectorContent()}
        />
        <PerformanceReviewTable
          columnDefinition={columns}
          orderBy={1}
          data={this.props.data}
        />
      </Paper>
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
