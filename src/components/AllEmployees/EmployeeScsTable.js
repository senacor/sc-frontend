import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { sortBySortActive } from '../../helper/sorting';
import { linkToSc } from '../../calls/sc';
import {
  translateClassification,
  translateGeneralStatus
} from '../../helper/string';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT,
  getReadableDateWithoutTime
} from '../../helper/date';
import { downloadScAsPdf } from '../../components/scs/ScSheet/helperFunc.js';
// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import GetApp from '@material-ui/icons/GetApp';
import { useErrorContext } from '../../helper/contextHooks';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  tableHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.secondary.white,
    zIndex: 100,
    marginBottom: 1
  },
  table: {
    overflowY: 'scroll',
    borderCollapse: 'separate'
  },
  zIndexLow: {
    zIndex: 1
  }
});

const EmployeeScsTable = ({ classes, intl, scs, history }) => {
  const error = useErrorContext();
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    periodNameDialog: true,
    createdDateTime: false,
    deadline: false,
    classification: false,
    finalScore: false,
    scStatus: false,
    statusStartTime: false
  });

  const changeDirection = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  };

  const handleSort = column => {
    const newSortActive = { ...sortActive };
    Object.keys(newSortActive).forEach(v => (newSortActive[v] = false));
    switch (column) {
      case 'PERIOD':
        newSortActive.periodNameDialog = true;
        break;
      case 'CREATED_DATE':
        newSortActive.createdDateTime = true;
        break;
      case 'DEADLINE':
        newSortActive.deadline = true;
        break;
      case 'CLASSIFICATION':
        newSortActive.classification = true;
        break;
      case 'FINAL_SCORE':
        newSortActive.finalScore = true;
        break;
      case 'SC_STATUS':
        newSortActive.scStatus = true;
        break;
      case 'STATUS_START_TIME':
        newSortActive.statusStartTime = true;
        break;
      default:
        break;
    }
    setSortActive(newSortActive);
    changeDirection();
  };

  const downloadAsPdf = (e, scId, login) => {
    e.stopPropagation();
    downloadScAsPdf(scId, login, error);
  };

  scs = sortBySortActive(scs, sortActive, sortDirection, intl);
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.periodNameDialog}
              direction={sortDirection}
              onClick={() => handleSort('PERIOD')}
            >
              {intl.formatMessage({ id: 'scdialog.period' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.createdDateTime}
              direction={sortDirection}
              onClick={() => handleSort('CREATED_DATE')}
            >
              {intl.formatMessage({ id: 'scdialog.createddate' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.deadline}
              direction={sortDirection}
              onClick={() => handleSort('DEADLINE')}
            >
              {intl.formatMessage({ id: 'scdialog.deadline' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.classification}
              direction={sortDirection}
              onClick={() => handleSort('CLASSIFICATION')}
            >
              {intl.formatMessage({ id: 'scdialog.classification' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.finalScore}
              direction={sortDirection}
              onClick={() => handleSort('FINAL_SCORE')}
            >
              {intl.formatMessage({ id: 'scdialog.finalscore' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.scStatus}
              direction={sortDirection}
              onClick={() => handleSort('SC_STATUS')}
            >
              {intl.formatMessage({ id: 'scdialog.scstatus' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            <TableSortLabel
              active={sortActive.statusStartTime}
              direction={sortDirection}
              onClick={() => handleSort('STATUS_START_TIME')}
            >
              {intl.formatMessage({ id: 'scdialog.scstatusstarttime' })}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeader}>
            {intl.formatMessage({ id: 'scdialog.pdf' })}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scs.map(sc => {
          return (
            <TableRow
              key={sc.scId}
              onClick={() => linkToSc(sc.scId, history)}
              className={classes.tableRow}
            >
              <TableCell>{sc.periodNameDialog}</TableCell>
              <TableCell>
                {getReadableDateWithoutTime(sc.createdDateTime)}
              </TableCell>
              <TableCell>
                {formatLocaleDateTime(sc.deadline, FRONTEND_DATE_FORMAT)}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  id: translateClassification(sc.classification)
                })}
              </TableCell>
              <TableCell>
                {'READY_TO_CLOSE ARCHIVED'.includes(sc.scStatus) &&
                  `${sc.finalScore}%`}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  id: translateGeneralStatus(sc.scStatus)
                })}
              </TableCell>
              <TableCell>
                {formatLocaleDateTime(sc.statusStartTime, FRONTEND_DATE_FORMAT)}
              </TableCell>
              <TableCell>
                <IconButton
                  className={classes.zIndexLow}
                  onClick={e =>
                    downloadAsPdf(e, sc.scId, sc.deadline, sc.employeeLogin)
                  }
                >
                  <GetApp />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(EmployeeScsTable)));
