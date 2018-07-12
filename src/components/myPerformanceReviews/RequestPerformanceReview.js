import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export function RequestPerformanceReview(props) {
  return (
    <Button id="addPrButton" color="primary" onClick={props.addPr}>
      <Icon>add</Icon>
      PR beantragen
    </Button>
  );
}

export default connect(
  state => {},
  { addPr: actions.addPr }
)(RequestPerformanceReview);
