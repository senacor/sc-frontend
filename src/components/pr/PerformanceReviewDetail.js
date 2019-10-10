import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PrState from './PrState';
import PrTabs from './PrTabs';
import PrDetailInformation from './PrDetailInformation';
import { fetchMeeting } from '../../calls/meetings';
import { fetchPrById } from '../../calls/pr';
import { getAllEmployees, getEmployeeById } from '../../calls/employees';
import {
  ErrorContext,
  MeetingContext,
  PrContext,
  UserinfoContext
} from '../App';
import { isSupervisor } from '../../helper/checkRole';

const PerformanceReviewDetail = props => {
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const { userroles } = useContext(UserinfoContext.context).value;
  const [isLoading, setIsLoading] = useState({});
  const [allEmployeesData, setAllEmployeesData] = useState([]);
  const [employee, setEmployee] = useState({});
  const errorContext = useContext(ErrorContext.context);
  const { value: meeting, setValue: setMeeting } = useContext(
    MeetingContext.context
  );

  useEffect(() => {
    const afterPrFetched = pr => {
      setPr(pr);
      fetchMeeting(pr, setMeeting, errorContext);
      getEmployeeById(pr.employee.id, setEmployee, setIsLoading, errorContext);
    };

    fetchPrById(
      props.match.params.id,
      afterPrFetched,
      setIsLoading,
      errorContext
    );
    if (isSupervisor(userroles)) {
      getAllEmployees(setAllEmployeesData, setIsLoading, errorContext);
    }
  }, []);

  if (isLoading || !pr || Object.entries(pr).length === 0) {
    return <CircularProgress />;
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
      {pr && <PrTabs pr={pr} meeting={meeting} />}
    </React.Fragment>
  );
};

export default PerformanceReviewDetail;
