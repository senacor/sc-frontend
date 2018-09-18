import React, { Component } from 'react';
import PrState from './PrState';
import PrTabs from './PrTabs';

class PerformanceReviewDetail extends Component {
  render() {
    return (
      <React.Fragment>
        <PrState />
        <PrTabs />
      </React.Fragment>
    );
  }
}

PerformanceReviewDetail.propTypes = {};

export default PerformanceReviewDetail;
