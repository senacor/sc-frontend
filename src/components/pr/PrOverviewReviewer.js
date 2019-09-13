import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getFilterPossibilities } from '../../actions/calls/filter';
import { UserinfoContext, ErrorContext } from '../App';
import { fetchFilteredPrsToReview } from '../../actions/calls/pr';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';
import PerformanceReviewTable from '../humanResources/PerformanceReviewTable';
import FILTER_GROUPS from '../humanResources/filterGroups';
import PerformanceReviewTableService from '../humanResources/PerformanceReviewTableService';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  }
});

const PrOverviewReviewer = props => {
  const { classes } = props;
  const [filter, setFilter] = useState({});
  const [columnsToView, setColumnsToView] = useState(null);
  const [filterPossibilities, setFilterPossibilities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const { userinfo } = useContext(UserinfoContext.context).value;
  const { username } = userinfo;

  let errorContext = useContext(ErrorContext.context);

  const fillDefaultLocalStorageColumns = () => {
    if (localStorage.getItem('columnsCheckedProcessing')) {
      return;
    }

    let defaultColumnsChecked = [];
    for (let i = 0; i < 13; i++) {
      // 13 = number of columns
      defaultColumnsChecked.push(true);
    }
    localStorage.setItem(
      'columnsCheckedProcessing',
      JSON.stringify(defaultColumnsChecked)
    );
  };

  useEffect(() => {
    getFilterPossibilities(setIsLoading, setFilterPossibilities, errorContext);
    fillDefaultLocalStorageColumns();
  }, []);

  const loadFilteredPrs = () => {
    fetchFilteredPrsToReview(filter, setData, setIsLoading, errorContext);
  };

  useEffect(loadFilteredPrs, [filter]);

  const getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewTableService(
      filterPossibilities,
      filter,
      setFilter
    );

    return [
      prTableService.employee(),
      prTableService.deadline(),
      prTableService.occasion(props.intl),
      prTableService.projectCst(),
      prTableService.competence(props.intl),
      prTableService.level(),
      prTableService.supervisor(),
      prTableService.reviewer(username, loadFilteredPrs),
      prTableService.result(props.intl),
      prTableService.employeePreparation(props.intl),
      prTableService.reviewerPreparation(props.intl),
      prTableService.meeting(),
      prTableService.finalState()
    ];
  };

  const getColumnsFromLocalStorage = () => {
    const columnsChecked = JSON.parse(
      localStorage.getItem('columnsCheckedProcessing')
    );
    const allColumns = getColumnDefinitions();

    let result = [];
    columnsChecked.forEach((column, index) => {
      if (column) {
        result.push(allColumns[index]);
      }
    });
    return result;
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

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!filterPossibilities.levels) {
    return null;
  }

  let columns = columnsToView ? columnsToView : getColumnsFromLocalStorage();
  if (columns.length === 0) {
    columns = getColumnDefinitions();
  }
  return (
    <Paper className={classes.spacing}>
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
            tab={'PRS_FOR_PROCESSING'}
          />
        </Grid>
      </Grid>
      <PerformanceReviewTable
        columnDefinition={columns}
        orderBy={0}
        data={data}
      />
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(PrOverviewReviewer));
