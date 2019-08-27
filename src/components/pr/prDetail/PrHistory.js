import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Table from '@material-ui/core/Table/Table';

import { DownloadFile } from '../../fileStorage/DownloadFile';
import { loadArchivedFilesList } from '../../../actions/calls/fileStorage';
import { ErrorContext } from '../../App';

const styles = theme => ({
  container: {
    overflow: 'auto',
    maxHeight: '200px'
  },
  noArchivedFiles: {
    textAlign: 'center',
    color: theme.palette.primary.mediumGrey,
    paddingBottom: 10
  }
});

const PrHistory = props => {
  const { intl, employeeId } = props;
  const [archivedFiles, setArchivedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  const { classes } = props;

  useEffect(() => {
    loadArchivedFilesList(
      employeeId,
      setArchivedFiles,
      setIsLoading,
      errorContext
    );
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
