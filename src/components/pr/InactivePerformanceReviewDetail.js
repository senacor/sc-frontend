import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PrDetailInformation from './PrDetailInformation';
import { fetchInactivePrById } from '../../calls/pr';
import { ErrorContext, PrContext } from '../App';
import PrSheet from './PrSheet';

const InactivePerformanceReviewDetail = props => {
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const [isLoading, setIsLoading] = useState({});
  const errorContext = useContext(ErrorContext.context);

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
  }, []);

  if (isLoading || !pr || Object.entries(pr).length === 0) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      {pr && <PrDetailInformation pr={pr} />}
      {pr && <PrSheet pr={pr} />}
    </React.Fragment>
  );
};

export default InactivePerformanceReviewDetail;
