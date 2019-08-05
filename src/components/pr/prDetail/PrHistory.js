import React from 'react';

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
import { injectIntl } from 'react-intl';

const PrHistory = ({ archivedFiles, intl }) => {
  return (
    <div style={{ overflow: 'auto', maxHeight: '200px' }}>
      <Table padding={'none'}>
        <TableHead>
          <TableRow>
            <TableCell padding={'none'}>
              {intl.formatMessage({
                id: 'prhistory.date'
              })}
            </TableCell>
            <TableCell padding={'none'}>
              {intl.formatMessage({
                id: 'prhistory.link'
              })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {archivedFiles.map(row => {
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
};

export default injectIntl(
  connect(
    state => ({
      archivedFiles: getArchivedFiles(state)
    }),
    {
      downloadFiles: actions.loadArchivedFilesList
    }
  )(
    withLoadingAction(props => {
      props.downloadFiles(props.employeeId);
    })([LoadingEvents.DOWNLOAD_FILES])(PrHistory)
  )
);
