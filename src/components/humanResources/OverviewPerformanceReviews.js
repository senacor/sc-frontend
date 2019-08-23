import React, { useContext, useEffect, useState } from 'react';
import PerformanceReviewTable from './PerformanceReviewTable';
import { isHr } from '../../helper/checkRole';
import PerformanceReviewTableService from './PerformanceReviewTableService';
import Paper from '@material-ui/core/Paper/Paper';
import TableColumnSelectorMenu from '../humanResources/TableColumnSelectorMenu';
import Grid from '@material-ui/core/Grid/Grid';
import { injectIntl } from 'react-intl';
import { UserinfoContext, ErrorContext } from '../App';
import { getFilterPossibilities } from '../../actions/calls/filter';
import { fetchFilteredPrsForHumanResource } from '../../actions/calls/pr';
import CircularProgress from '@material-ui/core/CircularProgress';

export const OverviewPerformanceReviews = ({ intl }) => {
  const [filter, setFilter] = useState({});
  const [filterPossibilities, setFilterPossibilities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [columnsToView, setColumnsToView] = useState(null);
  const [data, setData] = useState([]);

  const { userroles } = useContext(UserinfoContext.context).value;
  let errorContext = useContext(ErrorContext.context);

  const fillDefaultLocalStorageColumns = () => {
    if (localStorage.getItem('columnsCheckedHr')) {
      return;
    }

    let defaultColumnsChecked = [];
    for (let i = 0; i < 14; i++) {
      // 14 = number of columns
      defaultColumnsChecked.push(true);
    }
    localStorage.setItem(
      'columnsCheckedHr',
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
    const columnsChecked = JSON.parse(localStorage.getItem('columnsCheckedHr'));
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

export default injectIntl(OverviewPerformanceReviews);
