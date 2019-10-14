import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import { fetchInactivePrById } from '../../calls/pr';
import { ErrorContext, PrContext } from '../App';
import PrTabs from './PrTabs';
import { getInactiveEmployees } from '../../calls/employees';
import InactivePrDetailInformation from './InactivePrDetailInformation';

const styles = theme => ({
  ...theme.styledComponents
});

const InactivePerformanceReviewDetail = props => {
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const [isLoading, setIsLoading] = useState({});
  const [allEmployeesData, setAllEmployeesData] = useState([]);
  const errorContext = useContext(ErrorContext.context);
  const { classes } = props;

  useEffect(() => {
    const afterPrFetched = pr => {
      setPr(pr);
    };
    fetchInactivePrById(
      props.match.params.id,
      afterPrFetched,
      setIsLoading,
      errorContext
    );
    getInactiveEmployees(setAllEmployeesData, setIsLoading, errorContext);
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
        <InactivePrDetailInformation
          pr={pr}
          allEmployeesData={allEmployeesData}
        />
      )}
      {pr && <PrTabs pr={pr} formerEmployee={true} fromInactive={true} />}
    </React.Fragment>
  );
};

export default withStyles(styles)(InactivePerformanceReviewDetail);
