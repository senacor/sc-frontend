import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import PrState from './PrState';
import PrTabs from './PrTabs';
import PrDetailInformation from './PrDetailInformation';
import { fetchMeeting } from '../../calls/meetings';
import { fetchPrById } from '../../calls/pr';
import { getAllEmployees, getEmployeeById } from '../../calls/employees';
import { MeetingContext, PrContext, UserinfoContext } from '../App';
import { isSupervisor } from '../../helper/checkRole';
import { useErrorContext } from '../../helper/contextHooks';

const styles = theme => ({
  ...theme.styledComponents
});

const PerformanceReviewDetail = props => {
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const { userroles } = useContext(UserinfoContext.context).value;
  const [isLoading, setIsLoading] = useState({});
  const [allEmployeesData, setAllEmployeesData] = useState([]);
  const [employee, setEmployee] = useState({});
  const error = useErrorContext();
  const { value: meeting, setValue: setMeeting } = useContext(
    MeetingContext.context
  );
  const { classes, onReady, printMode } = props;

  useEffect(() => {
    const afterPrFetched = pr => {
      setPr(pr);
      fetchMeeting(pr, setMeeting, error);
      getEmployeeById(
        pr.employee.id,
        result => {
          setEmployee(result);
          if (onReady) {
            onReady();
          }
        },
        setIsLoading,
        error
      );
    };

    fetchPrById(
      props.match.params.id,
      afterPrFetched,
      setIsLoading,
      error
    );

    if (isSupervisor(userroles)) {
      getAllEmployees(setAllEmployeesData, setIsLoading, error);
    }
  }, []);

  if (isLoading || !pr || Object.entries(pr).length === 0) {
    return (
      <div className={classes.progressBarCentered}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <React.Fragment>
      {pr && (
        <PrDetailInformation
          pr={pr}
          meeting={meeting}
          allEmployeesData={allEmployeesData}
          employee={employee}
        />
      )}
      {pr && <PrState prById={pr} />}
      {pr && <PrTabs printMode={printMode} pr={pr} meeting={meeting} />}
    </React.Fragment>
  );
};

export default withStyles(styles)(PerformanceReviewDetail);
