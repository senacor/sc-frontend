import React, { Fragment, useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import ScTabs from './ScTabs';
import ScDetailInformation from './ScDetailInformation';
import { useErrorContext } from '../../helper/contextHooks';
import { MeetingContext } from '../App';
import { fetchScById } from '../../calls/sc';
import { fetchMeeting } from '../../calls/meetings';

const styles = theme => ({
  ...theme.styledComponents
});

const ScorecardDetail = ({ match }) => {
  const [sc, setSc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const error = useErrorContext();
  const { value: meeting, setValue: setMeeting } = useContext(
    MeetingContext.context
  );

  useEffect(() => {
    const afterScFetched = sc => {
      setSc(sc);
      fetchMeeting(sc, setMeeting, error);
    };

    fetchScById(match.params.id, setSc, setIsLoading, error, afterScFetched);
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        sc && (
          <Fragment>
            <ScDetailInformation sc={sc} />
            <ScTabs sc={sc} />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default withStyles(styles)(ScorecardDetail);
