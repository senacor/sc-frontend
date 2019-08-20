import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../../helper/routes';
import { isHr } from '../../../helper/checkRole';
import PrStatusActionButton from './PrStatusActionButton';
import { injectIntl } from 'react-intl';
import { ErrorContext, InfoContext, UserinfoContext } from '../../App';

const BackToTableButton = ({ pr, classes, intl }) => {
  const infoContext = useContext(InfoContext.context);
  const errorContext = useContext(ErrorContext.context);
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
  const { username } = userinfo;
  const getBackJumpPoint = (pr, userroles, username) => {
    if (pr.employee.login === username) {
      return ROUTES.OWN_PR_TABLE;
    } else if (
      pr.supervisor.login === username ||
      pr.reviewer.login === username
    ) {
      return ROUTES.PR_TO_REVIEW_TABLE;
    } else if (isHr(userroles)) {
      return ROUTES.HR_PR_TABLE;
    } else {
      return ROUTES.LOGOUT;
    }
  };

  const resetMessages = () => {
    infoContext.setValue({ hasInfos: false, messageId: '' });
    errorContext.setValue({ hasErrors: false, messageId: '', errors: {} });
  };

  return (
    <PrStatusActionButton
      label={intl.formatMessage({
        id: 'backtotablebutton.back'
      })}
      releaseButtonClick={resetMessages}
      inputClass={classes}
      component={NavLink}
      to={getBackJumpPoint(pr, userroles, username)}
    />
  );
};

export default injectIntl(BackToTableButton);
