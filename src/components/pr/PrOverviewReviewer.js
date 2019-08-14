import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getFilter } from '../../reducers/selector';
import PerformanceReviewTable from '../humanResources/PerformanceReviewTable';
import FILTER_GROUPS from '../humanResources/filterGroups';
import PerformanceReviewTableService from '../humanResources/PerformanceReviewTableService';
import Paper from '@material-ui/core/Paper/Paper';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';
import Grid from '@material-ui/core/Grid/Grid';
import { injectIntl } from 'react-intl';
import { UserinfoContext } from '../App';
import { fetchFilteredPrs } from '../../actions/calls/pr';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getFilterPossibilities } from '../../actions/calls/filter';

export const PrOverviewReviewer = props => {
  const [state, setState] = useState({
    columnsToView: null
  });

  const [filterPossibilities, setFilterPossibilities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const { userinfo } = useContext(UserinfoContext.context).value;
  const { username } = userinfo;

  useEffect(
    () => {
      fetchFilteredPrs(
        props.filter,
        FILTER_GROUPS.REVIEWER,
        setData,
        setIsLoading
      );
    },
    [props.filter]
  );

  useEffect(() => {
    getFilterPossibilities(setIsLoading, setFilterPossibilities);
  }, []);

  const getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewTableService(
      FILTER_GROUPS.REVIEWER,
      filterPossibilities
    );

    return [
      prTableService.employee(),
      prTableService.deadline(),
      prTableService.occasion(props.intl),
      prTableService.projectCst(),
      prTableService.competence(props.intl),
      prTableService.level(),
      prTableService.supervisor(),
      prTableService.reviewer(username),
      prTableService.result(props.intl),
      prTableService.employeePreparation(props.intl),
      prTableService.reviewerPreparation(props.intl),
      prTableService.meeting(),
      prTableService.finalState()
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
    setState({ columnsToView: content });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!filterPossibilities.levels) {
    return null;
  }

  const { columnsToView } = state;
  const columns = columnsToView ? columnsToView : getColumnDefinitions();
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
            onChange={handleChange}
            content={getSelectorContent()}
          />
        </Grid>
      </Grid>
      <PerformanceReviewTable
        columnDefinition={columns}
        orderBy={1}
        data={data}
      />
    </Paper>
  );
};

export default injectIntl(
  connect(state => ({
    filter: getFilter(FILTER_GROUPS.REVIEWER)(state)
  }))(PrOverviewReviewer)
);
