import React, { useContext, useEffect, useState, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import { getFeedbacks } from '../../calls/admin';
import { getReadableDate } from '../../helper/date';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ErrorContext } from '../App';
import FeedbackDeleteDialog from './FeedbackDeleteDialog';
import MaintenanceTeamTable from './MaintenanceTeamTable';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  padding: {
    paddingTop: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit
  }
});

export const Feedbacks = ({ classes, intl }) => {
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
      <MaintenanceTeamTable />
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
                  .map((entry, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{`${entry.senderfirstName} ${
                          entry.senderLastName
                        }`}</TableCell>
                        <TableCell>{entry.context}</TableCell>
                        <TableCell>{entry.subject}</TableCell>
                        <TableCell>{entry.body}</TableCell>
                        <TableCell>{getReadableDate(entry.sentAt)}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={event =>
                              handleOnDeleteClick(event, entry.id)
                            }
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
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
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(Feedbacks));
