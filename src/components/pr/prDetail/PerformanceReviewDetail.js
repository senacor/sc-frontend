import React, { Component } from 'react';
import PrState from './PrState';
import PrTabs from './PrTabs';
import { connect } from 'react-redux';
import { getPrDetail, isLoadingAction } from '../../../reducers/selector';
import * as actions from '../../../actions';
import withLoading from '../../hoc/Loading';
import PrDetailInformation from './PrDetailInformation';
import { LoadingEvents } from '../../../helper/loadingEvents';

export class PerformanceReviewDetail extends Component {
  render() {
    const { prById: pr } = this.props;

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
    prById: getPrDetail()(state),
    isLoading: isLoadingAction(state, LoadingEvents.FETCH_PR_BY_ID)
  }),
  {
    fetchPrById: actions.fetchPrById,
    fetchMeeting: actions.fetchMeeting
  }
)(
  withLoading(props => {
    return props
      .fetchPrById(props.match.params.id)
      .then(pr => props.fetchMeeting(pr));
  })(PerformanceReviewDetail)
);
