import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import * as actions from '../../actions';
import { getDownloadedFile } from '../../reducers/selector';
import { connect } from 'react-redux';

let downloadTab = null;
export const DownloadFile = ({
  employeeId,
  fileId,
  downloadFile,
  downloadedFile
}) => {
  const handleClick = (employeeId, fileId) => () => {
    downloadTab = window.open();
    downloadFile(employeeId, fileId);
  };

  const checkDownloadFile = file => {
    return file.id && file.employeeId === employeeId && file.fileId === fileId;
  };

  if (checkDownloadFile(downloadedFile) && downloadTab) {
    downloadTab.location = downloadedFile.url;
  }

  return (
    <IconButton onClick={handleClick(employeeId, fileId)}>
      <Icon>get_app</Icon>
    </IconButton>
  );
};

export default connect(
  state => ({
    downloadedFile: getDownloadedFile(state)
  }),
  {
    downloadFile: actions.downloadFile,
    resetDownloadedFile: actions.resetDownloadedFile
  }
)(DownloadFile);
