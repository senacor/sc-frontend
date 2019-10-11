import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchInactivePrById } from '../../calls/pr';
import { ErrorContext, PrContext, UserinfoContext } from '../App';
import PrTabs from './PrTabs';
import { isPersonalDev } from '../../helper/checkRole';
import { getInactiveEmployees } from '../../calls/employees';
import InactivePrDetailInformation from './InactivePrDetailInformation';

const InactivePerformanceReviewDetail = props => {
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const { userroles } = useContext(UserinfoContext.context).value;
  const [isLoading, setIsLoading] = useState({});
  const [allEmployeesData, setAllEmployeesData] = useState([]);
  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    const afterPrFetched = pr => {
      setPr(pr);
      if (isPersonalDev(userroles)) {
        getInactiveEmployees(setAllEmployeesData, setIsLoading, errorContext);
      }
    };

    fetchInactivePrById(
      props.match.params.id,
      afterPrFetched,
      setIsLoading,
      errorContext
    );
  }, []);

  if (isLoading || !pr || Object.entries(pr).length === 0) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      {pr && (
        <InactivePrDetailInformation
          pr={pr}
          allEmployeesData={allEmployeesData}
        />
      )}
      {pr && <PrTabs pr={pr} formerEmployee={true} />}
    </React.Fragment>
  );
};

export default InactivePerformanceReviewDetail;
