import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import EmployeeFilter from '../../admin/EmployeeFilter';

const styles = theme => ({});

const ScsToDelegateTable = ({
  employeesInTeam,
  reviewers,
  setReviewers,
  allEmployees,
  intl
}) => {
  const selectReviewer = () => {
    //
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>
              {intl.formatMessage({ id: 'scstodelegate.employee' })}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {intl.formatMessage({ id: 'scstodelegate.selectedreviewers' })}
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employeesInTeam.map((entry, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{`${entry.firstName} ${entry.lastName}`}</TableCell>
              <TableCell>
                <Fragment>
                  {reviewers[index].reviewerName}
                  <EmployeeFilter
                    data={allEmployees}
                    setSelectedEmployee={selectReviewer}
                    settingReviewers
                  />
                </Fragment>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScsToDelegateTable)));
