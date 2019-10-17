import React, { useContext, useEffect, useState, Fragment } from 'react';
import { ErrorContext } from '../../App';
import { deleteFeedbacks, getFeedbacks } from '../../../calls/feedbacks';
import FeedbackRow from './FeedbackRow';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import ConfirmDialog from '../../utils/ConfirmDialog';

// Material UI
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
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
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h5': {
      paddingLeft: theme.spacing.unit
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit
  },
  panelDetails: {
    width: '100%',
    textAlign: 'center',
    overflow: 'auto'
  },
  tableRow: {
    height: 80,
    cursor: 'pointer',
    '&:hover': {
      transition: 'all 0.3s',
      backgroundColor: theme.palette.secondary.brighterGrey
    }
  },
  checkboxCell: {
    padding: 0
  },
  deleteAllButton: {
    border: `1px solid ${theme.palette.secondary.grey}`,
    height: 38,
    minWidth: 160,
    marginTop: 0
  },
  deleteAllText: {
    color: theme.palette.secondary.darkRed
  },
  buttons: {
    color: theme.palette.secondary.white
  },
  dialog: {
    minWidth: 500
  },
  deleteIcon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.secondary.darkRed
  }
});

const FeedbackTable = ({ classes, intl }) => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleOnDeleteClick = event => {
    if (selected.length > 0) {
      setDialogOpen(true);
    }
    event.stopPropagation();
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    setSelected([]);
  };

  const handleOnAllClick = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map(entry => entry.id));
    }
  };

  const handleOnYesClick = () => {
    deleteFeedbacks(selected, errorContext);
    setData(data.filter(entry => !selected.includes(entry.id)));
    setSelected([]);
    setDialogOpen(false);
  };

  const changeSelectedItem = id => {
    if (selected.includes(id)) {
      setSelected(selected.filter(selectedId => selectedId !== id));
    } else {
      const newSelected = [...selected];
      newSelected.push(id);
      setSelected(newSelected);
    }
  };

  const checkSelectedAll = () => {
    return selected.length === data.length && data.length > 0;
  };

  return (
    <Fragment>
      <Paper className={classes.spacing}>
        <ExpansionPanel expanded={expanded} onChange={toggleExpand}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.header}>
              <div className={classes.title}>
                <FeedbackIcon color={'primary'} />
                <Typography variant="h5">
                  {intl.formatMessage({
                    id: 'maintenance.feedbacks'
                  })}
                </Typography>
              </div>
              {selected.length > 0 && (
                <Button
                  className={classes.deleteAllButton}
                  onClick={handleOnDeleteClick}
                >
                  <DeleteIcon className={classes.deleteIcon} />
                  <Typography
                    variant="button"
                    className={classes.deleteAllText}
                  >
                    {intl.formatMessage({
                      id: 'maintenance.delete'
                    })}
                  </Typography>
                </Button>
              )}
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
                      <TableCell className={classes.checkboxCell}>
                        <Checkbox
                          checked={checkSelectedAll()}
                          onChange={handleOnAllClick}
                        />
                      </TableCell>
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
                            selected={selected.includes(entry.id)}
                            changeSelectedItem={changeSelectedItem}
                            handleOnDeleteClick={handleOnDeleteClick}
                          />
                        );
                      })}
                  </TableBody>
                </Table>
              )}
              <ConfirmDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                handleConfirm={handleOnYesClick}
                confirmationText={intl.formatMessage({
                  id: 'feedbacktable.areyousure'
                })}
                confirmationHeader={intl.formatMessage({
                  id: 'feedbacktable.confirmdialogtitle'
                })}
              />
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
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackTable));
