import React, { useContext, useState, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Button, TextField, withStyles } from '@material-ui/core';
import { ErrorContext, UserinfoContext } from '../../App';
import { uploadFiles } from '../../../actions/calls/fileStorage';
import EmployeesGrid from './AllEmployeesGrid';
import ROLES from '../../../helper/roles';
import AllEmployeesFilter from './AllEmployeesFilter';
import UploadSuccessDialog from '../../fileStorage/UploadSuccessDialog';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  },
  gridContainer: {
    height: '77vh',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
});

const AllEmployeesContainer = ({ classes, intl }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const userInfoContext = useContext(UserinfoContext.context);
  const errorContext = useContext(ErrorContext.context);

  const handleSearchChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

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

  return (
    <div className={classes.container}>
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
            <Button component="span">
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
      <EmployeesGrid searchEmployeesValue={searchEmployeesValue} />
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
