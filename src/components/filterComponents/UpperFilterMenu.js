import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Paper, Button, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
  },
  btnDownload: {
    background: theme.palette.secondary.darkYellow,
    color: theme.palette.secondary.white,
    marginRight: theme.spacing.unit
  },
  btnDownloadText: {
    color: theme.palette.secondary.white,
    paddingLeft: theme.spacing.unit
  },
});

const UpperFilterMenu = ({
  classes,
  intl,
  searchEmployeesValue,
  handleSearchEmployeeChange,
  searchSupervisorValue,
  handleSearchSupervisorChange,
  handleDownloadAllScs,
  visibleAdvancedFilter,
  clearFilter,
  toggleSortingFilter,
  sortingData,
  formerEmployees
}) => {
  return (
    <Paper className={classes.upperMenuPaper}>
      <div className={classes.upperMenuContainer}>
        <div>
          <SearchFilter
            searchValue={searchEmployeesValue}
            searchChange={handleSearchEmployeeChange}
            placeholder={intl.formatMessage({
              id: 'filter.searchEmployee'
            })}
          />
          {visibleAdvancedFilter && !formerEmployees && (
            <SearchFilter
              searchValue={searchSupervisorValue}
              searchChange={handleSearchSupervisorChange}
              placeholder={intl.formatMessage({
                id: 'filter.searchSupervisor'
              })}
            />
          )}
        </div>
        <div>
          {handleDownloadAllScs && (<Button
            className={classes.btnDownload}
            variant="contained"
            onClick={handleDownloadAllScs}
            download
          >
            <GetAppIcon />
            <Typography className={classes.btnDownloadText}>
              {intl.formatMessage({ id: 'filter.downloadAll' })}
            </Typography>
          </Button>
          )}

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
