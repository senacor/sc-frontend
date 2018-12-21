import React from 'react';
import * as actions from '../../actions';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';
import UploadSuccessDialog from './UploadSuccessDialog';
import { getUploadedFiles, isLoadingAction } from '../../reducers/selector';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoadingEvents } from '../../helper/loadingEvents';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

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

export class UploadFiles extends React.Component {
  handleChange = event => {
    this.props.uploadFiles(event.target.files);
  };

  handleClose = () => {
    this.props.resetUploadedFiles();
  };

  render() {
    let { uploadedFiles, isLoading, classes } = this.props;
    return (
      <div>
        <UploadSuccessDialog
          open={uploadedFiles.length > 0 ? true : false}
          onClose={this.handleClose}
          uploadedFiles={uploadedFiles}
        />
        <input
          style={{ display: 'none' }}
          id="upload-button-file"
          multiple
          type="file"
          onChange={this.handleChange}
        />
        <label htmlFor="upload-button-file">
          <PrStatusActionButton
            label={
              isLoading ? (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              ) : (
                'Upload'
              )
            }
            component="span"
          />
        </label>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(UploadFiles);

export default connect(
  state => ({
    uploadedFiles: getUploadedFiles(state),
    isLoading: isLoadingAction(state, [LoadingEvents.UPLOAD_FILES])
  }),
  {
    uploadFiles: actions.uploadFiles,
    resetUploadedFiles: actions.resetUploadedFiles
  }
)(StyledComponent);
