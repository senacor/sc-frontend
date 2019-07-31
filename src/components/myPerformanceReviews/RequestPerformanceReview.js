import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import objectGet from 'object-get';
import { injectIntl } from 'react-intl';

import { getUserinfo } from '../../reducers/selector';
import { Redirect } from 'react-router-dom';

export function RequestPerformanceReview(props) {
  if (props.newPrId) {
    return <Redirect to={`/prDetail/${props.newPrId}`} />;
  }

  const hasSupervisor = objectGet(props, 'userinfo.hasSupervisor');
  const hasPrInProgress = objectGet(props, 'userinfo.hasPrInProgress');

  if (!hasSupervisor || hasPrInProgress) {
    let tooltipText = !hasSupervisor
      ? props.intl.formatMessage({
          id: 'requestperformancereview.nosupervisor'
        })
      : props.intl.formatMessage({
          id: 'requestperformancereview.alreadyopened'
        });

    return (
      <Tooltip title={tooltipText}>
        <span>
          <Button disabled>
            <Icon>add</Icon>
            {props.intl.formatMessage({
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
        onClick={() => props.addPr(props.userinfo.userPrincipalName)}
        disabled={!hasSupervisor || hasPrInProgress}
      >
        <Icon>add</Icon>
        {props.intl.formatMessage({
          id: 'requestperformancereview.requestpr'
        })}
      </Button>
    </React.Fragment>
  );
}

export default injectIntl(
  connect(
    state => ({
      userinfo: getUserinfo(state),
      newPrId: state.newPrId
    }),
    { addPr: actions.addPr }
  )(RequestPerformanceReview)
);
