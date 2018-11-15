import React, { Component } from 'react';
import PrState from './PrState';
import PrTabs from './PrTabs';
import { connect } from 'react-redux';
import { getPrDetail } from '../../../reducers/selector';
import * as actions from '../../../actions';
import withLoading from '../../hoc/Loading';
import PrDetailInformation from './PrDetailInformation';

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
    isLoading: state.isLoading
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
