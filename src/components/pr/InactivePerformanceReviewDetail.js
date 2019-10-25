import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import { fetchInactivePrById } from '../../calls/pr';
import { PrContext } from '../App';
import PrTabs from './PrTabs';
import { getInactiveEmployees } from '../../calls/employees';
import InactivePrDetailInformation from './InactivePrDetailInformation';
import { useErrorContext } from '../../helper/contextHooks';

const styles = theme => ({
  ...theme.styledComponents
});

const InactivePerformanceReviewDetail = props => {
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const [isLoading, setIsLoading] = useState({});
  const [allEmployeesData, setAllEmployeesData] = useState([]);
  const error = useErrorContext();
  const { classes, onReady, printMode } = props;

  useEffect(() => {
    const afterPrFetched = pr => {
      setPr(pr);
      if (onReady) {
        onReady();
      }
    };
    fetchInactivePrById(
      props.match.params.id,
      afterPrFetched,
      setIsLoading,
      error
    );
    getInactiveEmployees(setAllEmployeesData, setIsLoading, error);
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
      {pr && (
        <PrTabs
          printMode={printMode}
          pr={pr}
          formerEmployee={true}
          fromInactive={true}
        />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(InactivePerformanceReviewDetail);
