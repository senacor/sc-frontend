import React from 'react';
import OverviewPerformanceReviews from './OverviewPerformanceReviews';
import { shallow } from 'enzyme';

describe('OverviewPerformanceReviews', () => {
  it('should match snapshot', () => {
    let component = shallow(<OverviewPerformanceReviews />);

    expect(component).toMatchSnapshot();
  });
});
