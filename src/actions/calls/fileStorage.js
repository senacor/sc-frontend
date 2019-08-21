import { default as fetch } from '../../helper/customFetch';

export const loadAllArchivedFilesList = async (
  setArchivedFiles,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/hr/downloadInfo`
    );
    const result = await response.json();
    setArchivedFiles(result);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setIsLoading(false);
  }
};

export const uploadFiles = async (
  files,
  setUploadedFiles,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);
    var data = new FormData();

    Array.from(files).forEach(file => {
      data.append('files', file);
    });

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/hr/upload`,
      {
        method: 'post',
        mode: 'cors',
        body: data
      },
      {}
    );

    const result = await response.json();
    setUploadedFiles(result);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setIsLoading(false);
  }
};

export const downloadFile = async (
  employeeId,
  fileId,
  setDownloadedFile,
  errorContext
) => {
  try {
    console.log('downloading');
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v3/employees/${employeeId}/archivedPrs/${fileId}`
    );

    const result = await response.json();
    setDownloadedFile(result);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const loadArchivedFilesList = async (
  employeeId,
  setArchivedFiles,
  setIsLoading,
  errorContext
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/employees/${employeeId}/archivedPrs`
    );
    const result = await response.json();
    setArchivedFiles(result);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setIsLoading(false);
  }
};
