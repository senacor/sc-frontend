import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

import { uploadFiles } from '../../calls/fileStorage';
import PrStatusActionButton from '../pr/PrStatusActionButton';
import UploadSuccessDialog from './UploadSuccessDialog';
import { useErrorContext } from '../../helper/contextHooks';

const styles = theme => ({
  buttonProgress: {
    color: theme.palette.secondary.blue
  }
});

export const UploadFiles = ({ classes, intl, updateFileList }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();

  const checkFileForm = file => {
    const regex = /^20[0-9]{6}_\D{3}/g;
    if (file.match(regex)) {
      return true;
    } else {
      error.show('message.uploadError');
    }
  };

  const handleChange = event => {
    if (checkFileForm(event.target.files[0].name)) {
      uploadFiles(event.target.files, setUploadedFiles, setIsLoading, error);
    }
  };

  const handleClose = () => {
    setUploadedFiles([]);
    updateFileList();
  };

  return (
    <div>
      <UploadSuccessDialog
        open={uploadedFiles.length > 0}
        onClose={handleClose}
        uploadedFiles={uploadedFiles}
      />
      <input
        style={{ display: 'none' }}
        id="upload-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="upload-button-file">
        <PrStatusActionButton
          label={
            isLoading ? (
              <CircularProgress size={24} className={classes.buttonProgress} />
            ) : (
              intl.formatMessage({
                id: 'uploadfiles.upload'
              })
            )
          }
          component="span"
        />
      </label>
    </div>
  );
};

export default injectIntl(withStyles(styles)(UploadFiles));
