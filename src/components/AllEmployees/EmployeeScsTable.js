import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { sortBySortActive } from '../../helper/filterFunctions';
import { linkToSc } from '../../calls/sc';
import { modifyString } from '../../helper/string';
import { formatLocaleDateTime } from '../../helper/date';
import { FRONTEND_DATE_FORMAT } from '../../helper/date';

// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import GetApp from '@material-ui/icons/GetApp';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  }
});

const EmployeeScsTable = ({ classes, intl, scs, history }) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    createdDate: true,
    deadline: false,
    classification: false,
    finalScore: false,
    scStatus: false,
    scStatusStartTime: false
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
      case 'CREATED_DATE':
        newSortActive.createdDate = true;
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
      case 'SC_STATUS_START_TIME':
        newSortActive.scStatusStartTime = true;
        break;
      default:
        break;
    }
    setSortActive(newSortActive);
    changeDirection();
  };

  const downloadAsPdf = scId => {};

  sortBySortActive(scs, sortActive, sortDirection);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sortActive.createdDate}
              direction={sortDirection}
              onClick={() => handleSort('CREATED_DATE')}
            >
              {intl.formatMessage({ id: 'scdialog.createddate' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.deadline}
              direction={sortDirection}
              onClick={() => handleSort('DEADLINE')}
            >
              {intl.formatMessage({ id: 'scdialog.deadline' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.classification}
              direction={sortDirection}
              onClick={() => handleSort('CLASSIFICATION')}
            >
              {intl.formatMessage({ id: 'scdialog.classification' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.finalScore}
              direction={sortDirection}
              onClick={() => handleSort('FINAL_SCORE')}
            >
              {intl.formatMessage({ id: 'scdialog.finalscore' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.scStatus}
              direction={sortDirection}
              onClick={() => handleSort('SC_STATUS')}
            >
              {intl.formatMessage({ id: 'scdialog.scstatus' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortActive.scStatusStartTime}
              direction={sortDirection}
              onClick={() => handleSort('SC_STATUS_START_TIME')}
            >
              {intl.formatMessage({ id: 'scdialog.scstatusstarttime' })}
            </TableSortLabel>
          </TableCell>
          <TableCell>{intl.formatMessage({ id: 'scdialog.pdf' })}</TableCell>
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
              <TableCell>
                {formatLocaleDateTime(sc.createdDate, FRONTEND_DATE_FORMAT)}
              </TableCell>
              <TableCell>
                {formatLocaleDateTime(sc.deadline, FRONTEND_DATE_FORMAT)}
              </TableCell>
              <TableCell>{modifyString(sc.classification)}</TableCell>
              <TableCell>{`${sc.finalScore}%`}</TableCell>
              <TableCell>{modifyString(sc.status)}</TableCell>
              <TableCell>
                {formatLocaleDateTime(sc.statusStartTime, FRONTEND_DATE_FORMAT)}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => downloadAsPdf(sc.scId)}>
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
