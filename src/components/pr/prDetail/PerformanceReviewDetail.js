import React, { Component } from 'react';
import PrState from './PrState';
import PrTabs from './PrTabs';
import { connect } from 'react-redux';
import { getPrDetail } from '../../../reducers/selector';
import * as actions from '../../../actions';
import PrDetailInformation from './PrDetailInformation';
import { LoadingEvents } from '../../../helper/loadingEvents';
import withLoadingAction from '../../hoc/LoadingWithAction';

export class PerformanceReviewDetail extends Component {
  render() {
    const { pr } = this.props;

    return (
      <React.Fragment>
        {pr ? <PrDetailInformation pr={pr} /> : null}
        {pr ? <PrState /> : null}
        {pr ? <PrTabs /> : null}
      </React.Fragment>
    );
  }
}

PerformanceReviewDetail.propTypes = {};

export default connect(
  state => ({
    pr: getPrDetail()(state)
  }),
  {
    fetchPrById: actions.fetchPrById,
    fetchMeeting: actions.fetchMeeting
  }
)(
  withLoadingAction(props => {
    return props
      .fetchPrById(props.match.params.id)
      .then(pr => props.fetchMeeting(pr));
  })([LoadingEvents.FETCH_PR_BY_ID])(PerformanceReviewDetail)
);
