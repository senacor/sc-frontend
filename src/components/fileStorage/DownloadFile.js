import React, { useState, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { downloadFile } from '../../actions/calls/fileStorage';
import { ErrorContext } from '../App';

import GetAppIcon from '@material-ui/icons/GetApp';

let downloadTab = null;
export const DownloadFile = ({ employeeId, fileId }) => {
  const [downloadedFile, setDownloadedFile] = useState([]);

  const errorContext = useContext(ErrorContext.context);

  const handleClick = (employeeId, fileId) => () => {
    downloadTab = window.open();
    downloadFile(employeeId, fileId, setDownloadedFile, errorContext);
  };

  const checkDownloadFile = file => {
    return file.id && file.employeeId === employeeId && file.fileId === fileId;
  };

  if (checkDownloadFile(downloadedFile) && downloadTab) {
    downloadTab.location = downloadedFile.url;
  }

  return (
    <IconButton onClick={handleClick(employeeId, fileId)}>
      <GetAppIcon />
    </IconButton>
  );
};
