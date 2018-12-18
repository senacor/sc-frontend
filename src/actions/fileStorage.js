import * as dispatchTypes from '../helper/dispatchTypes';
import { default as fetch, fileFetch } from '../helper/customFetch';
import objectGet from 'object-get';

export const uploadFiles = files => async dispatch => {
  dispatch({
    type: dispatchTypes.UPLOAD_FILES_REQUEST
  });

  var data = new FormData();

  Array.from(files).forEach(file => {
    data.append('files', file);
  });

  const response = await fileFetch(
    `${process.env.REACT_APP_API}/api/v1/hr/upload`,
    {
      method: 'post',
      mode: 'cors',
      body: data
    }
  );

  if (response.ok) {
    const result = await response.json();
    const responseList = objectGet(result, '_embedded.fileUploadResponseList');

    dispatch({
      type: dispatchTypes.UPLOAD_FILES_RESPONSE,
      payload: responseList
    });
  }
};

export const downloadFile = (employeeId, fileId) => async dispatch => {
  dispatch({
    type: dispatchTypes.DOWNLOAD_FILE_REQUEST
  });

  const response = await fetch(
    `${
      process.env.REACT_APP_API
    }/api/v1/employees/${employeeId}/archivedPrs/${fileId}`
  );

  if (response.ok) {
    const result = await response.json();

    dispatch({
      type: dispatchTypes.DOWNLOAD_FILE_RESPONSE,
      payload: result
    });
  }
};

export const resetUploadedFiles = () => async dispatch => {
  dispatch({
    type: dispatchTypes.RESET_UPLOADED_FILES
  });
};

export const resetDownloadedFile = () => async dispatch => {
  dispatch({
    type: dispatchTypes.RESET_DOWNLOADED_FILE
  });
};

export const downloadFilesInformation = employeeId => async dispatch => {
  dispatch({
    type: dispatchTypes.DOWNLOAD_FILES_INFORMATION_REQUEST
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/employees/${employeeId}/archivedPrs`
  );

  if (response.ok) {
    const result = await response.json();
    const responseList = objectGet(
      result,
      '_embedded.fileDownloadInformationResponseList'
    );

    dispatch({
      type: dispatchTypes.DOWNLOAD_FILES_INFORMATION_RESPONSE,
      payload: responseList ? responseList : []
    });
  }
};

export const downloadAllFilesInformation = () => async dispatch => {
  dispatch({
    type: dispatchTypes.DOWNLOAD_ALL_FILES_INFORMATION_REQUEST
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/hr/download`
  );

  if (response.ok) {
    const result = await response.json();
    const responseList = objectGet(
      result,
      '_embedded.fileDownloadInformationResponseList'
    );

    dispatch({
      type: dispatchTypes.DOWNLOAD_ALL_FILES_INFORMATION_RESPONSE,
      payload: responseList ? responseList : []
    });
  }
};
