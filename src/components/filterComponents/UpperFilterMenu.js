import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Paper, Button, Typography } from '@material-ui/core';
import SearchFilter from './SearchFilter';

// Icons
import FilterIcon from '@material-ui/icons/FilterList';
import SortingFilter from './SortingFilter';

const styles = theme => ({
  upperMenuPaper: {
    margin: '0.5rem',
    padding: '0.5rem 2rem'
  },
  upperMenuContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  advFilter: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  toggleFilterBtn: {
    border: `1px solid ${theme.palette.secondary.grey}`,
    margin: theme.spacing.unit
  },
  clearFilterText: {
    color: theme.palette.secondary.darkRed
  },
  clearFilterBtn: {
    border: `1px solid ${theme.palette.secondary.grey}`,
    height: 38,
    minWidth: 160
  }
});

const UpperFilterMenu = ({
  classes,
  intl,
  searchEmployeesValue,
  handleSearchEmployeeChange,
  visibleAdvancedFilter,
  clearFilter,
  toggleSortingFilter,
  sortingData
}) => {
  return (
    <Paper className={classes.upperMenuPaper}>
      <div className={classes.upperMenuContainer}>
        <SearchFilter
          searchValue={searchEmployeesValue}
          searchChange={handleSearchEmployeeChange}
          placeholder={intl.formatMessage({
            id: 'filter.searchEmployee'
          })}
        />
        {visibleAdvancedFilter && (
          <Button
            variant="contained"
            onClick={clearFilter}
            className={classes.clearFilterBtn}
          >
            <Typography variant="button" className={classes.clearFilterText}>
              x {intl.formatMessage({ id: 'filter.clear' })}
            </Typography>
          </Button>
        )}
        <Button
          onClick={() => toggleSortingFilter()}
          className={classes.toggleFilterBtn}
          variant="contained"
        >
          <FilterIcon />
          <Typography variant="button">
            {intl.formatMessage({ id: 'filter.advanced' })}
          </Typography>
        </Button>
      </div>
      {visibleAdvancedFilter && (
        <div className={classes.advFilter}>
          {sortingData.map(item => (
            <SortingFilter
              key={item.id}
              sortBy={item.sortBy}
              handleChange={item.handleChange}
              menuData={item.menuData}
              stateValue={item.stateValue}
            />
          ))}
        </div>
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(UpperFilterMenu));
