import React, { Fragment, useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { ErrorContext, InfoContext, UserinfoContext } from '../App';
import { withStyles, Grid } from '@material-ui/core';
import EmployeesGrid from './AllEmployeesGrid';
import ROLES from '../../helper/roles';
import SearchFilter from './SearchFilter';
import UploadSuccessDialog from '../fileStorage/UploadSuccessDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import SortingFilter from './SortingFilter';

// Calls
import { requestPrForEmployees } from '../../actions/calls/pr';
import { uploadFiles } from '../../actions/calls/fileStorage';
import { getAllEmployees } from '../../actions/calls/employees';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

// Icons
import FilterIcon from '@material-ui/icons/FilterList';
import {
  positions,
  competenceCenters,
  locations
} from '../../helper/filterData';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  },
  gridContainer: {
    height: '77vh',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  containerMenu: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  filterWithUpload: {
    margin: '0.5rem',
    padding: '0.5rem 2rem'
  },
  btnUpload: {
    border: `1px solid ${theme.palette.secondary.grey}`
  },
  label: {
    marginRight: '1em'
  },
  selectionMenu: {
    display: 'inline'
  },
  advFilterGrid: {
    marginTop: theme.spacing.unit
  },
  clearFilter: {
    border: `1px solid ${theme.palette.secondary.darkRed}`
  }
});

