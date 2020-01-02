import React, { Fragment, useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import ScContainer from './scContainer/ScContainer';
import ScDetailInformation from './ScDetailInformation';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';
import { addScType, fetchScById } from '../../calls/sc';
import { injectIntl } from 'react-intl';
import { fetchMeeting } from '../../calls/meetings';
import { MeetingContext } from '../App';
import { SC_TAB } from '../../helper/scSheetData';

const styles = theme => ({
  ...theme.styledComponents
});

const ScorecardDetail = ({ match, intl, classes }) => {
  const [sc, setSc] = useState(null);
  const [scTab, setScTab] = useState(SC_TAB.EMPLOYEE);
  const [isLoading, setIsLoading] = useState(false);
  const [classification, setClassification] = useState('');
  const [scTypeSeleted, setScTypeSelected] = useState(undefined);

  const error = useErrorContext();
  const user = useUserinfoContext();
  const { setValue: setMeeting } = useContext(MeetingContext.context);

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

  const afterScFetched = sc => {
    setSc(sc);
    setClassification(sc.classification ? sc.classification : '');
    fetchMeeting(sc, setMeeting, error);
  };

  const handleChangeType = event => {
    setScTypeSelected(event.target.value);
  };

  const handleChangeClassification = event => {
    setClassification(event.target.value);
  };

  const handleSubmitScType = () => {
    if (scTypeSeleted) {
      addScType(
        sc.id,
        scTypeSeleted,
        classification,
        setSc,
        setIsLoading,
        error,
        afterScFetched
      );
    }
  };

  const handleChangeTab = (event, value) => {
    setScTab(value);
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
              classification={classification}
              handleChangeClassification={handleChangeClassification}
              handleChangeType={handleChangeType}
              scTypeSeleted={scTypeSeleted}
              handleSubmitScType={handleSubmitScType}
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
