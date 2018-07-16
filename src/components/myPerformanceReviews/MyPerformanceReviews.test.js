import React from 'react';
import { shallow } from 'enzyme';
import MyPerformanceReviews from './MyPerformanceReviews';

describe('MyPerformanceReviews', () => {
  it('should match snapshot', () => {
    let cut = shallow(<MyPerformanceReviews />);

    expect(cut).toMatchSnapshot();
  });
});
