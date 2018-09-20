import React from 'react';
import { PerformanceReviewDetail } from './PerformanceReviewDetail';
import { shallow } from 'enzyme';

describe('PerformanceReviewDetail Component', () => {
  it('should match snapshot', () => {
    const component = shallow(<PerformanceReviewDetail />);
    expect(component).toMatchSnapshot();
  });
});
