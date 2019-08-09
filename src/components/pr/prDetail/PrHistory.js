import React, { useEffect, useState } from 'react';

import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Table from '@material-ui/core/Table/Table';
import { DownloadFile } from '../../fileStorage/DownloadFile';
import { injectIntl } from 'react-intl';
import CircularProgress from '../../fileStorage/ArchivedFiles';
import { loadArchivedFilesList } from '../../../actions/calls/fileStorage';

const PrHistory = props => {
  const { intl, employeeId } = props;
  const [archivedFiles, setArchivedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadArchivedFilesList(employeeId, setArchivedFiles, setIsLoading);
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

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

export default injectIntl(PrHistory);
