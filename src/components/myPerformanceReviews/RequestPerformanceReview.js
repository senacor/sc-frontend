import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { getUserinfo } from '../../reducers/selector';
import { Redirect } from 'react-router-dom';

export function RequestPerformanceReview(props) {
  if (props.newPrId) {
    return <Redirect to={`/prDetail/${props.newPrId}`} />;
  }

  return (
    <Button
      id="addPrButton"
      color="primary"
      onClick={() => props.addPr(props.userinfo.userPrincipalName)}
    >
      <Icon>add</Icon>
      PR beantragen
    </Button>
  );
}

export default connect(
  state => ({
    userinfo: getUserinfo(state),
    newPrId: state.newPrId
  }),
  { addPr: actions.addPr }
)(RequestPerformanceReview);
