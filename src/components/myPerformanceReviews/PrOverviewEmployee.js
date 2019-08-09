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
import PerformanceReviewTable from '../humanResources/PerformanceReviewTable';
import RequestPerformanceReview from './RequestPerformanceReview';
import FILTER_GROUPS from '../humanResources/filterGroups';
import PerformanceReviewTableService from '../humanResources/PerformanceReviewTableService';
import { LoadingEvents } from '../../helper/loadingEvents';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';
import { injectIntl } from 'react-intl';

export class PrOverviewEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsToView: null
    };
  }

  getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewTableService(
      FILTER_GROUPS.EMPLOYEE,
      this.props.filterPossibilities
    );

    return [
      prTableService.employee(false),
      prTableService.deadline(),
      prTableService.occasion(this.props.intl),
      prTableService.projectCst(),
      prTableService.competence(this.props.intl),
      prTableService.level(),
      prTableService.supervisor(),
      prTableService.reviewer(),
      prTableService.result(this.props.intl),
      prTableService.employeePreparation(this.props.intl),
      prTableService.reviewerPreparation(this.props.intl),
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
      this.props.fetchFilteredPrs(this.props.filter, FILTER_GROUPS.EMPLOYEE);
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
        <Grid
          container
          direction={'row'}
          justify={'flex-end'}
          alignItems={'center'}
        >
          <Grid item>
            <RequestPerformanceReview />
          </Grid>
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
        />
      </Paper>
    );
  }
}
export default injectIntl(
  connect(
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
  )
);
