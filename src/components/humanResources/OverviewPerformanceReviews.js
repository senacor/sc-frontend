import React, { useContext, useEffect, useState } from 'react';
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
import { isHr } from '../../helper/checkRole';
import PerformanceReviewTableService from './PerformanceReviewTableService';
import { LoadingEvents } from '../../helper/loadingEvents';
import Paper from '@material-ui/core/Paper/Paper';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';
import Grid from '@material-ui/core/Grid/Grid';
import { injectIntl } from 'react-intl';
import { UserinfoContext } from '../App';

export const OverviewPerformanceReviews = ({
  filterPossibilities,
  fetchFilteredPrsForHumanResource,
  filter,
  data,
  intl
}) => {
  const { userroles } = useContext(UserinfoContext.context).value;
  const [columnsToView, setColumnsToView] = useState(null);

  const getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewTableService(
      FILTER_GROUPS.HR,
      filterPossibilities
    );

    return [
      prTableService.employee(),
      prTableService.deadline(),
      prTableService.occasion(intl),
      prTableService.projectCst(),
      prTableService.competence(intl),
      prTableService.level(),
      prTableService.supervisor(),
      prTableService.reviewer(),
      prTableService.result(intl),
      prTableService.employeePreparation(intl),
      prTableService.reviewerPreparation(intl),
      prTableService.meeting(),
      prTableService.finalState(),
      prTableService.hrDone()
    ];
  };

  const getSelectorContent = () => {
    let columns = getColumnDefinitions();
    let result = [];
    columns.forEach(column => {
      result.push({ label: column.label, value: column });
    });
    return result;
  };

  const handleChange = content => {
    setColumnsToView(content);
  };

  useEffect(
    () => {
      fetchFilteredPrsForHumanResource(filter);
    },
    [filter]
  );

  if (!filterPossibilities.levels) {
    return null;
  }

  const columns = columnsToView ? columnsToView : getColumnDefinitions();
  let isHrMember = isHr(userroles);
  return (
    <Paper style={{ margin: '20px' }}>
      <Grid
        container
        direction={'row'}
        justify={'flex-end'}
        alignItems={'center'}
      >
        <Grid item>
          <TableColumnSelectorMenu
            onChange={handleChange}
            content={getSelectorContent()}
          />
        </Grid>
      </Grid>
      <PerformanceReviewTable
        columnDefinition={columns}
        orderBy={1}
        data={data}
        filter={filter}
        isHr={isHrMember}
      />
    </Paper>
  );
};

export default injectIntl(
  connect(
    state => ({
      data: getAllPrsForTable(state),
      filter: getFilter(FILTER_GROUPS.HR)(state),
      isLoading: isLoadingAction(state, [
        LoadingEvents.FILTER_POSSIBILITIES,
        LoadingEvents.FETCH_OWN_PRS
      ]),
      filterPossibilities: getFilterPossibilities(state)
    }),
    {
      fetchFilteredPrsForHumanResource:
        actions.fetchFilteredPrsForHumanResource,
      getFilterPossibilities: actions.getFilterPossibilities
    }
  )(
    withLoading(props => {
      props.getFilterPossibilities();
      props.fetchFilteredPrsForHumanResource(props.filter);
    })(OverviewPerformanceReviews)
  )
);
