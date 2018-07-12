import React from 'react';
import { shallow } from 'enzyme';
import { PerformanceReviewDetail } from './PerformanceReviewDetail';

describe('PerformanceReviewDetail', () => {
  it('should match snapshot', () => {
    let cut = shallow(<PerformanceReviewDetail prDetail={{}} />);

    expect(cut).toMatchSnapshot();
  });
});
