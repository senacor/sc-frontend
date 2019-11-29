import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { useUserinfoContext } from '../../../helper/contextHooks';
import { SC_STATUS } from '../../../helper/scSheetData';
import EmployeeWaitForScText from './EmployeeWaitForScText';
import ScTabs from './ScTabs';
import ScTypeToChoose from './ScTypeToChoose';
import StatusStepper from './statusStepper/StatusStepper';

const styles = theme => ({});

const ScContainer = ({
  sc,
  tabValue,
  handleChangeTab,
  position,
  handleChangePosition,
  handleChangeType,
  scTypeSeleted,
  handleSubmitScType
}) => {
  const user = useUserinfoContext();

  return (
    <Fragment>
      <StatusStepper sc={sc} />
      {sc.statusSet.includes(SC_STATUS.WITHOUT_PR) ||
      sc.statusSet.includes(SC_STATUS.WITH_PR) ? (
        <ScTabs sc={sc} tabValue={tabValue} handleChangeTab={handleChangeTab} />
      ) : user.isReviewerInSc(sc) ? (
        <ScTypeToChoose
          sc={sc}
          position={position}
          handleChangePosition={handleChangePosition}
          handleChangeType={handleChangeType}
          scTypeSeleted={scTypeSeleted}
          handleSubmitScType={handleSubmitScType}
        />
      ) : (
        <EmployeeWaitForScText />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScContainer));
