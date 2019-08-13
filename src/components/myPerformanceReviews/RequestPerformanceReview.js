import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import objectGet from 'object-get';
import { injectIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { UserinfoContext } from '../App';

export const RequestPerformanceReview = props => {
  let { newPrId, intl, addPr } = props;
  const { userinfo } = useContext(UserinfoContext.context).value;
  if (newPrId) {
    return <Redirect to={`/prDetail/${newPrId}`} />;
  }

  const hasSupervisor = objectGet(props, 'userinfo.hasSupervisor');
  const hasPrInProgress = objectGet(props, 'userinfo.hasPrInProgress');

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
        onClick={() => addPr(userinfo.userPrincipalName)}
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

export default injectIntl(
  connect(
    state => ({
      newPrId: state.newPrId
    }),
    { addPr: actions.addPr }
  )(RequestPerformanceReview)
);
