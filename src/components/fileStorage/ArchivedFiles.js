import React, { useEffect, useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import PerformanceReviewTable from '../humanResources/PerformanceReviewTable';
import { formatDateForFrontend } from '../../helper/date';
import getDisplayName from '../../helper/getDisplayName';
import UploadFiles from './UploadFiles';
import { DownloadFile } from './DownloadFile';
import { injectIntl } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadAllArchivedFilesList } from '../../actions/calls/fileStorage';
import { withStyles } from '@material-ui/core';
import { ErrorContext } from '../App';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  }
});

const ArchivedFiles = ({ intl }) => {
  const [archivedFiles, setArchivedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  const loadAllArchivedFiles = () => {
    loadAllArchivedFilesList(setArchivedFiles, setIsLoading, errorContext);
  };

  useEffect(() => {
    loadAllArchivedFiles();
  }, []);

  const getColumnDefinitions = intl => {
    return [
      {
        numeric: false,
        label: intl.formatMessage({
          id: 'archivedfiles.employee'
        }),
        sortValue: entry => getDisplayName(entry),
        render: entry => getDisplayName(entry)
      },
      {
        numeric: true,
        label: intl.formatMessage({
          id: 'archivedfiles.date'
        }),
        sortValue: entry => entry.date,
        render: entry => formatDateForFrontend(entry.date)
      },
      {
        numeric: false,
        label: intl.formatMessage({
          id: 'archivedfiles.filename'
        }),
        sortValue: entry => entry.fileName,
        render: entry => entry.fileName
      },
      {
        numeric: false,
        label: intl.formatMessage({
          id: 'archivedfiles.download'
        }),
        sortValue: entry => entry.fileName,
        render: entry => (
          <DownloadFile employeeId={entry.employeeId} fileId={entry.fileId} />
        )
      }
    ];
  };

  return (
    <Paper style={{ margin: '20px' }}>
      <UploadFiles updateFileList={loadAllArchivedFiles} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <PerformanceReviewTable
          columnDefinition={getColumnDefinitions(intl)}
          orderBy={1}
          data={archivedFiles}
        />
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ArchivedFiles));
