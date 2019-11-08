import { default as fetch } from '../helper/customFetch';

export const loadAllArchivedFilesList = async (
  setArchivedFiles,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/hr/downloadInfo`
    );
    const result = await response.json();
    setIsLoading(false);
    setArchivedFiles(result);
  } catch (err) {
    setIsLoading(false);
    error.showGeneral();
  }
};

export const uploadFiles = async (
  files,
  setUploadedFiles,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);
    var data = new FormData();

    Array.from(files).forEach(file => {
      data.append('files', file);
    });

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/hr/upload`,
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
    error.showGeneral();
    setIsLoading(false);
  }
};

export const downloadFile = async (
  employeeId,
  fileId,
  setDownloadedFile,
  error
) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/employees/${employeeId}/archivedPrs/${fileId}`
    );

    const result = await response.json();
    setDownloadedFile(result);
  } catch (err) {
    error.showGeneral();
  }
};

export const loadArchivedFilesList = async (
  employeeId,
  setArchivedFiles,
  setIsLoading,
  error
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/employees/${employeeId}/archivedPrs`
    );
    const result = await response.json();
    setIsLoading(false);
    setArchivedFiles(result);
  } catch (err) {
    setIsLoading(false);
    error.showGeneral();
  }
};
