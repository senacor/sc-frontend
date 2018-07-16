import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import MyPerformanceReviewsList from './MyPerformanceReviewsList';
import RequestPerformanceReview from './RequestPerformanceReview';
import PerformanceReviewDetail from '../pr/PerformanceReviewDetail';

class MyPerformanceReviews extends Component {
  render() {
    return (
      <div>
        <Typography variant="display1" paragraph>
          Performance Reviews
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <RequestPerformanceReview />
            <MyPerformanceReviewsList highlightPrDetail={true} />
          </Grid>
          <Hidden mdDown>
            <Grid item lg={9} xl={9}>
              <PerformanceReviewDetail />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

export default MyPerformanceReviews;
