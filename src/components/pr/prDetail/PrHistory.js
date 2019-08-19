import React, { useEffect, useState } from 'react';

import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Table from '@material-ui/core/Table/Table';
import { DownloadFile } from '../../fileStorage/DownloadFile';
import { injectIntl } from 'react-intl';
import { loadArchivedFilesList } from '../../../actions/calls/fileStorage';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  container: {
    overflow: 'auto',
    maxHeight: '200px'
  },
  noArchivedFiles: {
    textAlign: 'center',
    color: theme.palette.primary.G300,
    paddingBottom: 10
  }
});

const PrHistory = props => {
  const { intl, employeeId } = props;
  const [archivedFiles, setArchivedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { classes } = props;

  useEffect(() => {
    loadArchivedFilesList(employeeId, setArchivedFiles, setIsLoading);
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.container}>
      {archivedFiles.length > 0 ? (
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
      ) : (
        <Typography className={classes.noArchivedFiles}>
          {intl.formatMessage({
            id: 'prhistory.noArchivedFiles'
          })}
        </Typography>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(PrHistory));
