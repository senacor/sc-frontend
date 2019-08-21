import React, { useState } from 'react';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';
import UploadSuccessDialog from './UploadSuccessDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { uploadFiles } from '../../actions/calls/fileStorage';

const styles = theme => ({
  buttonProgress: {
    color: theme.palette.primary['A100'],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
});

export const UploadFiles = ({ classes, intl, updateFileList }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    uploadFiles(event.target.files, setUploadedFiles, setIsLoading);
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
