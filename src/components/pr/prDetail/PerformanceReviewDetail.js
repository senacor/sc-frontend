import React from 'react';
import PrState from './PrState';
import PrTabs from './PrTabs';
import { connect } from 'react-redux';
import { getMeeting, getPrDetail } from '../../../reducers/selector';
import * as actions from '../../../actions';
import PrDetailInformation from './PrDetailInformation';
import { LoadingEvents } from '../../../helper/loadingEvents';
import withLoadingAction from '../../hoc/LoadingWithAction';

const PerformanceReviewDetail = ({ pr, meeting }) => {
  return (
    <React.Fragment>
      {pr ? <PrDetailInformation pr={pr} meeting={meeting} /> : null}
      {pr ? <PrState /> : null}
      {pr ? <PrTabs /> : null}
    </React.Fragment>
  );
};

export default connect(
  state => ({
    pr: getPrDetail()(state),
    meeting: getMeeting(state)
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
  })([LoadingEvents.FETCH_PR_BY_ID, LoadingEvents.FETCH_MEETING])(
    PerformanceReviewDetail
  )
);
