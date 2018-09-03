import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { getUserinfo } from '../../reducers/selector';

export function RequestPerformanceReview(props) {
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
  state => ({ userinfo: getUserinfo(state) }),
  { addPr: actions.addPr }
)(RequestPerformanceReview);
