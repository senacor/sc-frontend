import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import * as actions from '../../actions';
import { getDownloadedFile } from '../../reducers/selector';
import { connect } from 'react-redux';

export const DownloadFile = props => {
  const employeeId = props.employeeId;
  const fileId = props.fileId;
  let downloadTab = null;

  const handleClick = (employeeId, fileId) => () => {
    downloadTab = window.open();
    props.downloadFile(employeeId, fileId);
  };

  const checkDownloadFile = file => {
    return file.id && file.employeeId === employeeId && file.fileId === fileId;
  };

  if (checkDownloadFile(props.downloadedFile) && downloadTab) {
    downloadTab.location = props.downloadedFile.url;
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
