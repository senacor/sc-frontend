import React, { Fragment, useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { ErrorContext, InfoContext, UserinfoContext } from '../App';
import { Button, TextField, withStyles } from '@material-ui/core';
import { uploadFiles } from '../../actions/calls/fileStorage';
import EmployeesGrid from './AllEmployeesGrid';
import ROLES from '../../helper/roles';
import AllEmployeesFilter from './AllEmployeesFilter';
import UploadSuccessDialog from '../fileStorage/UploadSuccessDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllEmployees } from '../../actions/calls/employees';
import { requestPrForEmployees } from '../../actions/calls/pr';

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
    justifyContent: 'space-between'
  }
});

const AllEmployeesContainer = ({ classes, intl }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const errorContext = useContext(ErrorContext.context);
  const infoContext = useContext(InfoContext.context);
  const [selection, setSelection] = useState(false);
  const [selected, setSelected] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
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

  const selectionMenu = intl => {
    if (
      (!userInfoContext.value.userroles.includes(ROLES.PERSONAL_DEV) &&
        userInfoContext.value.userroles.includes(ROLES.SUPERVISOR)) ||
      isLoading
    ) {
      return '';
    }

    return selection ? (
      <div style={{ display: 'inline' }}>
        <Button
          onClick={() => {
            setSelected({});
            setSelection(false);
          }}
        >
          {intl.formatMessage({
            id: 'pr.cancel'
          })}
        </Button>{' '}
        <Button onClick={requestPr}>
          {intl.formatMessage({
            id: 'requestperformancereview.requestpr'
          })}
        </Button>
      </div>
    ) : (
      <Button
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
  };

  const handleSearchChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.filterWithUpload}>
        <UploadSuccessDialog
          open={uploadedFiles.length > 0}
          onClose={handleClose}
          uploadedFiles={uploadedFiles}
        />
        <AllEmployeesFilter
          searchValue={searchEmployeesValue}
          searchChange={handleSearchChange}
        />
        {userInfoContext.value.userroles.includes(ROLES.PERSONAL_DEV) && (
          <Fragment>
            <TextField
              style={{ display: 'none' }}
              id="upload-button"
              multiple
              type="file"
              onChange={handleChange}
            />
            <label htmlFor="upload-button">
              <Button component="span" className={classes.btnUpload}>
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                ) : (
                  intl.formatMessage({
                    id: 'allemployeescontainer.upload'
                  })
                )}
              </Button>
            </label>
          </Fragment>
        )}
        {selectionMenu(intl)}
      </div>
      <EmployeesGrid
        searchEmployeesValue={searchEmployeesValue}
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
