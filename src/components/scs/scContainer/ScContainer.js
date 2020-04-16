import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { useUserinfoContext } from '../../../helper/contextHooks';
import { SC_STATUS } from '../../../helper/scSheetData';
import WaitForScTypeNotification from './WaitForScTypeNotification';
import ScTabs from './ScTabs';
import ScTypeToChoose from './ScTypeToChoose';
import StatusStepper from './StatusStepper';

const styles = theme => ({});

const ScContainer = ({
  sc,
  tabValue,
  handleChangeTab,
  classification,
  setClassification,
  handleChangeType,
  scTypeSelected,
  handleSubmitScType,
  setSc,
  setIsLoading,
  afterScFetched,
  dailyBusinesses,
  setDailyBusinesses,
  projects,
  handleSaveInit,
  setProjects
}) => {
  const user = useUserinfoContext();

  return (
    <Fragment>
      <StatusStepper sc={sc} />
      {sc.statusSet.includes(SC_STATUS.WITHOUT_PR) ||
      sc.statusSet.includes(SC_STATUS.WITH_PR) ? (
        <ScTabs
          sc={sc}
          tabValue={tabValue}
          handleChangeTab={handleChangeTab}
          setSc={setSc}
          setIsLoading={setIsLoading}
          afterScFetched={afterScFetched}
        />
      ) : user.isReviewerInSc(sc) ? (
        <ScTypeToChoose
          sc={sc}
          classification={classification}
          setClassification={setClassification}
          handleChangeType={handleChangeType}
          scTypeSelected={scTypeSelected}
          handleSubmitScType={handleSubmitScType}
          handleSaveInit={handleSaveInit}
          dailyBusinesses={dailyBusinesses}
          setDailyBusinesses={setDailyBusinesses}
          projects={projects}
          setProjects={setProjects}
        />
      ) : (
        <WaitForScTypeNotification />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScContainer));
