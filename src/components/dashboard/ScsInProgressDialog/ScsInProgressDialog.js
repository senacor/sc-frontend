import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import ROUTES from '../../../helper/routes';
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
// Icons
import CloseIcon from '@material-ui/icons/Close';
import SearchFilter from '../../AllEmployees/SearchFilter';
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/FilterList';
import SortingFilter from '../../AllEmployees/SortingFilter';
import {
  locations,
  scDepartmentMenu,
  scPositionMenu,
  scWorkstatusMenu
} from '../../../helper/filterData';
import { useErrorContext } from '../../../helper/contextHooks';
import ScsInProgressTable from './ScsInProgressTable';
import { getScsInProgress } from '../../../calls/sc';

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

const ScsInProgressDialog = ({ classes, intl, scsInProgress }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [scs, setScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const [searchSupervisorValue, setSearchSupervisorValue] = useState('');
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [office, setOffice] = useState([]);
  const [workstatus, setWorkstatus] = useState([]);

  const error = useErrorContext();

  useEffect(
    () => {
      if (window.location.pathname === ROUTES.SC_IN_PROGRESS) {
        setDialogOpened(true);
        getScsInProgress(setScs, setIsLoading, error);
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

  const handleDepartmentChange = event => {
    setDepartment(event.target.value);
  };

  const handleSearchPositionChange = event => {
    setPosition(event.target.value);
  };

  const handleOfficeChange = event => {
    setOffice(event.target.value);
  };

  const handleSearchWorkstatusChange = event => {
    setWorkstatus(event.target.value);
  };

  const filterInputs = {
    searchEmployee: searchEmployeesValue,
    searchSupervisor: searchSupervisorValue,
    department: department,
    position: position,
    office: office,
    status: workstatus
  };

  const dialogClose = () => {
    window.history.pushState(null, null, ROUTES.DASHBOARD);
    setDialogOpened(false);
  };

  const dialogOpen = () => {
    window.history.pushState(null, null, ROUTES.SC_IN_PROGRESS);
    setDialogOpened(true);
  };

  const clearFilter = () => {
    setSearchEmployeesValue('');
    setSearchSupervisorValue('');
    setPosition([]);
    setOffice([]);
    setDepartment([]);
    setWorkstatus([]);
  };

  return (
    <Fragment>
      <InfoWidget
        label={intl.formatMessage({
          id: 'dashboard.scsInProgress'
        })}
        linkTo={ROUTES.SC_IN_PROGRESS}
        onClick={dialogOpen}
        value={scsInProgress}
        icon={'insert_chart'}
      />
      <Dialog
        open={dialogOpened}
        onClose={dialogClose}
        fullWidth
        maxWidth="lg"
        classes={{ paper: classes.dialogPaper }}
      >
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'dashboard.scsInProgress'
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
              <SortingFilter
                sortBy={intl.formatMessage({ id: 'employeeInfo.department' })}
                handleChange={handleDepartmentChange}
                menuData={scDepartmentMenu}
                stateValue={department}
                processingPrs={true}
              />
              <SearchFilter
                searchValue={searchSupervisorValue}
                searchChange={handleSearchSupervisorChange}
                placeholder={intl.formatMessage({
                  id: 'employeeInfo.supervisor'
                })}
              />
              <SortingFilter
                sortBy={intl.formatMessage({ id: 'employeeInfo.positionAbrv' })}
                handleChange={handleSearchPositionChange}
                menuData={scPositionMenu}
                stateValue={position}
                processingPrs={true}
              />
              <SortingFilter
                sortBy={intl.formatMessage({ id: 'employeeInfo.office' })}
                handleChange={handleOfficeChange}
                menuData={locations}
                stateValue={office}
                processingPrs={true}
              />
              <SortingFilter
                sortBy={intl.formatMessage({ id: 'sc.workstatus' })}
                handleChange={handleSearchWorkstatusChange}
                menuData={scWorkstatusMenu}
                stateValue={workstatus}
                processingPrs={true}
              />
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
            <ScsInProgressTable scs={scs} filterInputs={filterInputs} />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScsInProgressDialog));
