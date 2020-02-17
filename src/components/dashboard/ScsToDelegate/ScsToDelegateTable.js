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

const styles = theme => ({
  reviewerCell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const ScsToDelegateTable = ({
  employeesInTeam,
  setEmployeesInTeam,
  allEmployees,
  classes,
  intl
}) => {
  const changeReviewer = (reviewer, index) => {
    const newEmployeesInTeam = [...employeesInTeam];
    newEmployeesInTeam[index].reviewerId = reviewer.id;
    newEmployeesInTeam[index].reviewerFirstName = reviewer.firstName;
    newEmployeesInTeam[index].reviewerLastName = reviewer.lastName;
    setEmployeesInTeam(newEmployeesInTeam);
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
              <TableCell>
                {`${entry.employeeLastName}, ${entry.employeeFirstName}`}
              </TableCell>
              <TableCell>
                <div className={classes.reviewerCell}>
                  <Typography>
                    {`${entry.reviewerLastName}, ${entry.reviewerFirstName}`}
                  </Typography>
                  <EmployeeFilter
                    data={allEmployees}
                    setSelectedEmployee={changeReviewer}
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
