import {default as fetch} from '../../helper/customFetch';

export const loadAllArchivedFilesList = async (
  setArchivedFiles,
  setIsLoading
) => {
  setIsLoading(true);
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/hr/download`
  );
  if (response.ok) {
    const result = await response.json();
    setArchivedFiles(result);
    setIsLoading(false);
  }
};

export const uploadFiles = async (files, setUploadedFiles, setIsLoading) => {
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
};

export const downloadFile = async (employeeId, fileId, setDownloadedFile) => {
  const response = await fetch(
    `${
      process.env.REACT_APP_API
    }/api/v3/employees/${employeeId}/archivedPrs/${fileId}`
  );

  if (response.ok) {
    const result = await response.json();
    setDownloadedFile(result);
  }
};

export const loadArchivedFilesList = async (
  employeeId,
  setArchivedFiles,
  setIsLoading
) => {
  setIsLoading(true);
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/employees/${employeeId}/archivedPrs`
  );

  if (response.ok) {
    const result = await response.json();
    setArchivedFiles(result);
  }
};
