import React, { Fragment, useState, useEffect, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import ROUTES from '../../../helper/routes';
import { ErrorContext } from '../../App';
import { getPrsInProgress } from '../../../calls/pr';
import PrsInProgressTable from './PrsInProgressTable';
import InfoWidget from '../../utils/InfoWidget';

// Material UI
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import SearchFilter from '../../AllEmployees/SearchFilter';
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/FilterList';
import SortingFilter from '../../AllEmployees/SortingFilter';
import { positions, occasions } from '../../../helper/filterData';

const styles = theme => ({
  btnClose: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10
  },
  dialogContent: {
    padding: 3 * theme.spacing.unit,
    textAlign: 'center'
  },
  dialogPaper: {
    height: '80vh'
  },
  advFilterBtn: {
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
  advFilter: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
});

const PrsInProgressDialog = ({ classes, intl, prsInProgress }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [prs, setPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const [positionSorting, setPositionSorting] = useState([]);
  const [searchSupervisorValue, setSearchSupervisorValue] = useState('');
  const [dateSorting, setDateSorting] = useState('');
  const [occasionSorting, setOccasionSorting] = useState([]);

  const errorContext = useContext(ErrorContext.context);

  useEffect(
    () => {
      if (window.location.pathname === ROUTES.PR_IN_PROGRESS) {
        setDialogOpened(true);
        getPrsInProgress(setPrs, setIsLoading, errorContext);
      }
    },
    [dialogOpened]
  );

  const toggleSortingFilter = () => {
    setVisibleAdvancedFilter(!visibleAdvancedFilter);
  };

  const handleSearchEmployeeChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  const handleSearchSupervisorChange = event => {
    setSearchSupervisorValue(event.target.value);
  };

  const handleSortPositionChange = event => {
    setPositionSorting(event.target.value);
  };

  const handleSortDateChange = event => {
    setDateSorting(event.target.value);
  };

  const handleSortOccasionChange = event => {
    setOccasionSorting(event.target.value);
  };

  const filterInputs = {
    searchEmployee: searchEmployeesValue,
    searchSupervisor: searchSupervisorValue,
    date: dateSorting,
    position: [...positionSorting],
    occasion: [...occasionSorting]
  };

  const sortingData = [
    {
      id: 1,
      sortBy: intl.formatMessage({ id: 'employeeInfo.positionAbrv' }),
      menuData: positions,
      stateValue: positionSorting,
      handleChange: handleSortPositionChange
    },
    {
      id: 2,
      sortBy: intl.formatMessage({ id: 'pr.occasion' }),
      menuData: occasions,
      stateValue: occasionSorting,
      handleChange: handleSortOccasionChange
    }
  ];

  const dialogClose = () => {
    window.history.pushState(null, null, ROUTES.DASHBOARD);
    setDialogOpened(false);
  };

  const dialogOpen = () => {
    window.history.pushState(null, null, ROUTES.PR_IN_PROGRESS);
    setDialogOpened(true);
  };

  const clearFilter = () => {
    setSearchEmployeesValue('');
    setSearchSupervisorValue('');
    setDateSorting('');
    setPositionSorting([]);
    setOccasionSorting([]);
  };

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({
          id: 'dashboard.prsInProgress'
        })}
        linkTo={ROUTES.PR_IN_PROGRESS}
        onClick={dialogOpen}
        value={prsInProgress}
        icon={'contact_mail'}
      />
      <Dialog
        open={dialogOpened}
        onClose={dialogClose}
        fullWidth
        maxWidth="md"
        classes={{ paper: classes.dialogPaper }}
      >
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'dashboard.prsInProgress'
            })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          <Grid container>
            <Grid item xs={5}>
              <SearchFilter
                searchValue={searchEmployeesValue}
                searchChange={handleSearchEmployeeChange}
                placeholder={intl.formatMessage({
                  id: 'filter.searchEmployee'
                })}
              />
              <Button
                onClick={() => toggleSortingFilter()}
                className={classes.advFilterBtn}
              >
                <FilterIcon />
                <Typography variant="button">
                  {intl.formatMessage({ id: 'filter.advanced' })}
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={7} />
          </Grid>
          {visibleAdvancedFilter && (
            <div className={classes.advFilter}>
              <SearchFilter
                searchValue={searchSupervisorValue}
                searchChange={handleSearchSupervisorChange}
                placeholder={intl.formatMessage({
                  id: 'employeeInfo.supervisor'
                })}
              />
              <TextField
                type="date"
                label={intl.formatMessage({ id: 'employeeInfo.startDate' })}
                value={dateSorting}
                InputLabelProps={{ shrink: true }}
                onChange={handleSortDateChange}
              />
              {sortingData.map(item => (
                <SortingFilter
                  key={item.id}
                  sortBy={item.sortBy}
                  handleChange={item.handleChange}
                  menuData={item.menuData}
                  stateValue={item.stateValue}
                  processingPrs={true}
                />
              ))}
              <Button onClick={clearFilter} className={classes.clearFilterBtn}>
                <Typography
                  variant="button"
                  className={classes.clearFilterText}
                >
                  x {intl.formatMessage({ id: 'filter.clear' })}
                </Typography>
              </Button>
            </div>
          )}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <PrsInProgressTable prs={prs} filterInputs={filterInputs} />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(PrsInProgressDialog));
