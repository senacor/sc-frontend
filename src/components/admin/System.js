import React, { useContext, useEffect, useState, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, Grid, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteError, getHealthcheckData } from '../../calls/admin';
import { getReadableDate } from '../../helper/date';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import { ErrorContext } from '../App';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  padding: {
    paddingTop: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit
  },
  card: {
    flexGrow: 1,
    margin: 3 * theme.spacing.unit,
    marginBottom: 0,
    textDecoration: 'none'
  },
  padded: {
    paddingRight: theme.spacing.unit
  },
  error: {
    color: theme.palette.secondary.darkRed,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  success: {
    color: theme.palette.secondary.green,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  noinfo: {
    color: theme.palette.secondary.yellow,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const initialData = {
  fis: null,
  outlook: null,
  errors: []
};

export const System = ({ classes, intl }) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getHealthcheckData(setData, setIsLoading, errorContext);
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleOnDeleteClick = (event, id) => {
    deleteError(id, errorContext);
    let newData = { ...data };
    newData.errors = data.errors.filter(e => e.id !== id);
    setData(newData);
  };

  const renderStatusByType = connection => {
    const renderStatusParametrized = (classes, icon, message, date) => (
      <div className={classes}>
        {icon}
        <Typography color="textSecondary">
          {intl.formatMessage({
            id: message
          })}
        </Typography>
        {date !== null && (
          <Typography color="textSecondary">
            {`${intl.formatMessage({
              id: 'system.lastupdate'
            })} ${getReadableDate(date)}`}
          </Typography>
        )}
      </div>
    );

    if (!data[connection]) {
      return renderStatusParametrized(
        classes.noinfo,
        <WarningIcon className={classes.padded} />,
        'system.noinfo',
        null
      );
    }

    if (data[connection].success) {
      return renderStatusParametrized(
        classes.success,
        <SuccessIcon className={classes.padded} />,
        'system.successful',
        data[connection].date
      );
    } else {
      return renderStatusParametrized(
        classes.error,
        <ErrorIcon className={classes.padded} />,
        'system.failed',
        data[connection].date
      );
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <CircularProgress className={classes.spacing} />
      ) : (
        <Fragment>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5">
                    {intl.formatMessage({
                      id: 'system.fis'
                    })}
                  </Typography>
                  {renderStatusByType('fis')}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5">
                    {intl.formatMessage({
                      id: 'system.outlook'
                    })}
                  </Typography>
                  {renderStatusByType('outlook')}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper className={classes.spacing}>
            <Typography className={classes.padding} variant="h5">
              {intl.formatMessage({
                id: 'system.errors'
              })}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'system.id'
                    })}`}
                  </TableCell>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'system.description'
                    })}`}
                  </TableCell>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'system.date'
                    })}`}
                  </TableCell>
                  <TableCell>
                    {`${intl.formatMessage({
                      id: 'system.delete'
                    })}`}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.errors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(entry => {
                    return (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.id}</TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell>{getReadableDate(entry.date)}</TableCell>
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
              count={data.errors.length}
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
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(System));
