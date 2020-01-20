import React from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  reviewerCell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const ScsToDelegateTable = ({
  employeesInTeam,
  reviewers,
  setReviewers,
  allEmployees,
  classes,
  intl
}) => {
  const selectReviewer = (reviewer, index) => {
    const newReviewers = [...reviewers];
    newReviewers[index] = Object.assign({
      reviewerId: reviewer.id,
      reviewerName: `${reviewer.firstName} ${reviewer.lastName}`
    });
    setReviewers(newReviewers);
  };

  if (reviewers.length === 0) {
    return <CircularProgress />;
  }

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
                <div className={classes.reviewerCell}>
                  <Typography>{reviewers[index].reviewerName}</Typography>
                  <EmployeeFilter
                    data={allEmployees}
                    setSelectedEmployee={selectReviewer}
                    settingReviewers
                    index={index}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScsToDelegateTable)));
