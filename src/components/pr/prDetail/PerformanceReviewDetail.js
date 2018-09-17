import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PrState from './PrState';

class PerformanceReviewDetail extends Component {
  render() {
    return (
      <React.Fragment>
        <PrState />
      </React.Fragment>
    );
  }
}

PerformanceReviewDetail.propTypes = {};

export default PerformanceReviewDetail;
