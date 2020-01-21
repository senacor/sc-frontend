import React, { Fragment, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import ScContainer from './scContainer/ScContainer';
import ScDetailInformation from './ScDetailInformation';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';
import { addScType, fetchScById } from '../../calls/sc';
import { injectIntl } from 'react-intl';
import { SC_STATUS, SC_TAB } from '../../helper/scSheetData';

const styles = theme => ({
  ...theme.styledComponents
});

const ScorecardDetail = ({ match, intl, classes }) => {
  const [sc, setSc] = useState(null);
  const [scTab, setScTab] = useState(SC_TAB.MY_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [classification, setClassification] = useState('');
  const [scTypeSelected, setScTypeSelected] = useState(undefined);
  const [dailyBusinesses, setDailyBusinesses] = useState([]);
  const [projects, setProjects] = useState([]);

  const user = useUserinfoContext();
  const error = useErrorContext();

  useEffect(() => {
    fetchScById(match.params.id, setSc, setIsLoading, error, afterScFetched);
  }, []);

  const afterScFetched = sc => {
    setSc(sc);
    setScTab(
      (user.isReviewerInSc(sc) || user.isOwnerInSc(sc)) &&
        !sc.statusSet.includes(SC_STATUS.CLOSED)
        ? SC_TAB.MY_DATA
        : SC_TAB.SUMMARY
    );
    setClassification(sc.classification ? sc.classification : '');
  };

  const handleChangeType = event => {
    setScTypeSelected(event.target.value);
  };

  const handleChangeClassification = event => {
    setClassification(event.target.value);
  };

  const handleSubmitScType = () => {
    if (scTypeSelected) {
      addScType(
        sc.id,
        scTypeSelected,
        classification,
        dailyBusinesses,
        projects,
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
              scTypeSelected={scTypeSelected}
              handleSubmitScType={handleSubmitScType}
              setSc={setSc}
              setIsLoading={setIsLoading}
              afterScFetched={afterScFetched}
              dailyBusinesses={dailyBusinesses}
              setDailyBusinesses={setDailyBusinesses}
              projects={projects}
              setProjects={setProjects}
            />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScorecardDetail));
