import React from 'react';
import { OverviewPerformanceReviews } from './OverviewPerformanceReviews';
import { createShallow } from '@material-ui/core/test-utils';

describe('OverviewPerformanceReviews', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let component = shallow(<OverviewPerformanceReviews />);

    expect(component).toMatchSnapshot();
  });
});