const AllEmployeesContainer = ({ classes, intl }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const [searchCstValue, setSearchCstValue] = useState('');
  const errorContext = useContext(ErrorContext.context);
  const infoContext = useContext(InfoContext.context);
  const [selection, setSelection] = useState(false);
  const [selected, setSelected] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [positionSorting, setPositionSorting] = useState([]);
  const [ccSorting, setCcSorting] = useState([]);
  const [locationSorting, setLocationSorting] = useState([]);
  const [visibleAdvancedFilter, setVisibleAdvancedFilter] = useState(false);
  const userInfoContext = useContext(UserinfoContext.context);

  const checkFileForm = file => {
    const regex = /^20[0-9]{6}_\D{3}/g;
    if (file.match(regex)) {
      return true;
    } else {
      errorContext.setValue({
        hasErrors: true,
        messageId: 'message.uploadError'
      });
    }
  };

  const handleChange = event => {
    if (checkFileForm(event.target.files[0].name)) {
      uploadFiles(
        event.target.files,
        setUploadedFiles,
        setIsLoading,
        errorContext
      );
    }
  };

  const handleClose = () => {
    setUploadedFiles([]);
  };

  useEffect(() => {
    getAllEmployees(setEmployees, setIsLoading, errorContext);
  }, []);

  const toggleSelected = employeeId => {
    if (selected[employeeId]) {
      delete selected[employeeId];
    } else {
      selected[employeeId] = true;
    }
    setSelected({ ...selected });
  };

  const requestPr = () => {
    const afterPrRequested = () => {
      setSelection(false);
      setSelected({});
      getAllEmployees(setEmployees, setIsLoading, errorContext);
    };

    if (Object.keys(selected).length > 0) {
      requestPrForEmployees(
        Object.keys(selected),
        afterPrRequested,
        infoContext,
        errorContext
      );
    }
  };

  const handleSearchEmployeeChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  const handleSearchCstChange = event => {
    setSearchCstValue(event.target.value);
  };

  const handleSortPositionChange = event => {
    setPositionSorting(event.target.value);
  };

  const handleSortCcChange = event => {
    setCcSorting(event.target.value);
  };

  const handleSortLocationChange = event => {
    setLocationSorting(event.target.value);
  };

  const toggleSortingFilter = () => {
    setVisibleAdvancedFilter(!visibleAdvancedFilter);
  };

  const clearFilter = () => {
    setSearchEmployeesValue('');
    setSearchCstValue('');
    setPositionSorting([]);
    setCcSorting([]);
    setLocationSorting([]);
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
      sortBy: intl.formatMessage({ id: 'employeeInfo.cc' }),
      menuData: competenceCenters,
      stateValue: ccSorting,
      handleChange: handleSortCcChange
    },
    {
      id: 3,
      sortBy: intl.formatMessage({ id: 'employeeInfo.location' }),
      menuData: locations,
      stateValue: locationSorting,
      handleChange: handleSortLocationChange
    }
  ];

  const upperMenu = intl => {
    if (isLoading) {
      return <CircularProgress size={24} className={classes.buttonProgress} />;
    }
    const uploadFragment = userInfoContext.value.userroles.includes(
      ROLES.PERSONAL_DEV
    ) ? (
      <Fragment>
        <TextField
          style={{ display: 'none' }}
          id="upload-button"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="upload-button" className={classes.label}>
          <Button component="span" className={classes.btnUpload}>
            {intl.formatMessage({
              id: 'allemployeescontainer.upload'
            })}
          </Button>
        </label>
      </Fragment>
    ) : null;

    let selectionMenu = selection ? (
      <div className={classes.selectionMenu}>
        <Button
          className={classes.btnUpload}
          onClick={() => {
            setSelected({});
            setSelection(false);
          }}
        >
          {intl.formatMessage({
            id: 'pr.cancel'
          })}
        </Button>{' '}
        <Button className={classes.btnUpload} onClick={requestPr}>
          {intl.formatMessage({
            id: 'requestperformancereview.requestpr'
          })}
        </Button>
      </div>
    ) : (
      <Button
        className={classes.btnUpload}
        onClick={() => {
          setSelected({});
          setSelection(true);
        }}
      >
        {intl.formatMessage({
          id: 'pr.select.employees'
        })}
      </Button>
    );
    if (
      !userInfoContext.value.userroles.includes(ROLES.PERSONAL_DEV) &&
      !userInfoContext.value.userroles.includes(ROLES.SUPERVISOR)
    ) {
      selectionMenu = null;
    }

    return (
      <div className={classes.selectionMenu}>
        {uploadFragment}
        {selectionMenu}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.filterWithUpload}>
        <UploadSuccessDialog
          open={uploadedFiles.length > 0}
          onClose={handleClose}
          uploadedFiles={uploadedFiles}
        />
        <Grid container alignItems="center">
          <Grid item sm={3} style={{ textAlign: 'left' }}>
            <SearchFilter
              searchValue={searchEmployeesValue}
              searchChange={handleSearchEmployeeChange}
              placeholder={intl.formatMessage({ id: 'filter.searchEmployee' })}
            />
          </Grid>
          <Grid item sm={3} style={{ textAlign: 'left' }}>
            <IconButton onClick={() => toggleSortingFilter()}>
              <FilterIcon />
              <Typography variant="button">
                {intl.formatMessage({ id: 'filter.advanced' })}
              </Typography>
            </IconButton>
          </Grid>
          <Grid item sm={6} style={{ textAlign: 'right' }}>
            {upperMenu(intl)}
          </Grid>
          {visibleAdvancedFilter && (
            <Grid item sm={12}>
              <Grid container spacing={16} className={classes.advFilterGrid}>
                {sortingData.map(item => (
                  <Grid item key={item.id}>
                    <SortingFilter
                      sortBy={item.sortBy}
                      handleChange={item.handleChange}
                      menuData={item.menuData}
                      stateValue={item.stateValue}
                    />
                  </Grid>
                ))}
                <Grid item>
                  <SearchFilter
                    searchValue={searchCstValue}
                    searchChange={handleSearchCstChange}
                    placeholder={intl.formatMessage({
                      id: 'filter.searchCst'
                    })}
                  />
                </Grid>
                <Grid item>
                  <Button onClick={clearFilter} className={classes.clearFilter}>
                    <Typography variant="button">
                      x {intl.formatMessage({ id: 'filter.clear' })}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
      <EmployeesGrid
        searchEmployeesValue={searchEmployeesValue}
        searchCstValue={searchCstValue}
        selection={selection}
        selected={selected}
        toggleSelected={toggleSelected}
        employees={employees}
        isLoading={isLoading}
      />
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
