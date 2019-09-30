import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

import PerformanceReviewTable from '../humanResources/PerformanceReviewTable';
import getDisplayName from '../../helper/getDisplayName';
import UploadFiles from './UploadFiles';
import { DownloadFile } from './DownloadFile';
import { loadAllArchivedFilesList } from '../../calls/fileStorage';
import { formatDateForFrontend } from '../../helper/date';
import { ErrorContext } from '../App';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  }
});

const ArchivedFiles = ({ classes, intl }) => {
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
    <Paper className={classes.container}>
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
