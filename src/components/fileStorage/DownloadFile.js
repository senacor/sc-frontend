import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { downloadFile } from '../../calls/fileStorage';

import GetAppIcon from '@material-ui/icons/GetApp';
import { useErrorContext } from '../../helper/contextHooks';

let downloadTab = null;
export const DownloadFile = ({ employeeId, fileId }) => {
  const [downloadedFile, setDownloadedFile] = useState([]);

  const error = useErrorContext();

  const handleClick = (employeeId, fileId) => () => {
    downloadTab = window.open();
    downloadFile(employeeId, fileId, setDownloadedFile, error);
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
