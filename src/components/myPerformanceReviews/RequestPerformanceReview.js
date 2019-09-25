import React, { useContext, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { CircularProgress } from '@material-ui/core';

import { UserinfoContext, PrContext, ErrorContext } from '../App';
import { addPr } from '../../actions/calls/pr';

export const RequestPerformanceReview = ({ intl }) => {
  const { userinfo } = useContext(UserinfoContext.context).value;
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const errorContext = useContext(ErrorContext.context);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const setPrCallback = pr => {
    setPr(pr);
    setRedirect(true);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (redirect) {
    return <Redirect to={`/prDetail/${pr.id}`} />;
  }

  const hasSupervisor = userinfo.hasSupervisor;
  const hasPrInProgress = userinfo.hasPrInProgress;

  if (!hasSupervisor || hasPrInProgress) {
    let tooltipText = !hasSupervisor
      ? intl.formatMessage({
          id: 'requestperformancereview.nosupervisor'
        })
      : intl.formatMessage({
          id: 'requestperformancereview.alreadyopened'
        });

    return (
      <Tooltip title={tooltipText}>
        <span>
          <Button disabled>
            <Icon>add</Icon>
            {intl.formatMessage({
              id: 'requestperformancereview.requestpr'
            })}
          </Button>
        </span>
      </Tooltip>
    );
  }

  return (
    <React.Fragment>
      <Button
        id="addPrButton"
        color="primary"
        onClick={() =>
          addPr(
            userinfo.userPrincipalName,
            setIsLoading,
            setPrCallback,
            errorContext
          )
        }
        disabled={!hasSupervisor || hasPrInProgress}
      >
        <Icon>add</Icon>
        {intl.formatMessage({
          id: 'requestperformancereview.requestpr'
        })}
      </Button>
    </React.Fragment>
  );
};

export default injectIntl(RequestPerformanceReview);
