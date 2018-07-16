import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import PrSheet from '../pr/PrSheet';
import PrSalary from '../pr/PrSalary';
import PrEmployment from '../pr/PrEmployment';
import PrState from '../pr/PrState';
import { getPrDetail } from '../../reducers/selector';

export class PerformanceReviewDetail extends Component {
  render() {
    const { prDetail } = this.props;

    if (!prDetail) {
      return null;
    }

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <PrSheet />
        </Grid>
        <Hidden smDown>
          <Grid item md={4} lg={4} xl={4}>
            <Grid container direction="row" spacing={8}>
              <Grid item md={12} lg={12} xl={12}>
                <PrSalary prDetail={prDetail} />
              </Grid>
              <Grid item md={12} lg={12} xl={12}>
                <PrEmployment prById={prDetail} />
              </Grid>
              <Grid item md={12} lg={12} xl={12}>
                <PrState />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

export default connect(state => ({
  prDetail: getPrDetail()(state)
}))(PerformanceReviewDetail);
