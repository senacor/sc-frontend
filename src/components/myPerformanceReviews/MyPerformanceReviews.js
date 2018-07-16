import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

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
            <Link to={'/availabilityview'} style={{ textDecoration: 'none' }}>
              <Button color="primary">
                <Icon>add</Icon>
                Termin finden
              </Button>
            </Link>
            <Hidden mdDown>
              <MyPerformanceReviewsList highlightPrDetail={true} />
            </Hidden>
            <Hidden smUp>
              <MyPerformanceReviewsList highlightPrDetail={false} />
            </Hidden>
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
