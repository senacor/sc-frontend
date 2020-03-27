import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import ROUTES from '../../../helper/routes';
import InfoWidget from '../../utils/InfoWidget';
import SortingFilter from '../../filterComponents/SortingFilter';
import {
  locations,
  positions,
  scDepartmentMenu
} from '../../../helper/filterData';
import { useErrorContext } from '../../../helper/contextHooks';
import ScsTable from './ScsTable';
import { getScsByStatus } from '../../../calls/sc';
import SearchFilter from '../../filterComponents/SearchFilter';
// Material UI
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
// Icons
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import FilterIcon from '@material-ui/icons/FilterList';
import { translateGeneralStatus } from '../../../helper/string';
import { withRouter } from 'react-router-dom';
import FilteredValuesViewer from '../../filterComponents/FilteredValuesViewer';

const styles = theme => ({
  btnClose: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 3 * theme.spacing.unit,
    paddingRight: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit,
    textAlign: 'center',
    overflowY: 'auto'
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
  basicFilterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2
  },
  advFilter: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  searchSupervisor: {
    display: 'block'
  },
  title: {
    marginBottom: 2 * theme.spacing.unit
  },
  advFilterBtnText: {
    marginLeft: theme.spacing.unit / 2
  },
  filterValuesViewerContainer: {
    marginLeft: 2 * theme.spacing.unit
  }
});

const ScsDialog = ({ classes, intl, numberOfScs, status, history }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [scs, setScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const [searchSupervisorValue, setSearchSupervisorValue] = useState('');
  const [position, setPosition] = useState([]);
  const [department, setDepartment] = useState([]);
  const [office, setOffice] = useState([]);

  const error = useErrorContext();

  useEffect(
    () => {
      if (window.location.pathname === ROUTES[status]) {
        setDialogOpened(true);
        // getScsInProgress(setScs, setIsLoading, error);
        getScsByStatus(status, setScs, setIsLoading, error);
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

  const handleOfficeChange = event => {
    setOffice(event.target.value);
  };

  const handlePositionChange = event => {
    setPosition(event.target.value);
  };

  const filterInputs = {
    searchEmployee: searchEmployeesValue,
    searchSupervisor: searchSupervisorValue,
    position: position,
    department: department,
    office: office
  };

  const dialogClose = () => {
    history.push(ROUTES.DASHBOARD);
    setDialogOpened(false);
  };

  const dialogOpen = () => {
    history.push(ROUTES.SC_IN_PROGRESS);
    setDialogOpened(true);
  };

  const clearFilter = () => {
    setSearchEmployeesValue('');
    setSearchSupervisorValue('');
    setOffice([]);
    setDepartment([]);
  };

  const label = intl.formatMessage({
    id: translateGeneralStatus(status)
  });

  const sortingData = [
    {
      sortBy: 'employeeInfo.supervisor',
      stateValue: searchSupervisorValue
    },
    {
      sortBy: 'employeeInfo.position',
      stateValue: position
    },
    {
      sortBy: 'employeeInfo.department',
      stateValue: department
    },
    {
      sortBy: 'employeeInfo.office',
      stateValue: office
    }
  ];

  return (
    <Fragment>
      <InfoWidget
        label={label}
        linkTo={ROUTES[status]}
        onClick={dialogOpen}
        value={numberOfScs}
        icon={'insert_chart'}
        personalDev
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
          <Typography variant="h5" className={classes.title}>
            {intl.formatMessage({
              id: translateGeneralStatus(status)
            })}
          </Typography>
          <Divider />
          <div className={classes.basicFilterContainer}>
            <SearchFilter
              searchValue={searchEmployeesValue}
              searchChange={handleSearchEmployeeChange}
              placeholder={intl.formatMessage({
                id: 'filter.searchEmployee'
              })}
            />
            <div>
              {visibleAdvancedFilter && (
                <Button
                  variant="contained"
                  onClick={clearFilter}
                  className={classes.clearFilterBtn}
                >
                  <Typography
                    variant="button"
                    className={classes.clearFilterText}
                  >
                    x {intl.formatMessage({ id: 'filter.clear' })}
                  </Typography>
                </Button>
              )}
              <Button
                onClick={() => toggleSortingFilter()}
                variant="contained"
                className={classes.advFilterBtn}
              >
                {visibleAdvancedFilter ? <VisibilityOffIcon /> : <FilterIcon />}
                <Typography
                  variant="button"
                  className={classes.advFilterBtnText}
                >
                  {intl.formatMessage({ id: 'filter.advanced' })}
                </Typography>
              </Button>
            </div>
          </div>
          {visibleAdvancedFilter && (
            <div>
              <div className={classes.advFilter}>
                <div className={classes.searchSupervisor}>
                  <SearchFilter
                    searchValue={searchSupervisorValue}
                    searchChange={handleSearchSupervisorChange}
                    placeholder={intl.formatMessage({
                      id: 'employeeInfo.supervisor'
                    })}
                  />
                </div>
                <SortingFilter
                  sortBy={intl.formatMessage({ id: 'employeeInfo.position' })}
                  handleChange={handlePositionChange}
                  menuData={positions}
                  stateValue={position}
                  processingPrs
                />
                <SortingFilter
                  sortBy={intl.formatMessage({ id: 'employeeInfo.department' })}
                  handleChange={handleDepartmentChange}
                  menuData={scDepartmentMenu}
                  stateValue={department}
                  processingPrs
                />
                <SortingFilter
                  sortBy={intl.formatMessage({ id: 'employeeInfo.office' })}
                  handleChange={handleOfficeChange}
                  menuData={locations}
                  stateValue={office}
                  processingPrs
                />
              </div>
              <div className={classes.filterValuesViewerContainer}>
                <FilteredValuesViewer sortingData={sortingData} />
              </div>
            </div>
          )}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ScsTable scs={scs} filterInputs={filterInputs} />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScsDialog)));
