import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import PerformanceReviewTable from './PerformanceReviewTable';
import PerformanceReviewTableService from './PerformanceReviewTableService';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';
import { isHr } from '../../helper/checkRole';
import { UserinfoContext, ErrorContext } from '../App';
import { getFilterPossibilities } from '../../actions/calls/filter';
import { fetchFilteredPrsForHumanResource } from '../../actions/calls/pr';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  }
});

export const OverviewPerformanceReviews = ({ classes, intl }) => {
  const [filter, setFilter] = useState({});

  const [filterPossibilities, setFilterPossibilities] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { userroles } = useContext(UserinfoContext.context).value;
  const [columnsToView, setColumnsToView] = useState(null);
  const [data, setData] = useState([]);

  let errorContext = useContext(ErrorContext.context);

  const fillDefaultLocalStorageColumns = () => {
    if (localStorage.getItem('columnsChecked')) {
      return;
    }

    let defaultColumnsChecked = [];
    for (let i = 0; i < 14; i++) {
      // 14 = number of columns
      defaultColumnsChecked.push(true);
    }
    localStorage.setItem(
      'columnsChecked',
      JSON.stringify(defaultColumnsChecked)
    );
  };

  useEffect(() => {
    getFilterPossibilities(setIsLoading, setFilterPossibilities, errorContext);
    fillDefaultLocalStorageColumns();
  }, []);

  useEffect(
    () => {
      fetchFilteredPrsForHumanResource(
        filter,
        setData,
        setIsLoading,
        errorContext
      );
    },
    [filter]
  );

  const getColumnDefinitions = () => {
    const prTableService = new PerformanceReviewTableService(
      filterPossibilities,
      filter,
      setFilter
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

  const getColumnsFromLocalStorage = () => {
    const columnsChecked = JSON.parse(localStorage.getItem('columnsChecked'));
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

  if (isLoading && !filterPossibilities.levels) {
    return <CircularProgress />;
  }

  if (!filterPossibilities.levels) {
    return <CircularProgress />;
  }

  let columns = columnsToView ? columnsToView : getColumnsFromLocalStorage();
  if (columns.length === 0) {
    columns = getColumnDefinitions();
  }
  let isHrMember = isHr(userroles);

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
          />
        </Grid>
      </Grid>
      <PerformanceReviewTable
        isLoading={isLoading}
        columnDefinition={columns}
        orderBy={0}
        data={data}
        filter={filter}
        isHr={isHrMember}
      />
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(OverviewPerformanceReviews));
