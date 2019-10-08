import React, { useContext, useEffect, useState, Fragment } from 'react';
import { ErrorContext } from '../../App';
import FeedbackDeleteDialog from './FeedbackDeleteDialog';
import { getFeedbacks } from '../../../calls/feedbacks';
import FeedbackDetailDialog from './FeedbackDetailDialog';
import FeedbackRow from './FeedbackRow';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FeedbackIcon from '@material-ui/icons/Feedback';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    '& h5': {
      paddingLeft: theme.spacing.unit
    }
  },
  panelDetails: {
    width: '100%',
    textAlign: 'center'
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

const FeedbackTable = ({ classes, intl }) => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [idToDelete, setIdToDelete] = useState(null);

  const errorContext = useContext(ErrorContext.context);

  useEffect(
    () => {
      if (expanded && data.length === 0) {
        getFeedbacks(setData, setIsLoading, errorContext);
      }
    },
    [expanded]
  );

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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <Fragment>
      <Paper className={classes.spacing}>
        <ExpansionPanel expanded={expanded} onChange={toggleExpand}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.header}>
              <FeedbackIcon color={'primary'} />
              <Typography variant="h5">
                {intl.formatMessage({
                  id: 'maintenance.feedbacks'
                })}
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.panelDetails}>
              {isLoading ? (
                <CircularProgress />
              ) : (
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
              )}
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
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
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

export default injectIntl(withStyles(styles)(FeedbackTable));
