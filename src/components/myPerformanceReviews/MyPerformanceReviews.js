import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import MyPerformanceReviewsList from './MyPerformanceReviewsList';
import RequestPerformanceReview from './RequestPerformanceReview';
import PerformanceReviewDetail from '../pr/prDetail/PerformanceReviewDetail';

import PrivateRoute from '../privateRoute/PrivateRoute';

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
            <Hidden mdDown>
              <MyPerformanceReviewsList highlightPrDetail={true} />
            </Hidden>
            <Hidden smUp>
              <MyPerformanceReviewsList highlightPrDetail={false} />
            </Hidden>
          </Grid>
          <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
            <PrivateRoute component={PerformanceReviewDetail} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MyPerformanceReviews;
