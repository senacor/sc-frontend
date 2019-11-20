import React, { Fragment, useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import ScTabs from './ScTabs';
import ScDetailInformation from './ScDetailInformation';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';
import { fetchScById } from '../../calls/sc';
import { injectIntl } from 'react-intl';
import { fetchMeeting } from '../../calls/meetings';
import { MeetingContext } from '../App';

const styles = theme => ({
  ...theme.styledComponents
});

const ScorecardDetail = ({ match, intl, classes }) => {
  const [sc, setSc] = useState(null);
  const [scTab, setScTab] = useState('SC_EMPLOYEE');
  const [isLoading, setIsLoading] = useState(false);
  const error = useErrorContext();
  const user = useUserinfoContext();
  const { setValue: setMeeting } = useContext(MeetingContext.context);

  useEffect(() => {
    const afterScFetched = sc => {
      setSc(sc);
      fetchMeeting(sc, setMeeting, error);
    };

    fetchScById(match.params.id, setSc, setIsLoading, error, afterScFetched);
  }, []);

  useEffect(
    () => {
      if (sc && user.isReviewerInSc(sc)) {
        setScTab('SC_REVIEWER');
      } else {
        setScTab('SC_EMPLOYEE');
      }
    },
    [sc]
  );

  const handleChangeTab = (event, value) => {
    setScTab(value);
  };

  return (
    <Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        sc && (
          <Fragment>
            <ScDetailInformation sc={sc} />
            <ScTabs
              sc={sc}
              tabValue={scTab}
              handleChangeTab={handleChangeTab}
            />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScorecardDetail));
