import React, { Fragment, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import ScContainer from './scContainer/ScContainer';
import ScDetailInformation from './ScDetailInformation';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../helper/contextHooks';
import {
  fetchScById,
  importFromSpecificSc,
  importLastSc,
  publishScInit,
  saveScInit
} from '../../calls/sc';
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
  const info = useInfoContext();

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

    const getScTypeState = () => {
      const validStatuses = [
        SC_STATUS.WITH_PR,
        SC_STATUS.WITHOUT_PR,
        SC_STATUS.SC_WITH_PR_PRESET,
        SC_STATUS.SC_WITHOUT_PR_PRESET
      ];
      return validStatuses.reduce((acc, statusFlag) => {
        if (acc) {
          return acc;
        }
        if (sc.statusSet.includes(statusFlag)) {
          acc = statusFlag;
        }
        return acc;
      }, undefined);
    };
    setScTypeSelected(getScTypeState());
  };

  const handleChangeType = event => {
    setScTypeSelected(event.target.value);
  };

  const handleSubmitScType = () => {
    if (scTypeSelected) {
      const dailyBusinessesWithoutNulls = [...dailyBusinesses].filter(
        entry => entry !== null
      );
      const projectsWithoutNulls = [...projects].filter(
        entry => entry !== null
      );
      publishScInit(
        sc.id,
        scTypeSelected,
        classification,
        dailyBusinessesWithoutNulls,
        projectsWithoutNulls,
        sc.initScTemplate,
        setSc,
        setIsLoading,
        error,
        afterScFetched,
        info
      );
    }
  };

  const handleSaveInit = () => {
    const dailyBusinessesWithoutNulls = [...dailyBusinesses].filter(
      entry => entry !== null
    );
    const projectsWithoutNulls = [...projects].filter(entry => entry !== null);
    saveScInit(
      sc.id,
      scTypeSelected,
      classification,
      dailyBusinessesWithoutNulls,
      projectsWithoutNulls,
      sc.initScTemplate,
      setSc,
      setIsLoading,
      error,
      afterScFetched,
      info
    );
  };

  const handleChangeTab = (event, value) => {
    setScTab(value);
  };

  const importSc = importAction => {
    if (importAction.type === 'last') {
      importLastSc(sc.id, setSc, setIsLoading, error, afterScFetched);
    } else {
      if (importAction.scId) {
        importFromSpecificSc(
          sc.id,
          importAction.scId,
          setSc,
          setIsLoading,
          error,
          afterScFetched
        );
      }
    }
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
              setClassification={setClassification}
              handleChangeType={handleChangeType}
              scTypeSelected={scTypeSelected}
              handleSubmitScType={handleSubmitScType}
              handleSaveInit={handleSaveInit}
              setSc={setSc}
              setIsLoading={setIsLoading}
              afterScFetched={afterScFetched}
              dailyBusinesses={dailyBusinesses}
              setDailyBusinesses={setDailyBusinesses}
              projects={projects}
              setProjects={setProjects}
              importSc={importSc}
            />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScorecardDetail));
