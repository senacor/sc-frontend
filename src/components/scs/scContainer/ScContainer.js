import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { useUserinfoContext } from '../../../helper/contextHooks';
import { SC_STATUS } from '../../../helper/scSheetData';
import WaitForScTypeNotification from './WaitForScTypeNotification';
import ScTabs from './ScTabs';
import ScTypeToChoose from './ScTypeToChoose';
import StatusStepper from './statusStepper/StatusStepper';

const styles = theme => ({});

const ScContainer = ({
  sc,
  tabValue,
  handleChangeTab,
  classification,
  handleChangeClassification,
  handleChangeType,
  scTypeSeleted,
  handleSubmitScType,
  handleMeetingConfirm,
  setSc,
  setIsLoading,
  afterScFetched
}) => {
  const user = useUserinfoContext();

  return (
    <Fragment>
      <StatusStepper sc={sc} handleMeetingConfirm={handleMeetingConfirm} />
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
          handleChangeClassification={handleChangeClassification}
          handleChangeType={handleChangeType}
          scTypeSeleted={scTypeSeleted}
          handleSubmitScType={handleSubmitScType}
        />
      ) : (
        <WaitForScTypeNotification />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScContainer));
