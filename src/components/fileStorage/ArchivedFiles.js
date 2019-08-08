import Paper from '@material-ui/core/Paper';
import PerformanceReviewTable from '../humanResources/PerformanceReviewTable';
import React from 'react';
import { getArchivedFiles } from '../../reducers/selector';
import * as actions from '../../actions';
import withLoadingAction from '../hoc/LoadingWithAction';
import { LoadingEvents } from '../../helper/loadingEvents';
import { formatDateForFrontend } from '../../helper/date';
import getDisplayName from '../../helper/getDisplayName';
import UploadFiles from './UploadFiles';
import { connect } from 'react-redux';
import DownloadFile from './DownloadFile';
import { injectIntl } from 'react-intl';

export const ArchivedFiles = ({ archivedFiles, intl }) => {
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
    <div>
      <Paper>
        <UploadFiles />
        <PerformanceReviewTable
          columnDefinition={getColumnDefinitions(intl)}
          orderBy={1}
          data={archivedFiles}
        />
      </Paper>
    </div>
  );
};

export default injectIntl(
  connect(
    state => ({
      archivedFiles: getArchivedFiles(state)
    }),
    {
      downloadFiles: actions.loadAllArchivedFilesList
    }
  )(
    withLoadingAction(props => {
      props.downloadFiles(props.employeeId);
    })([LoadingEvents.DOWNLOAD_FILES])(ArchivedFiles)
  )
);
