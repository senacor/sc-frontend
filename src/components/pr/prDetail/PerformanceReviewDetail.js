import React, { useContext, useEffect, useState } from 'react';
import PrState from './PrState';
import PrTabs from './PrTabs';
import PrDetailInformation from './PrDetailInformation';
import { fetchMeeting } from '../../../actions/calls/meetings';
import { fetchPrById } from '../../../actions/calls/pr';
import { ErrorContext, MeetingContext, PrContext } from '../../App';
import CircularProgress from '@material-ui/core/CircularProgress';

const PerformanceReviewDetail = props => {
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const [isLoading, setIsLoading] = useState({});
  let errorContext = useContext(ErrorContext.context);
  const { value: meeting, setValue: setMeeting } = useContext(
    MeetingContext.context
  );

  useEffect(() => {
    const afterPrFetched = pr => {
      setPr(pr);
      fetchMeeting(pr, setMeeting, errorContext);
    };
    fetchPrById(
      props.match.params.id,
      afterPrFetched,
      setIsLoading,
      errorContext
    );
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      {pr ? <PrDetailInformation pr={pr} meeting={meeting} /> : null}
      {pr ? <PrState prById={pr} /> : null}
      {pr ? <PrTabs pr={pr} meeting={meeting} /> : null}
    </React.Fragment>
  );
};

export default PerformanceReviewDetail;
