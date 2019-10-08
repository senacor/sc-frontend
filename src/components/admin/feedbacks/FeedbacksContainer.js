import React, { useContext, useEffect, useState, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { ErrorContext } from '../../App';
import FeedbackDeleteDialog from './FeedbackDeleteDialog';
import { getFeedbacks } from '../../../calls/feedbacks';
import FeedbackDetailDialog from './FeedbackDetailDialog';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FeedbackRow from './FeedbackRow';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  padding: {
    paddingTop: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit
  },
  tableRow: {
    height: 80,
    cursor: 'pointer',
    '&:hover': {
      transition: 'all 0.3s',
      backgroundColor: theme.palette.secondary.brighterGrey
    }
  }
});

export const FeedbacksContainer = ({ classes, intl }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [idToDelete, setIdToDelete] = useState(null);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getFeedbacks(setData, setIsLoading, errorContext);
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleOnDeleteClick = (event, id) => {
    setIdToDelete(id);
  };

  const handleCloseDeleteDialog = () => {
    setIdToDelete(null);
  };

  return (
    <Fragment>
      {isLoading ? (
        <CircularProgress className={classes.spacing} />
      ) : (
        <Fragment>
          <Paper className={classes.spacing}>
            <Typography className={classes.padding} variant="h5">
              {intl.formatMessage({
                id: 'maintenance.feedbacks'
              })}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'maintenance.sentby'
                    })}`}
                  </TableCell>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'maintenance.type'
                    })}`}
                  </TableCell>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'maintenance.subject'
                    })}`}
                  </TableCell>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'maintenance.message'
                    })}`}
                  </TableCell>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'maintenance.date'
                    })}`}
                  </TableCell>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'maintenance.delete'
                    })}`}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(entry => {
                    return (
                      <FeedbackRow
                        key={entry.id}
                        entry={entry}
                        handleOnDeleteClick={handleOnDeleteClick}
                      />
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': `${intl.formatMessage({
                  id: 'performancereviewtable.previouspage'
                })}`
              }}
              nextIconButtonProps={{
                'aria-label': `${intl.formatMessage({
                  id: 'performancereviewtable.nextpage'
                })}`
              }}
              labelRowsPerPage={intl.formatMessage({
                id: 'performancereviewtable.rowsperpage'
              })}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${intl.formatMessage({
                  id: 'performancereviewtable.from'
                })} ${count}`
              }
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Fragment>
      )}
      <FeedbackDeleteDialog
        id={idToDelete}
        closeDialog={handleCloseDeleteDialog}
        data={data}
        setData={setData}
      />
      <FeedbackDetailDialog />
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbacksContainer));
