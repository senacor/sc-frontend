import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getFilter } from '../../reducers/selector';
import PerformanceReviewTable from '../humanResources/PerformanceReviewTable';
import RequestPerformanceReview from './RequestPerformanceReview';
import FILTER_GROUPS from '../humanResources/filterGroups';
import PerformanceReviewTableService from '../humanResources/PerformanceReviewTableService';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';
import { injectIntl } from 'react-intl';
import { getFilterPossibilities } from '../../actions/calls/filter';
import { fetchFilteredPrs } from '../../actions/calls/pr';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  ...theme,
  paper: {
    margin: theme.spacing.unit * 3
  }
});

export const PrOverviewEmployee = props => {
  const [state, setState] = useState({
    columnsToView: null
  });

  const [filterPossibilities, setFilterPossibilities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const { classes } = props;

  useEffect(() => {
    getFilterPossibilities(setIsLoading, setFilterPossibilities);
  }, []);

  useEffect(
    () => {
      fetchFilteredPrs(
        props.filter,
        FILTER_GROUPS.EMPLOYEE,
        setData,
        setIsLoading
      );
    },
    [props.filter]
  );

  const getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewTableService(
      FILTER_GROUPS.EMPLOYEE,
      filterPossibilities
    );

    return [
      prTableService.employee(false),
      prTableService.deadline(),
      prTableService.occasion(props.intl),
      prTableService.projectCst(),
      prTableService.competence(props.intl),
      prTableService.level(),
      prTableService.supervisor(),
      prTableService.reviewer(),
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
    <Paper className={classes.paper}>
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
    filter: getFilter(FILTER_GROUPS.EMPLOYEE)(state)
  }))(withStyles(styles)(PrOverviewEmployee))
);
