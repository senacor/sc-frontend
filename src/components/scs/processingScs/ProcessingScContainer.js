import React, { Fragment, useEffect, useState } from 'react';
import { CircularProgress, Grid, Tooltip, withStyles } from '@material-ui/core';
import ProcessingScsCard from './ProcessingScCard';
import { useErrorContext } from '../../../helper/contextHooks';
import { getScsToReview } from '../../../calls/sc';
import { translateGeneralStatus } from '../../../helper/string';
import { injectIntl } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import TableViewIcon from '@material-ui/icons/List';
import CardsViewIcon from '@material-ui/icons/AccountBox';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ScTableHead from './ScTableHead';
import ScTableRow from './ScTableRow';
import { sortBySortActive } from '../../../helper/filterFunctions';

const styles = theme => ({
  ...theme,
  container: {
    height: '70vh',
    padding: 3 * theme.spacing.unit,
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  padding: 3 * theme.spacing.unit,
  setViewBtn: {
    position: 'fixed',
    right: 13 * theme.spacing.unit,
    top: theme.spacing.unit,
    zIndex: 3,
    color: theme.palette.secondary.white
  },
  paper: {
    width: '100%',
    margin: 2 * theme.spacing.unit,
    overflow: 'auto'
  },
  gridContainer: {
    paddingTop: 2 * theme.spacing.unit,
    textAlign: 'center'
  }
});

const ProcessingScContainer = ({ classes, intl }) => {
  const [processingScs, setProcessingScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    employeeLastName: true,
    createdDate: false,
    deadline: false,
    currentStatus: false,
    periodNameCD: false
  });
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const error = useErrorContext();

  useEffect(() => {
    if (localStorage.getItem('view') === 'table') {
      setTableView(true);
    }
    getScsToReview(setProcessingScs, setIsLoading, error);
  }, []);

  const toggleChangeView = () => {
    if (tableView) {
      localStorage.setItem('view', 'cards');
      setTableView(false);
    } else {
      localStorage.setItem('view', 'table');
      setTableView(true);
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const sortedScs = sortBySortActive(processingScs, sortActive, sortDirection);

  const sortedScsByLastName = [...processingScs].sort((a, b) => {
    const collator = Intl.Collator('de');
    if (collator.compare(a.employeeLastName, b.employeeLastName) < 0) {
      return -1;
    } else if (collator.compare(a.employeeLastName, b.employeeLastName) > 0) {
      return 1;
    } else {
      if (collator.compare(a.employeeFirstName, b.employeeFirstName) < 0) {
        return -1;
      } else if (
        collator.compare(a.employeeFirstName, b.employeeFirstName) > 0
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  });
  const listOfProcessingScs = sortedScsByLastName.map((sc, index) => {
    return (
      <Grid item key={index} className={classes.padding}>
        <ProcessingScsCard
          sc={sc}
          status={translateGeneralStatus(sc.scStatus)}
        />
      </Grid>
    );
  });

  return (
    <div className={classes.container}>
      <IconButton className={classes.setViewBtn} onClick={toggleChangeView}>
        <Tooltip
          title={
            tableView
              ? intl.formatMessage({ id: 'switchView.cards' })
              : intl.formatMessage({ id: 'switchView.table' })
          }
        >
          <span>{tableView ? <TableViewIcon /> : <CardsViewIcon />}</span>
        </Tooltip>
      </IconButton>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          {tableView ? (
            <Grid container spacing={40}>
              <Paper className={classes.paper}>
                <Table>
                  <ScTableHead
                    sortActive={sortActive}
                    setSortActive={setSortActive}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  />
                  <TableBody>
                    {sortedScs.map((sc, index) => {
                      return (
                        <ScTableRow
                          key={index}
                          sc={sc}
                          status={translateGeneralStatus(sc.scStatus)}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={sortedScs.length}
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
            </Grid>
          ) : (
            <Grid container spacing={40}>
              {listOfProcessingScs}
            </Grid>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(ProcessingScContainer));
