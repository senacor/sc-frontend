import React, { Component } from 'react';
import PrState from './PrState';
import PrTabs from './PrTabs';
import { connect } from 'react-redux';
import { getPrDetail } from '../../../reducers/selector';
import * as actions from '../../../actions';
import withLoading from '../../hoc/Loading';

export class PerformanceReviewDetail extends Component {
  render() {
    let { prById } = this.props;
    return (
      <React.Fragment>
        <PrState />
        {prById ? <PrTabs /> : null}
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
