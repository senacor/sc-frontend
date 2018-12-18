import { Component } from 'react';
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

export class ArchivedFiles extends Component {
  getColumnDefinitions = () => {
    return [
      {
        numeric: false,
        label: 'Mitarbeiter',
        sortValue: entry => getDisplayName(entry),
        render: entry => getDisplayName(entry)
      },
      {
        numeric: true,
        label: 'Datum',
        sortValue: entry => entry.date,
        render: entry => formatDateForFrontend(entry.date)
      },
      {
        numeric: false,
        label: 'Dateinamen',
        sortValue: entry => entry.fileName,
        render: entry => entry.fileName
      },
      {
        numeric: false,
        label: 'Download',
        sortValue: entry => entry.fileName,
        render: entry => (
          <DownloadFile employeeId={entry.employeeId} fileId={entry.fileId} />
        )
      }
    ];
  };

  render() {
    return (
      <div>
        <Paper>
          <UploadFiles />
          <PerformanceReviewTable
            columnDefinition={this.getColumnDefinitions()}
            orderBy={1}
            data={this.props.archivedFiles}
          />
        </Paper>
      </div>
    );
  }
}

export default connect(
  state => ({
    archivedFiles: getArchivedFiles(state)
  }),
  {
    downloadFiles: actions.downloadAllFilesInformation
  }
)(
  withLoadingAction(props => {
    props.downloadFiles(props.employeeId);
  })([LoadingEvents.DOWNLOAD_FILES])(ArchivedFiles)
);
