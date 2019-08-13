import React, { useContext, useEffect, useState } from 'react';
import PrState from './PrState';
import PrTabs from './PrTabs';
import PrDetailInformation from './PrDetailInformation';
import { fetchMeeting } from '../../../actions/calls/meetings';
import CircularProgress from '../../fileStorage/ArchivedFiles';
import { fetchPrById } from '../../../actions/calls/pr';
import {ErrorContext, MeetingContext} from '../../App';

const PerformanceReviewDetail = props => {
  const [pr, setPr] = useState({});
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
      {pr ? <PrState /> : null}
      {pr ? <PrTabs pr={pr} meeting={meeting} /> : null}
    </React.Fragment>
  );
};

export default PerformanceReviewDetail;
