import React, { Component } from 'react';

import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Table from '@material-ui/core/Table/Table';
import { getArchivedFiles } from '../../../reducers/selector';
import { LoadingEvents } from '../../../helper/loadingEvents';
import withLoadingAction from '../../hoc/LoadingWithAction';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import DownloadFile from '../../fileStorage/DownloadFile';

export class PrHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prHistory: [{ id: 5, appointment: '2018-01-01', occassion: 'ON_DEMAND' }]
    };
  }
  render() {
    return (
      <div style={{ overflow: 'auto', maxHeight: '200px' }}>
        <Table padding={'none'}>
          <TableHead>
            <TableRow>
              <TableCell padding={'none'}>Datum</TableCell>
              <TableCell padding={'none'}>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.archivedFiles.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell padding={'none'}>{row.date}</TableCell>
                  <TableCell padding={'none'}>
                    <DownloadFile
                      employeeId={row.employeeId}
                      fileId={row.fileId}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    archivedFiles: getArchivedFiles(state)
  }),
  {
    downloadFiles: actions.loadArchivedFilesList
  }
)(
  withLoadingAction(props => {
    props.downloadFiles(props.employeeId);
  })([LoadingEvents.DOWNLOAD_FILES])(PrHistory)
);
