import React from 'react';
import { shallow } from 'enzyme';
import { RequestPerformanceReview } from './RequestPerformanceReview';

describe('RequestPerformanceReview', () => {
  it('should match snapshot', () => {
    let cut = shallow(<RequestPerformanceReview />);

    expect(cut).toMatchSnapshot();
  });
});
