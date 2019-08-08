import React from 'react';
import * as actions from '../../actions';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';
import UploadSuccessDialog from './UploadSuccessDialog';
import { getUploadedFiles, isLoadingAction } from '../../reducers/selector';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoadingEvents } from '../../helper/loadingEvents';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

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

export const UploadFiles = ({
  uploadFiles,
  resetUploadedFiles,
  uploadedFiles,
  isLoading,
  classes,
  intl
}) => {
  const handleChange = event => {
    uploadFiles(event.target.files);
  };

  const handleClose = () => {
    resetUploadedFiles();
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

export const StyledComponent = withStyles(styles)(UploadFiles);

export default injectIntl(
  connect(
    state => ({
      uploadedFiles: getUploadedFiles(state),
      isLoading: isLoadingAction(state, [LoadingEvents.UPLOAD_FILES])
    }),
    {
      uploadFiles: actions.uploadFiles,
      resetUploadedFiles: actions.resetUploadedFiles
    }
  )(StyledComponent)
);
