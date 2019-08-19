import { default as fetch } from '../../helper/customFetch';

export const loadAllArchivedFilesList = async (
  setArchivedFiles,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/hr/downloadInfo`
    );
    if (response.ok) {
      const result = await response.json();
      setArchivedFiles(result);
      setIsLoading(false);
    }
  } catch (err) {
    console.log(err);
  }
};

export const uploadFiles = async (files, setUploadedFiles, setIsLoading) => {
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

    if (response.ok) {
      const result = await response.json();
      setUploadedFiles(result);
      setIsLoading(false);
    }
  } catch (err) {
    console.log(err);
  }
};

export const downloadFile = async (employeeId, fileId, setDownloadedFile) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v3/employees/${employeeId}/archivedPrs/${fileId}`
    );

    if (response.ok) {
      const result = await response.json();
      setDownloadedFile(result);
    }
  } catch (err) {
    console.log(err);
  }
};

export const loadArchivedFilesList = async (
  employeeId,
  setArchivedFiles,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/employees/${employeeId}/archivedPrs`
    );

    if (response.ok) {
      const result = await response.json();
      setArchivedFiles(result);
      setIsLoading(false);
    }
  } catch (err) {
    console.log(err);
  }
};
