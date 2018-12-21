import React, { Component } from 'react';
import PerformanceReviewTable from './PerformanceReviewTable';
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
import PerformanceReviewTableService from './PerformanceReviewTableService';
import { LoadingEvents } from '../../helper/loadingEvents';
import Paper from '@material-ui/core/Paper/Paper';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';
import Grid from '@material-ui/core/Grid/Grid';

export class OverviewPerformanceReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsToView: null
    };
  }

  getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewTableService(
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
      this.props.fetchFilteredPrsForHumanResource(this.props.filter);
    }
  }

  render() {
    if (!this.props.filterPossibilities.levels) {
      return null;
    }

    const { columnsToView } = this.state;
    const columns = columnsToView ? columnsToView : this.getColumnDefinitions();

    let isHrMember = isHr(this.props.userroles);
    return (
      <Paper>
        <Grid
          container
          direction={'row'}
          justify={'flex-end'}
          alignItems={'center'}
        >
          <Grid item>
            <TableColumnSelectorMenu
              onChange={this.handleChange}
              content={this.getSelectorContent()}
            />
          </Grid>
        </Grid>
        <PerformanceReviewTable
          columnDefinition={columns}
          orderBy={1}
          data={this.props.data}
          filter={this.props.filter}
          isHr={isHrMember}
        />
      </Paper>
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
