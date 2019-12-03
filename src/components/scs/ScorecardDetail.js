import React, { Fragment, useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import ScContainer from './scContainer/ScContainer';
import ScDetailInformation from './ScDetailInformation';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';
import { fetchScById, addScStatus, addScType } from '../../calls/sc';
import { injectIntl } from 'react-intl';
import { fetchMeeting } from '../../calls/meetings';
import { MeetingContext } from '../App';
import { SC_TAB, SC_STATUS } from '../../helper/scSheetData';

const styles = theme => ({
  ...theme.styledComponents
});

const ScorecardDetail = ({ match, intl, classes }) => {
  const [sc, setSc] = useState(null);
  const [scTab, setScTab] = useState(SC_TAB.EMPLOYEE);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState('');
  const [scTypeSeleted, setScTypeSelected] = useState(undefined);

  const error = useErrorContext();
  const user = useUserinfoContext();
  const { setValue: setMeeting } = useContext(MeetingContext.context);

  const afterScFetched = sc => {
    setSc(sc);
    setPosition(sc.position);
    fetchMeeting(sc, setMeeting, error);
  };

  const handleChangeType = event => {
    setScTypeSelected(event.target.value);
  };

  const handleChangePosition = event => {
    setPosition(event.target.value);
  };

  const handleSubmitScType = () => {
    if (scTypeSeleted) {
      addScType(
        sc.id,
        scTypeSeleted,
        position,
        setSc,
        setIsLoading,
        error,
        afterScFetched
      );
    }
  };

  useEffect(() => {
    fetchScById(match.params.id, setSc, setIsLoading, error, afterScFetched);
  }, []);

  useEffect(
    () => {
      if (sc && user.isReviewerInSc(sc)) {
        setScTab(SC_TAB.REVIEWER);
      } else {
        setScTab(SC_TAB.EMPLOYEE);
      }
    },
    [sc]
  );

  const handleChangeTab = (event, value) => {
    setScTab(value);
  };

  const handleMeetingConfirm = () => {
    addScStatus(
      sc.id,
      SC_STATUS.MEETING_CONFIRMED,
      setSc,
      setIsLoading,
      error,
      afterScFetched
    );
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className={classes.progressBarCentered}>
          <CircularProgress />
        </div>
      ) : (
        sc && (
          <Fragment>
            <ScDetailInformation sc={sc} />
            <ScContainer
              sc={sc}
              tabValue={scTab}
              handleChangeTab={handleChangeTab}
              position={position}
              handleChangePosition={handleChangePosition}
              handleChangeType={handleChangeType}
              scTypeSeleted={scTypeSeleted}
              handleSubmitScType={handleSubmitScType}
              handleMeetingConfirm={handleMeetingConfirm}
              setSc={setSc}
              setIsLoading={setIsLoading}
              afterScFetched={afterScFetched}
            />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScorecardDetail));
