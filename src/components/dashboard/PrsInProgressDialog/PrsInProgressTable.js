import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { modifyString } from '../../../helper/string';
import { linkToPr } from '../../../calls/pr';
import {
  checkFilterValues,
  handleProgressFilterActive
} from '../../../helper/filterFunctions';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  employeeNameCell: { maxWidth: 100 }
});

export const checkDateFilter = (filterInput, prDate) => {
  if (filterInput) {
    return filterInput === formatLocaleDateTime(prDate, 'YYYY-MM-DD');
  } else {
    return true;
  }
};

export const filterPrs = (prs, filterInputs) => {
  return prs.filter(pr => {
    const employeeName = pr.employeeFirstName + ' ' + pr.employeeLastName;
    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.searchSupervisor, pr.supervisor) &&
      checkDateFilter(filterInputs.date, pr.startDate) &&
      checkFilterValues(filterInputs.position, pr.currentPosition) &&
      checkFilterValues(filterInputs.occasion, pr.prOccasion)
    );
  });
};

const PrsInProgressTable = ({ classes, intl, prs, history, filterInputs }) => {
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    handleProgressFilterActive(filterInputs, setFilterActive);
  });

  const filteredPrs = filterPrs(prs, filterInputs);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {intl.formatMessage({ id: 'meetingcreator.employee' })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({ id: 'employeeInfo.positionAbrv' })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({ id: 'employeeInfo.supervisor' })}
          </TableCell>
          <TableCell>
            {intl.formatMessage({ id: 'employeeInfo.startDate' })}
          </TableCell>
          <TableCell>{intl.formatMessage({ id: 'pr.occasion' })}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filterActive
          ? filteredPrs.map(pr => {
              const employeeName = `${pr.employeeFirstName} ${
                pr.employeeLastName
              }`;
              return (
                <TableRow
                  key={pr.prId}
                  onClick={() => linkToPr(pr.prId, null, history)}
                  className={classes.tableRow}
                >
                  <TableCell className={classes.employeeNameCell}>
                    {employeeName}
                  </TableCell>
                  <TableCell>{pr.currentPosition}</TableCell>
                  <TableCell>{pr.supervisor}</TableCell>
                  <TableCell>
                    {formatLocaleDateTime(pr.startDate, FRONTEND_DATE_FORMAT)}
                  </TableCell>
                  <TableCell>{modifyString(pr.prOccasion)}</TableCell>
                </TableRow>
              );
            })
          : prs.map(pr => {
              const employeeName = `${pr.employeeFirstName} ${
                pr.employeeLastName
              }`;
              return (
                <TableRow
                  key={pr.prId}
                  onClick={() => linkToPr(pr.prId, null, history)}
                  className={classes.tableRow}
                >
                  <TableCell className={classes.employeeNameCell}>
                    {employeeName}
                  </TableCell>
                  <TableCell>{pr.currentPosition}</TableCell>
                  <TableCell>{pr.supervisor}</TableCell>
                  <TableCell>
                    {formatLocaleDateTime(pr.startDate, FRONTEND_DATE_FORMAT)}
                  </TableCell>
                  <TableCell>{modifyString(pr.prOccasion)}</TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PrsInProgressTable)));
