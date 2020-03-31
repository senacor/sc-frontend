import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Paper, Typography, withStyles } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import SearchFilter from './SearchFilter';
// Icons
import FilterIcon from '@material-ui/icons/FilterList';
import SortingFilter from './SortingFilter';
import FilteredValuesViewer from './FilteredValuesViewer';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { JSS } from '../../styles/jsStyles';

const styles = theme => ({
  searchSupervisorContainer: {
    display: 'block'
  },
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
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
  valuesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit
  },
  textContainer: {
    color: theme.palette.secondary.darkGrey,
    textAlign: 'center',
    display: 'flex',
    marginRight: theme.spacing.unit
  },
  textHeader: {
    color: theme.palette.secondary.darkGrey,
    textAlign: 'center',
    display: 'flex',
    marginRight: theme.spacing.unit / 2
  },
  textValue: {
    color: theme.palette.secondary.darkGrey,
    textAlign: 'center',
    display: 'flex'
  },
  advFilterBtnText: {
    marginLeft: theme.spacing.unit / 2
  }
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
  useEffect(() => {
    JSS.tableHeightAdaptationCallback();
  });
  return (
    <Paper className={classes.upperMenuPaper} id={JSS.FILTER_ID}>
      <div className={classes.upperMenuContainer}>
        <div>
          <SearchFilter
            searchValue={searchEmployeesValue}
            searchChange={handleSearchEmployeeChange}
            placeholder={intl.formatMessage({
              id: 'filter.searchEmployee'
            })}
          />
        </div>
        <div>
          {handleDownloadAllScs && (
            <Button
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
            {visibleAdvancedFilter ? <VisibilityOffIcon /> : <FilterIcon />}
            <Typography variant="button" className={classes.advFilterBtnText}>
              {intl.formatMessage({ id: 'filter.advanced' })}
            </Typography>
          </Button>
        </div>
      </div>
      {visibleAdvancedFilter && (
        <div>
          <div className={classes.advFilter}>
            {!formerEmployees && (
              <div className={classes.searchSupervisorContainer}>
                <SearchFilter
                  searchValue={searchSupervisorValue}
                  searchChange={handleSearchSupervisorChange}
                  placeholder={intl.formatMessage({
                    id: 'filter.searchSupervisor'
                  })}
                />
              </div>
            )}
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
          <FilteredValuesViewer sortingData={sortingData} />
        </div>
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(UpperFilterMenu));
