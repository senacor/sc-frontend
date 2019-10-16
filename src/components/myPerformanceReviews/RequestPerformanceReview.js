import React, { useContext, useState, Fragment } from 'react';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { CircularProgress } from '@material-ui/core';

import { UserinfoContext, PrContext, ErrorContext } from '../App';
import { addPr } from '../../calls/pr';
import ConfirmDialog from '../utils/ConfirmDialog';
import {
  formatLocaleDateTime,
  FRONTEND_LOCALE_DATE_TIME_FORMAT
} from '../../helper/date';

export const RequestPerformanceReview = ({ intl }) => {
  const { userinfo } = useContext(UserinfoContext.context).value;
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const errorContext = useContext(ErrorContext.context);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const hasSupervisor = userinfo.hasSupervisor;
  const hasPrInProgress = userinfo.hasPrInProgress;
  const endOfProbationPeriod = userinfo.endOfProbation;
  let isInProbation = false;

  const isInProbationCheck = (value, date) => {
    const formattedDate = Date.parse(
      formatLocaleDateTime(date, FRONTEND_LOCALE_DATE_TIME_FORMAT)
    );
    const today = Date.parse(moment().format(FRONTEND_LOCALE_DATE_TIME_FORMAT));

    if (date === null || formattedDate < today) {
      value = false;
    } else if (formattedDate >= today) {
      value = true;
    }
    return value;
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const setPrCallback = pr => {
    setPr(pr);
    setRedirect(true);
  };

  const tooltipText = !hasSupervisor
    ? intl.formatMessage({
        id: 'requestperformancereview.nosupervisor'
      })
    : hasPrInProgress
    ? intl.formatMessage({
        id: 'requestperformancereview.alreadyopened'
      })
    : isInProbationCheck(isInProbation, endOfProbationPeriod)
    ? intl.formatMessage({
        id: 'requestperformancereview.isInProbationPeriod'
      })
    : '';

  if (isLoading) {
    return <CircularProgress />;
  }

  if (redirect) {
    return <Redirect to={`/prDetail/${pr.id}`} />;
  }

  if (
    !hasSupervisor ||
    hasPrInProgress ||
    isInProbationCheck(isInProbation, endOfProbationPeriod)
  ) {
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
    <Fragment>
      <Button
        id="addPrButton"
        color="primary"
        onClick={handleDialogOpen}
        disabled={
          !hasSupervisor ||
          hasPrInProgress ||
          isInProbationCheck(isInProbation, endOfProbationPeriod)
        }
      >
        <Icon>add</Icon>
        {intl.formatMessage({
          id: 'requestperformancereview.requestpr'
        })}
      </Button>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        confirmationText={intl.formatMessage({
          id: 'requestperformancereview.confirmation'
        })}
        confirmationHeader={intl.formatMessage({
          id: 'requestperformancereview.confirmHeader'
        })}
        handleConfirm={() => {
          addPr(
            userinfo.userPrincipalName,
            setIsLoading,
            setPrCallback,
            errorContext
          );
        }}
      />
    </Fragment>
  );
};

export default injectIntl(RequestPerformanceReview);
